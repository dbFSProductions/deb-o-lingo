// Deb-o-lingo — app shell, routing and views.
//
// The drill mechanics (record, analyse, compare, score) are ported from Xerra;
// the shell around them is a Duolingo-style course: a winding path of small
// lessons, a progress bar, result banners, streaks and a celebration screen.
//
// Nothing is locked. Every node is open from the first launch — the ticks and
// the streak record what Deb has done, they don't gate what she may do next.

import { library, settings, progress, audioStore, VOICES, uid, RECALL_AFTER } from "./store.js";
import { COURSE, COURSE_LANGUAGE, LESSONS, lessonById } from "./content.js";
import { Recorder, Player, analyse, relativeSemitones, resample } from "./audio.js";
import { speech, browserSpeech, scoring } from "./speech.js";
import { cardAssistant } from "./card-assistant.js";

const view = document.getElementById("view");
const tabbar = document.getElementById("tabbar");
const sheet = document.getElementById("sheet");
const sheetTitle = document.getElementById("sheet-title");
const sheetBody = document.getElementById("sheet-body");
const toastEl = document.getElementById("toast");

const player = new Player();
let recorder = new Recorder();

const PASS_GREAT = 80;
const PASS_OK = 60;

const state = {
  tab: "learn", // learn | phrases | add | settings
  stage: "path", // within learn: path | drill | complete
  lesson: null, // { id, title, color, colorDark, queue, index, results, practice }
  celebration: null,

  // drill substate
  modelBlob: null,
  modelAnalysis: null,
  attempt: null,
  attemptBlob: null,
  attemptAnalysis: null,
  showTranslation: true,
  // Level two. `recall` says this card is a memory question; `revealed` says
  // the answer is on screen (always true at level one); `peeked` says she
  // asked to be shown it rather than remembering.
  recall: false,
  revealed: true,
  peeked: false,
  loadingModel: false,
  scoringNow: false,
  levelTimer: null,
  banner: null, // { kind: great|ok|retry|neutral, score }
};

// ------------------------------------------------------------------ helpers

const esc = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

/* Text boxes grow to fit what's in them — a pasted paragraph or a dictated
   sentence shouldn't sit in a two-line scroller. */
function autosize(field) {
  if (!(field instanceof HTMLTextAreaElement)) return;
  field.style.height = "auto";
  if (!field.scrollHeight) {
    // Not laid out yet (a hidden section); let the CSS min-height stand.
    field.style.height = "";
    field.style.overflowY = "";
    return;
  }
  // scrollHeight covers the padding box, so the borders have to be added back.
  const borders = field.offsetHeight - field.clientHeight;
  const wanted = field.scrollHeight + borders;
  // Measuring with the scrollbar hidden, so a box that fits its text never
  // shows one; if a max-height still cuts the text off, hand it back.
  field.style.overflowY = "hidden";
  field.style.height = `${wanted}px`;
  if (field.offsetHeight < wanted) field.style.overflowY = "auto";
}

function autosizeAll(root = document) {
  for (const field of root.querySelectorAll("textarea")) autosize(field);
}

// Typing, pasting, dictating — anything that changes the content resizes it.
document.addEventListener("input", (event) => autosize(event.target));
// Rotating the phone rewraps the text, which changes how tall the box must be.
window.addEventListener("resize", () => autosizeAll());

const STAR_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>`;

/* A star on every phrase row. Starred phrases gather into a section at the top
   of Phrases and into their own node on the path, so "the ones I keep getting
   wrong" is one tap away without disturbing the course order. */
function starButton(phrase, className = "star") {
  const on = Boolean(phrase.favourite);
  return `<button class="${className}" data-fav="${esc(phrase.id)}" aria-pressed="${on}"
    title="${on ? "Remove from favourites" : "Add to favourites"}"
    aria-label="${on ? "Remove from favourites" : "Add to favourites"}">${STAR_SVG}</button>`;
}

function toast(message, ms = 2600) {
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (toastEl.hidden = true), ms);
}

function scoreClass(score) {
  if (score == null) return "";
  return score >= PASS_GREAT ? "good" : score >= PASS_OK ? "ok" : "bad";
}

function scoreColour(score) {
  if (score == null) return "var(--text-3)";
  return score >= PASS_GREAT ? "var(--green)" : score >= PASS_OK ? "var(--amber)" : "var(--red)";
}

function openSheet(title, html) {
  sheetTitle.textContent = title;
  sheetBody.innerHTML = html;
  sheet.hidden = false;
}

function closeSheet() {
  sheet.hidden = true;
  sheetBody.innerHTML = "";
}

sheet.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-sheet")) closeSheet();
});

/* Deleting a card takes its recordings and scores with it and there's no undo,
   so every delete button asks for a second tap first. Arming is on the button
   itself rather than a confirm dialog: one thumb, no modal on top of a modal,
   and tapping anything else leaves it armed but harmless. */
function armDelete(button, armedLabel, onConfirm) {
  if (!button) return;
  const restLabel = button.textContent;
  button.addEventListener("click", async () => {
    if (button.dataset.armed !== "1") {
      button.dataset.armed = "1";
      button.textContent = armedLabel;
      // Second thoughts are the common case — let it settle back down.
      setTimeout(() => {
        if (!button.isConnected || button.dataset.armed !== "1") return;
        delete button.dataset.armed;
        button.textContent = restLabel;
      }, 5000);
      return;
    }
    button.disabled = true;
    await onConfirm();
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// -------------------------------------------------------------------- tabs

tabbar.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  stopEverything();
  state.tab = button.dataset.tab;
  state.stage = "path";
  state.lesson = null;
  render();
});

function syncTabs() {
  for (const tab of tabbar.querySelectorAll(".tab")) {
    tab.setAttribute("aria-current", String(tab.dataset.tab === state.tab));
  }
}

function stopEverything() {
  player.stop();
  browserSpeech.stop();
  if (recorder.isRecording) recorder.cancel();
  clearInterval(state.levelTimer);
  state.levelTimer = null;
}

// ------------------------------------------------------------------ render

function render() {
  syncTabs();
  const inLesson = state.tab === "learn" && state.stage !== "path";
  document.body.classList.toggle("in-lesson", inLesson);
  // Scroll to the top only when moving to a different screen. Re-renders of
  // the same screen (the Azure score landing, revealing the translation)
  // must not jump the page — that was hiding the waveform comparison.
  const screen = `${state.tab}:${state.tab === "learn" ? state.stage : ""}`;
  if (screen !== render.lastScreen) window.scrollTo(0, 0);
  render.lastScreen = screen;
  if (state.tab === "learn") {
    if (state.stage === "drill") return renderDrill();
    if (state.stage === "complete") return renderComplete();
    return renderPath();
  }
  if (state.tab === "phrases") return renderPhrases();
  if (state.tab === "add") return renderAdd();
  return renderSettings();
}

// -------------------------------------------------------------------- path

/* Deb's own cards ride the path as a unit of their own, chunked into
   lesson-sized bites like the course units. The chunking follows creation
   order, so adding a card extends the last lesson or starts a new one and the
   earlier ids stay put; deleting one can reshuffle membership, which only
   costs a completion tick on a lesson she made herself. */
const OWN_UNIT_ID = "propias";
const OWN_LESSON_SIZE = 5;

function ownUnit() {
  const phrases = library.ownPhrases().filter((p) => p.text.trim());
  if (!phrases.length) return null;

  const lessons = [];
  for (let at = 0; at < phrases.length; at += OWN_LESSON_SIZE) {
    const number = lessons.length + 1;
    lessons.push({
      id: `own-${number}`,
      title: phrases.length <= OWN_LESSON_SIZE ? "Your cards" : `Your cards ${number}`,
      phrases: phrases.slice(at, at + OWN_LESSON_SIZE),
    });
  }

  return {
    id: OWN_UNIT_ID,
    title: "Lo tuyo",
    subtitle: "The cards you made yourself",
    color: "#ce82ff",
    colorDark: "#a568cc",
    lessons,
  };
}

/** The course units plus Deb's own, in path order. */
function allUnits() {
  const own = ownUnit();
  return own ? [...COURSE, own] : [...COURSE];
}

/** Lesson lookup that knows about the generated "Lo tuyo" lessons too. */
function findLesson(id) {
  const course = lessonById(id);
  if (course) return course;
  const own = ownUnit();
  const lesson = own?.lessons.find((l) => l.id === id);
  return lesson ? { ...lesson, unit: own } : null;
}

function firstOpenLesson() {
  return LESSONS.map((l) => l.id).find((id) => !progress.isDone(id)) ?? null;
}

function renderPath() {
  const streak = progress.currentStreak();
  const owed = progress.owedToday();
  const doneCount = LESSONS.filter((l) => progress.isDone(l.id)).length;
  const current = firstOpenLesson();
  const favourites = library.favouritePhrases().filter((p) => p.text.trim());

  const greeting =
    streak > 0 && !owed
      ? `Racha de ${streak} día${streak === 1 ? "" : "s"} — ¡ya está hecho lo de hoy!`
      : streak > 0
      ? `Racha de ${streak} día${streak === 1 ? "" : "s"} — keep it alive: one little lesson.`
      : doneCount > 0
      ? "One lesson starts a new streak."
      : "¡Hola, Deb! Five minutes. One coffee. Let's go.";

  // The nodes wind left–centre–right like a certain owl's path.
  const offsets = [0, -1, 1];
  let nodeIndex = 0;

  const units = allUnits()
    .map((unit) => {
      const nodes = unit.lessons
        .map((lesson) => {
          const done = progress.isDone(lesson.id);
          const isCurrent = lesson.id === current;
          const offset = offsets[nodeIndex++ % offsets.length];
          const best = progress.lessons[lesson.id]?.best;

          const icon = done
            ? `<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            : `<svg viewBox="0 0 24 24"><path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3-5.7-3.1-5.7 3.1 1.2-6.3L2.8 9.3l6.4-.8z"/></svg>`;

          return `
          <div class="node-slot" style="--offset:${offset}">
            ${isCurrent ? `<div class="node-callout">START</div>` : ""}
            <button class="node ${done ? "done" : "open"} ${isCurrent ? "current" : ""}"
                    data-lesson="${esc(lesson.id)}"
                    style="--node:${done ? "var(--gold)" : unit.color};--node-dark:${done ? "var(--gold-dark)" : unit.colorDark}"
                    aria-label="${esc(lesson.title)}">
              ${icon}
            </button>
            <div class="node-title">${esc(lesson.title)}${best != null ? ` · <strong>${best}</strong>` : ""}</div>
          </div>`;
        })
        .join("");

      return `
      <section class="unit">
        <div class="unit-banner" style="--unit:${unit.color};--unit-dark:${unit.colorDark}">
          <div class="unit-name">${esc(unit.title)}</div>
          <div class="unit-sub">${esc(unit.subtitle)}</div>
        </div>
        <div class="path">${nodes}</div>
      </section>`;
    })
    .join("");

  view.innerHTML = `
    <header class="home-head">
      <div class="wordmark">deb·o·lingo</div>
      <button class="streak ${streak > 0 ? "lit" : ""}" id="streak" aria-label="Streak">
        ${flameSVG()}<span>${streak}</span>
      </button>
    </header>

    <div class="mascot-card">
      ${parrotSVG(74)}
      <div class="bubble">${esc(greeting)}</div>
    </div>

    ${units}

    <section class="unit">
      <div class="unit-banner mix-banner" style="--unit:var(--blue);--unit-dark:var(--blue-dark)">
        <div class="unit-name">Mézclalo</div>
        <div class="unit-sub">Practise across everything you've got</div>
      </div>
      <div class="path">
        <div class="node-slot" style="--offset:${favourites.length ? -1 : 0}">
          <button class="node open practice" id="practice"
                  style="--node:var(--blue);--node-dark:var(--blue-dark)" aria-label="Repaso">
            <svg viewBox="0 0 24 24"><path d="M7 8v8M4.5 9.5v5M17 8v8M19.5 9.5v5M7 12h10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>
          </button>
          <div class="node-title">Repaso — mix it all up</div>
        </div>
        ${
          favourites.length
            ? `<div class="node-slot" style="--offset:1">
                 <button class="node open" id="starred"
                         style="--node:var(--gold);--node-dark:var(--gold-dark)" aria-label="Favourites">
                   ${STAR_SVG}
                 </button>
                 <div class="node-title">Favourites · <strong>${favourites.length}</strong></div>
               </div>`
            : ""
        }
      </div>
    </section>

    ${settings.hasAzure ? "" : `<div class="notice" style="margin-top:8px">Without an Azure key you can listen with the
      browser's voice, but the waveform comparison and scoring won't run. Add the key in Settings.</div>`}`;

  view.querySelectorAll("[data-lesson]").forEach((button) =>
    button.addEventListener("click", () => {
      const lesson = findLesson(button.dataset.lesson);
      if (lesson) startLesson(lesson);
    })
  );

  document.getElementById("practice").onclick = () => startPractice();

  document.getElementById("starred")?.addEventListener("click", () =>
    startPractice(shuffle([...favourites]))
  );

  document.getElementById("streak").onclick = () =>
    toast(
      streak > 0
        ? `${streak} day${streak === 1 ? "" : "s"} in a row. One lesson a day keeps it burning.`
        : "Finish a lesson to light the flame."
    );
}

function startLesson(lesson) {
  stopEverything();
  state.lesson = {
    id: lesson.id,
    title: lesson.title,
    color: lesson.unit.color,
    colorDark: lesson.unit.colorDark,
    // Through decorate() so an edited course phrase drills as edited.
    queue: lesson.phrases.map((p) => library.decorate({ language: COURSE_LANGUAGE, ...p })),
    index: 0,
    results: [],
    practice: false,
  };
  state.stage = "drill";
  loadPhrase();
}

/* Repaso draws from everything drillable — the whole course and Deb's own
   cards. It used to be limited to lessons already completed; with nothing
   locked there is nothing to hold back. */
function startPractice(queueOverride = null) {
  stopEverything();
  const pool = queueOverride ?? shuffle(library.drillable()).slice(0, 7);
  if (!pool.length) {
    toast("Nothing to practise yet.");
    return;
  }
  state.lesson = {
    id: "practice",
    title: "Repaso",
    color: "var(--blue)",
    colorDark: "var(--blue-dark)",
    queue: pool,
    index: 0,
    results: [],
    practice: true,
  };
  state.stage = "drill";
  loadPhrase();
}

// ------------------------------------------------------------------- drill

function currentPhrase() {
  return state.lesson?.queue[state.lesson.index] ?? null;
}

async function loadPhrase() {
  const phrase = currentPhrase();
  state.modelBlob = null;
  state.modelAnalysis = null;
  state.attempt = null;
  state.attemptBlob = null;
  state.attemptAnalysis = null;
  state.banner = null;
  state.showTranslation = settings.showTranslationUpFront;
  state.recall = Boolean(settings.recallMode && phrase && library.recallReady(phrase.id));
  state.revealed = !state.recall;
  state.peeked = false;
  scoring.lastError = null;
  window.scrollTo(0, 0);
  if (!phrase) return render();

  state.loadingModel = settings.hasAzure && !(await speech.isCached(phrase, settings));
  render();

  const blob = await speech.modelAudio(phrase, settings);
  state.loadingModel = false;
  if (currentPhrase()?.id !== phrase.id) return; // moved on while we waited
  state.modelBlob = blob;
  if (blob) {
    try {
      state.modelAnalysis = await analyse(blob);
    } catch {
      state.modelAnalysis = null;
    }
  }
  if (state.stage === "drill") render();
}

function renderDrill() {
  const lesson = state.lesson;
  const phrase = currentPhrase();
  if (!lesson || !phrase) {
    state.stage = "path";
    return render();
  }

  // Replacing the view's innerHTML makes iOS Safari clamp the scroll position
  // to the top (e.g. when the Azure score lands mid-read), so put it back.
  const scrollY = window.scrollY;

  const total = lesson.queue.length;
  const filled = lesson.index + (state.banner ? 1 : 0);
  const pct = Math.round((filled / total) * 100);
  const hasModel = Boolean(state.modelBlob);
  // Still being asked: the Spanish, the tip and the model audio are all
  // withheld, because any of the three answers the question.
  const asking = state.recall && !state.revealed;

  view.innerHTML = `
    <div class="lesson-top">
      <button class="quit" id="quit" aria-label="Quit lesson">✕</button>
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
      <button class="link muted-link" id="drill-edit">EDIT</button>
    </div>

    <p class="instruction">${
      asking
        ? "From memory — how do you say this?"
        : state.recall && state.attempt
        ? "Here's the phrase — how close were you?"
        : "Listen, then say it out loud"
    }</p>

    <div class="card drill-card">
      ${state.recall ? `<div class="level-badge">Level 2 · from memory</div>` : ""}
      ${
        asking
          ? `<p class="drill-text recall-prompt">${esc(phrase.translation)}</p>
             ${phrase.situation ? `<p class="drill-translation">${esc(phrase.situation)}</p>` : ""}
             <p class="tiny muted" style="margin:10px 0 0">Say it in Spanish, then you'll see it.</p>`
          : `<p class="drill-text">${esc(phrase.text)}</p>
             ${
               state.showTranslation
                 ? `<p class="drill-translation">${esc(phrase.translation)}</p>`
                 : `<button class="link" id="reveal" style="padding-left:0">Show meaning</button>`
             }
             ${
               phrase.focusNote
                 ? `<div class="focus-note"><strong>Tip</strong><span>${esc(phrase.focusNote)}</span></div>`
                 : ""
             }
             ${
               state.peeked
                 ? `<p class="tiny muted" style="margin:10px 0 0">Shown, not remembered — it'll come round again.</p>`
                 : ""
             }`
      }
    </div>

    ${
      asking
        ? `<button class="btn btn-big" id="show-me" style="margin-top:0">👀 Show me</button>`
        : `<div class="btn-row">
             <button class="btn btn-primary" id="listen">🔊 Listen</button>
             <button class="btn" id="slow">🐢 Slow</button>
           </div>`
    }
    ${
      asking
        ? ""
        : state.loadingModel
        ? `<p class="small muted" style="margin-top:10px"><span class="spinner"></span> Generating audio…</p>`
        : !hasModel && settings.hasAzure && speech.lastError
        ? `<div class="notice bad" style="margin-top:10px">${esc(speech.lastError)}</div>`
        : !hasModel
        ? `<div class="notice" style="margin-top:10px">Using the browser voice. Comparison and scoring need an Azure key.</div>`
        : ""
    }

    <div class="record-wrap">
      <button class="record" id="record" aria-label="Record">
        <span class="record-ring" id="ring"></span>
        <svg viewBox="0 0 24 24" id="record-icon"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"/><path d="M19 11a7 7 0 0 1-14 0" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 18v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      </button>
      <p class="small muted" id="record-label">${
        state.attempt
          ? "Recorded! Compare below, or tap to try again"
          : asking
          ? "Tap, say it in Spanish, tap again"
          : "Tap, say it, tap again"
      }</p>
      ${state.banner ? "" : `<button class="link muted-link" id="skip">SKIP</button>`}
    </div>

    <div id="comparison">${state.attempt ? renderComparison() : ""}</div>

    ${state.banner ? renderBanner() : ""}`;

  document.getElementById("quit").onclick = quitLesson;

  /* Editing from inside the lesson, for the card you have just heard and
     realised is not how you'd say it. The queue holds decorated copies and the
     model audio is cached by text, so the fixed card has to go back into the
     queue and be reloaded rather than just re-rendered. */
  document.getElementById("drill-edit").onclick = () => {
    stopEverything();
    editPhrase(phrase, (updated) => {
      if (!updated) return;
      lesson.queue = lesson.queue.map((p) => (p.id === updated.id ? updated : p));
      loadPhrase();
    });
  };
  document.getElementById("reveal")?.addEventListener("click", () => {
    state.showTranslation = true;
    render();
  });
  document.getElementById("listen")?.addEventListener("click", () => playModel(1));
  document.getElementById("slow")?.addEventListener("click", () => playModel(settings.slowRate));
  document.getElementById("record").onclick = toggleRecording;
  document.getElementById("show-me")?.addEventListener("click", () => {
    state.revealed = true;
    state.peeked = true;
    render();
    playModel(1);
  });
  document.getElementById("skip")?.addEventListener("click", () => {
    stopEverything();
    advance({ skipped: true, score: null });
  });
  document.getElementById("banner-retry")?.addEventListener("click", () => {
    stopEverything();
    state.attempt = null;
    state.attemptBlob = null;
    state.attemptAnalysis = null;
    state.banner = null;
    window.scrollTo(0, 0);
    render();
  });
  document.getElementById("banner-continue")?.addEventListener("click", () => {
    stopEverything();
    advance({ skipped: false, score: state.attempt?.overall ?? null });
  });

  if (state.attempt) wireComparison();
  drawCanvases();

  window.scrollTo(0, scrollY);
}

function quitLesson() {
  stopEverything();
  state.lesson = null;
  state.stage = "path";
  render();
}

function advance(result) {
  const lesson = state.lesson;
  lesson.results.push({ phraseId: currentPhrase()?.id, ...result });
  if (lesson.index < lesson.queue.length - 1) {
    lesson.index++;
    loadPhrase();
    return;
  }
  finishLesson();
}

function finishLesson() {
  const lesson = state.lesson;
  const scores = lesson.results.map((r) => r.score).filter((s) => typeof s === "number");
  const average = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null;

  let streakGrew = false;
  if (!lesson.practice) {
    ({ streakGrew } = progress.completeLesson(lesson.id, average));
  }

  state.celebration = {
    title: lesson.practice ? "¡Repaso completado!" : "¡Lección completada!",
    phrases: lesson.queue.length,
    average,
    streak: progress.currentStreak(),
    streakGrew,
    practice: lesson.practice,
  };
  state.stage = "complete";
  render();
}

function renderBanner() {
  const banner = state.banner;
  const kinds = {
    great: {
      cls: "great",
      head: "¡Genial!",
      sub: "A native would follow you without blinking. Tap Listen again, then You, to hear the two of you back to back.",
    },
    ok: {
      cls: "ok",
      head: "¡Bien!",
      sub: "Solid. The tinted words above could use another listen — tap Listen again to compare.",
    },
    retry: {
      cls: "retry",
      head: "Casi…",
      sub: "Tap Listen again above, then You, and copy the rhythm.",
    },
    neutral: {
      cls: "neutral",
      head: "How did that feel?",
      sub: "Compare the two waveforms above, then carry on.",
    },
    scoring: {
      cls: "neutral",
      head: "Scoring…",
      sub: "Azure is listening to your attempt.",
    },
  };
  const k = kinds[banner.kind] ?? kinds.neutral;

  /* From memory, the news isn't "your accent was close" — it's whether she
     produced the right words at all, which is what the score and the "Heard:"
     line below actually answer. */
  const recalled = state.recall && banner.kind !== "scoring";
  const head = recalled && !state.peeked && banner.kind === "great" ? "¡De memoria!" : k.head;
  const sub = !recalled
    ? k.sub
    : state.peeked
    ? "You had a look at this one, so it'll come round again. Listen and copy it now."
    : banner.kind === "retry"
    ? "Check the phrase above against what you said — Heard: below tells you what came out."
    : banner.kind === "neutral"
    ? "The phrase is above now. Tap Listen again, then You, and see whether you had it."
    : "Remembered it. Tap Listen again, then You, to check the two against each other.";

  return `
    <div class="banner ${k.cls}">
      <div class="banner-text">
        <div class="banner-head">${head}${banner.score != null ? ` · ${Math.round(banner.score)}` : ""}</div>
        <div class="banner-sub">${sub}</div>
      </div>
      <div class="banner-buttons">
        ${banner.kind === "scoring" ? `<span class="spinner"></span>` : `
        <button class="btn btn-ghost" id="banner-retry">Retry</button>
        <button class="btn btn-primary" id="banner-continue">Continue</button>`}
      </div>
    </div>`;
}

function playModel(rate) {
  const phrase = currentPhrase();
  if (!phrase) return;
  if (state.modelBlob) {
    player.play(state.modelBlob, { rate }).catch(() => toast("Couldn't play that clip."));
  } else if (browserSpeech.available(phrase.language)) {
    browserSpeech.speak(phrase.text, phrase.language, { rate });
  } else {
    toast("No Spanish voice available on this device.");
  }
}

async function toggleRecording() {
  const button = document.getElementById("record");
  const label = document.getElementById("record-label");

  if (recorder.isRecording) {
    clearInterval(state.levelTimer);
    state.levelTimer = null;
    button.classList.remove("recording");
    label.textContent = "Working on it…";
    const result = await recorder.stop();
    if (!result) {
      label.textContent = "Too short — try again";
      return;
    }
    await handleRecording(result);
    return;
  }

  stopEverything();
  recorder = new Recorder();
  try {
    await recorder.start();
  } catch (error) {
    toast(
      String(error?.name) === "NotAllowedError"
        ? "Microphone blocked. Allow it in Safari's site settings."
        : "Couldn't start recording."
    );
    return;
  }

  button.classList.add("recording");
  const ring = document.getElementById("ring");
  state.levelTimer = setInterval(() => {
    const level = recorder.level();
    if (ring) ring.style.transform = `scale(${1 + level * 0.35})`;
    if (label) label.textContent = `Recording… ${recorder.elapsed().toFixed(1)}s`;
  }, 60);
}

async function handleRecording({ blob, duration }) {
  const phrase = currentPhrase();
  if (!phrase) return;

  // The question is over the moment she has answered it — the phrase, the tip
  // and Listen all come back now so she can check herself against the model.
  const wasAsked = state.recall;
  const peeked = state.peeked;
  state.revealed = true;

  const attempt = {
    id: uid(),
    phraseID: phrase.id,
    recordedAt: new Date().toISOString(),
    duration,
    // How it was drilled. Older attempts have no mode; they were all read
    // off the screen, which is what "listen" means.
    mode: !wasAsked ? "listen" : peeked ? "recall-shown" : "recall",
    overall: null,
    accuracy: null,
    fluency: null,
    completeness: null,
    transcript: null,
    words: [],
    engine: "Not scored",
  };

  await audioStore.putRecording(attempt.id, blob);
  library.recordAttempt(attempt);
  state.attempt = attempt;
  state.attemptBlob = blob;

  try {
    state.attemptAnalysis = await analyse(blob);
  } catch {
    state.attemptAnalysis = null;
  }

  state.scoringNow = settings.hasAzure;
  state.banner = settings.hasAzure ? { kind: "scoring", score: null } : { kind: "neutral", score: null };
  render();

  if (!settings.hasAzure) {
    announceLevelUp(phrase);
    return;
  }

  const result = await scoring.score(blob, phrase, settings);
  state.scoringNow = false;
  if (state.attempt?.id !== attempt.id) return;
  if (result) {
    Object.assign(attempt, result);
    library.updateAttempt(attempt);
    state.attempt = attempt;
    state.banner = {
      kind: attempt.overall >= PASS_GREAT ? "great" : attempt.overall >= PASS_OK ? "ok" : "retry",
      score: attempt.overall,
    };
  } else {
    state.banner = { kind: "neutral", score: null };
  }
  render();
  announceLevelUp(phrase);
}

/* Say so the once, on the go that tips a card over. Silent if the card was
   already a memory question, or if recall is switched off in Settings. */
function announceLevelUp(phrase) {
  if (state.recall || !settings.recallMode) return;
  if (library.goodAttempts(phrase.id) !== RECALL_AFTER) return;
  toast("¡Nivel 2! Next time you'll say this one from memory.", 3600);
}

function renderComparison() {
  const attempt = state.attempt;
  const timing = timingSummary();

  return `
    <hr style="border:0;border-top:2px solid var(--line);margin:20px 0">

    <div class="btn-row" id="playback-row">
      <button class="btn btn-primary" id="play-model" ${state.modelBlob ? "" : "disabled"}>🔊 Listen again</button>
      <button class="btn btn-you" id="play-you">You</button>
    </div>

    <div class="card" style="margin-top:14px">
      <div class="wave-label" style="color:var(--accent)">Native speaker</div>
      <canvas id="wave-model" height="56"></canvas>
      <div class="wave-label" style="color:var(--you);margin-top:12px">You</div>
      <canvas id="wave-you" height="56"></canvas>
      ${timing ? `<p class="tiny muted" style="margin:10px 0 0">${esc(timing)}</p>` : ""}
    </div>

    <details class="card" id="pitch-details">
      <summary style="cursor:pointer;font-weight:700">Intonation</summary>
      <canvas id="pitch" height="130" style="margin-top:12px"></canvas>
      <p class="tiny muted" style="margin:8px 0 0">
        Both lines are in semitones relative to each speaker's own median, so the
        comparison is about melody rather than how high or low the voice sits.
      </p>
    </details>

    ${
      state.scoringNow
        ? ""
        : attempt?.overall != null
        ? renderScore(attempt)
        : scoring.lastError
        ? `<div class="notice bad">${esc(scoring.lastError)}</div>`
        : ""
    }`;
}

function timingSummary() {
  const model = state.modelAnalysis?.duration;
  const you = state.attemptAnalysis?.duration;
  if (!model || !you) return null;
  const ratio = you / model;
  if (ratio < 0.8) return `You're about ${Math.round((1 - ratio) * 100)}% quicker than the native speaker.`;
  if (ratio < 1.2) return "Your timing is close to the native speaker — nicely matched.";
  if (ratio < 1.6) return `You're about ${Math.round((ratio - 1) * 100)}% slower than the native speaker.`;
  return `You're taking about ${ratio.toFixed(1)}× as long. Try running the words together more.`;
}

function renderScore(attempt) {
  const circumference = 2 * Math.PI * 30;
  const dash = (attempt.overall / 100) * circumference;

  const sub = [
    ["Accuracy", attempt.accuracy],
    ["Fluency", attempt.fluency],
    ["Complete", attempt.completeness],
  ]
    .filter(([, v]) => v != null)
    .map(
      ([label, value]) =>
        `<div><div class="subscore-label">${label}</div><div class="subscore-value">${Math.round(value)}</div></div>`
    )
    .join("");

  const chips = attempt.words
    .map(
      (word, i) =>
        `<button class="chip ${scoreClass(word.score)}" data-word="${i}">${esc(word.word)}</button>`
    )
    .join("");

  return `
    <div class="card">
      <div class="score-head">
        <div class="dial">
          <svg viewBox="0 0 68 68">
            <circle cx="34" cy="34" r="30" fill="none" stroke="var(--surface-2)" stroke-width="7"/>
            <circle cx="34" cy="34" r="30" fill="none" stroke="${scoreColour(attempt.overall)}"
                    stroke-width="7" stroke-linecap="round"
                    stroke-dasharray="${dash} ${circumference}"/>
          </svg>
          <div class="dial-value">${Math.round(attempt.overall)}</div>
        </div>
        <div class="subscores">${sub}</div>
      </div>

      ${chips ? `<div class="section-label" style="margin:16px 4px 8px">Word by word</div><div class="chips">${chips}</div>` : ""}
      <div id="phoneme-detail"></div>

      ${attempt.transcript ? `<p class="tiny muted" style="margin-top:12px">Heard: ${esc(attempt.transcript)}</p>` : ""}
    </div>`;
}

function wireComparison() {
  document.getElementById("play-model")?.addEventListener("click", () => {
    // Bring the playback row to the top so the score and word-by-word detail
    // below it are on screen while she listens.
    document.getElementById("playback-row")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (state.modelBlob) player.play(state.modelBlob);
  });
  document.getElementById("play-you")?.addEventListener("click", () => {
    if (state.attemptBlob) player.play(state.attemptBlob);
  });
  document.getElementById("pitch-details")?.addEventListener("toggle", drawCanvases);

  view.querySelectorAll("[data-word]").forEach((chip) =>
    chip.addEventListener("click", () => {
      const word = state.attempt.words[Number(chip.dataset.word)];
      const box = document.getElementById("phoneme-detail");
      if (!word?.phonemes?.length) {
        box.innerHTML = `<p class="tiny muted" style="margin-top:10px">No sound-level detail for this word.</p>`;
        return;
      }
      box.innerHTML = `
        <div class="phoneme-box">
          <div class="tiny muted" style="margin-bottom:6px">Sounds in “${esc(word.word)}”</div>
          ${word.phonemes
            .map(
              (p) =>
                `<span class="phoneme"><code>${esc(p.phoneme)}</code><span style="color:${scoreColour(
                  p.score
                )}">${p.score == null ? "" : Math.round(p.score)}</span></span>`
            )
            .join("")}
        </div>`;
    })
  );
}

// ------------------------------------------------------------- celebration

function renderComplete() {
  const c = state.celebration;
  if (!c) {
    state.stage = "path";
    return render();
  }

  const confetti = Array.from({ length: 36 }, (_, i) => {
    const colors = ["var(--green)", "var(--blue)", "var(--gold)", "var(--orange)", "var(--purple)"];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.9;
    const duration = 2 + Math.random() * 1.6;
    const size = 6 + Math.random() * 7;
    return `<span class="confetto" style="left:${left}%;width:${size}px;height:${size * 0.5}px;background:${colors[i % colors.length]};animation-delay:${delay}s;animation-duration:${duration}s"></span>`;
  }).join("");

  view.innerHTML = `
    <div class="confetti">${confetti}</div>
    <div class="complete">
      ${parrotSVG(120)}
      <h1 class="complete-title">${esc(c.title)}</h1>
      <div class="stat-row">
        <div class="stat" style="--stat:var(--blue)">
          <div class="stat-label">Phrases</div>
          <div class="stat-value">${c.phrases}</div>
        </div>
        ${
          c.average != null
            ? `<div class="stat" style="--stat:${scoreColour(c.average)}">
                 <div class="stat-label">Average</div>
                 <div class="stat-value">${c.average}</div>
               </div>`
            : ""
        }
        <div class="stat ${c.streakGrew ? "grew" : ""}" style="--stat:var(--orange)">
          <div class="stat-label">Streak</div>
          <div class="stat-value">${flameSVG()} ${c.streak}</div>
        </div>
      </div>
      ${c.streakGrew ? `<p class="small" style="color:var(--orange);font-weight:800">Streak extended — see you tomorrow at 6:30.</p>` : ""}
      <button class="btn btn-primary btn-big" id="complete-continue">Continue</button>
    </div>`;

  document.getElementById("complete-continue").onclick = () => {
    state.celebration = null;
    state.lesson = null;
    state.stage = "path";
    render();
  };
}

// ----------------------------------------------------------------- canvases

function drawCanvases() {
  drawWave(document.getElementById("wave-model"), state.modelAnalysis?.envelope, "--accent");
  drawWave(document.getElementById("wave-you"), state.attemptAnalysis?.envelope, "--you");
  drawPitch(document.getElementById("pitch"));
}

function prepare(canvas, height) {
  if (!canvas || !canvas.clientWidth) return null;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvas.clientWidth, height);
  return ctx;
}

function drawWave(canvas, envelope, colourVar) {
  const height = 56;
  const ctx = prepare(canvas, height);
  if (!ctx) return;
  if (!envelope?.length) {
    ctx.fillStyle = "rgba(128,128,128,0.25)";
    ctx.fillRect(0, height / 2 - 0.5, canvas.clientWidth, 1);
    return;
  }
  const colour = getComputedStyle(document.documentElement).getPropertyValue(colourVar).trim();
  const width = canvas.clientWidth;
  const barWidth = width / envelope.length;
  ctx.fillStyle = colour;
  envelope.forEach((value, i) => {
    // A floor of 1px keeps silent stretches visible as a hairline rather than
    // vanishing, so the clip's full length reads.
    const barHeight = Math.max(1, value * height * 0.95);
    ctx.fillRect(i * barWidth, height / 2 - barHeight / 2, Math.max(0.8, barWidth - 0.8), barHeight);
  });
}

function drawPitch(canvas) {
  const height = 130;
  const ctx = prepare(canvas, height);
  if (!ctx) return;

  const points = 160;
  const model = resample(relativeSemitones(state.modelAnalysis?.pitch ?? []), points);
  const you = resample(relativeSemitones(state.attemptAnalysis?.pitch ?? []), points);
  const voiced = [...model, ...you].filter((v) => v != null);

  if (!voiced.length) {
    ctx.fillStyle = "rgba(128,128,128,0.6)";
    ctx.font = "12px system-ui";
    ctx.fillText("Not enough voiced sound to read the pitch.", 8, height / 2);
    return;
  }

  const low = Math.min(...voiced);
  const high = Math.max(...voiced);
  const pad = Math.max(1, (high - low) * 0.15);
  const min = low - pad;
  const max = high + pad;
  const width = canvas.clientWidth;
  const y = (value) => height - ((value - min) / (max - min)) * height;

  // Zero line: each speaker's own median, the reference both are measured against.
  if (min < 0 && max > 0) {
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(128,128,128,0.45)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y(0));
    ctx.lineTo(width, y(0));
    ctx.stroke();
    ctx.setLineDash([]);
  }

  const styles = getComputedStyle(document.documentElement);
  drawContour(ctx, model, width, y, styles.getPropertyValue("--accent").trim());
  drawContour(ctx, you, width, y, styles.getPropertyValue("--you").trim());
}

function drawContour(ctx, contour, width, y, colour) {
  ctx.strokeStyle = colour;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  const step = width / (contour.length - 1);
  let penDown = false;
  contour.forEach((value, i) => {
    // Unvoiced frames break the line rather than being drawn through, so
    // consonants and pauses don't invent pitch that wasn't there.
    if (value == null) {
      penDown = false;
      return;
    }
    const point = [i * step, y(value)];
    if (penDown) ctx.lineTo(...point);
    else ctx.moveTo(...point);
    penDown = true;
  });
  ctx.stroke();
}

// ----------------------------------------------------------------- phrases

function renderPhrases() {
  const all = library.allPhrases();
  const captures = library.captures();

  view.innerHTML = `
    <h1>Phrases</h1>
    <p class="muted list-intro">${all.length} card${all.length === 1 ? "" : "s"} — the whole course plus your own,
      all of it open.</p>
    <label class="field"><input type="search" id="search" placeholder="Search"></label>
    <div id="phrase-list"></div>`;

  const search = document.getElementById("search");
  search.addEventListener("input", () => paint(search.value.trim().toLowerCase()));
  paint("");

  function paint(query) {
    const match = (phrase) =>
      !query ||
      phrase.text.toLowerCase().includes(query) ||
      phrase.translation.toLowerCase().includes(query) ||
      (phrase.situation ?? "").toLowerCase().includes(query) ||
      (phrase.usageNote ?? "").toLowerCase().includes(query) ||
      (phrase.focusNote ?? "").toLowerCase().includes(query);

    const sections = [];

    // Order: what she starred, then what still needs finishing, then her own
    // cards, then the course in its own order.
    const starred = library.favouritePhrases().filter(match);
    if (starred.length) {
      sections.push(`<div class="section-label">Favourites</div>
        <div class="rows">${starred.map((p) => rowFor(p)).join("")}</div>`);
    }

    const pending = captures.filter(match);
    if (pending.length) {
      sections.push(`<div class="section-label">Jotted down — needs the Spanish</div>
        <div class="rows">${pending.map((p) => rowFor(p)).join("")}</div>`);
    }

    const own = library.ownPhrases().filter((p) => p.text.trim()).filter(match);
    if (own.length) {
      sections.push(`<div class="section-label">Deb's own phrases</div>
        <div class="rows">${own.map((p) => rowFor(p)).join("")}</div>`);
    }

    for (const unit of COURSE) {
      for (const lesson of unit.lessons) {
        const inLesson = lesson.phrases
          .map((p) => library.decorate({ ...p, language: COURSE_LANGUAGE }))
          .filter(match);
        if (!inLesson.length) continue;
        sections.push(`<div class="section-label">${esc(unit.title)} · ${esc(lesson.title)}</div>
          <div class="rows">${inLesson.map((p) => rowFor(p)).join("")}</div>`);
      }
    }

    const list = document.getElementById("phrase-list");
    list.innerHTML = sections.join("") || `<div class="empty"><p>Nothing matches.</p></div>`;

    list.querySelectorAll("[data-phrase]").forEach((button) =>
      button.addEventListener("click", () => {
        const phrase = library.phraseById(button.dataset.phrase);
        if (phrase) showPhrase(phrase);
      })
    );

    // A capture has nothing to say yet, so it opens straight into the editor.
    list.querySelectorAll("[data-edit]").forEach((button) =>
      button.addEventListener("click", () => editPhrase(library.phraseById(button.dataset.edit)))
    );

    // Repaint rather than flipping the one button: a starred phrase shows in
    // the Favourites section as well as its lesson, and both stars must agree.
    list.querySelectorAll("[data-fav]").forEach((button) =>
      button.addEventListener("click", () => {
        library.toggleFavourite(button.dataset.fav);
        paint(query);
      })
    );
  }

  function rowFor(phrase) {
    const capture = !phrase.text.trim();
    const best = library.bestScore(phrase.id);
    return `
      <div class="row">
        ${starButton(phrase)}
        <button class="row-open"
                ${capture ? `data-edit="${esc(phrase.id)}"` : `data-phrase="${esc(phrase.id)}"`}>
          <span class="row-main">
            <span class="row-title">${esc(phrase.text || phrase.translation || "Untitled")}</span><br>
            <span class="row-sub">${esc(phrase.text ? phrase.translation : "Tap to add the Spanish")}</span>
          </span>
          ${best != null ? `<strong style="color:${scoreColour(best)};font-variant-numeric:tabular-nums">${Math.round(best)}</strong>` : ""}
          <span class="chev">›</span>
        </button>
      </div>`;
  }
}

function showPhrase(phrase) {
  const attempts = library.attemptsFor(phrase.id);
  const scores = [...attempts].reverse().map((a) => a.overall).filter((score) => score != null);

  // A running read on the attempts, so the list says something rather than
  // just listing dates.
  let trend = "";
  if (scores.length >= 2) {
    const change = scores[scores.length - 1] - scores[0];
    trend =
      change >= 5
        ? `Up ${Math.round(change)} points since your first go. ¡Bien!`
        : change <= -5
        ? `Down ${Math.round(Math.abs(change))} points — worth slowing it back down.`
        : `Holding steady around ${Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)}.`;
  }

  openSheet(
    phrase.text,
    `<div class="sheet-lede">
       <p class="muted">${esc(phrase.translation)}</p>
       ${starButton(phrase)}
     </div>
     <div class="level-line">
       <span class="level-badge">Level ${library.recallReady(phrase.id) ? "2" : "1"}</span>
       <span class="tiny muted">${
         library.recallReady(phrase.id)
           ? "Drilled from memory — you get the English and say the Spanish."
           : `${library.toRecall(phrase.id)} more good ${
               library.toRecall(phrase.id) === 1 ? "go" : "goes"
             } and this one turns into a memory question.`
       }</span>
     </div>
     ${phrase.situation ? `<div class="phrase-context"><strong>Situation</strong><span>${esc(phrase.situation)}</span></div>` : ""}
     ${phrase.usageNote ? `<div class="phrase-context"><strong>How it's used</strong><span>${esc(phrase.usageNote)}</span></div>` : ""}
     ${phrase.focusNote ? `<div class="focus-note" style="margin:12px 0 14px"><strong>Tip</strong><span>${esc(phrase.focusNote)}</span></div>` : ""}
     <div class="btn-row" style="margin-bottom:14px">
       <button class="btn btn-primary" id="p-practise">Practise now</button>
       <button class="btn" id="p-edit">Edit</button>
     </div>
     <section id="p-chat" hidden style="margin-bottom:14px"></section>
     ${trend ? `<div class="notice good" style="margin-bottom:12px">${esc(trend)}</div>` : ""}
     ${
       attempts.length
         ? `<div class="section-label">Attempts</div>
            <div class="rows">${attempts
              .map(
                (attempt) => `
              <div class="row" style="cursor:default">
                <button class="link" data-play="${attempt.id}" style="font-size:1.3rem;padding:0 4px">▶</button>
                <span class="row-main">
                  <span class="row-title">${new Date(attempt.recordedAt).toLocaleString([], {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}</span>
                </span>
                ${attempt.overall != null
                  ? `<strong style="color:${scoreColour(attempt.overall)};font-variant-numeric:tabular-nums">${Math.round(attempt.overall)}</strong>`
                  : ""}
                <button class="link btn-danger" data-delete="${attempt.id}">Delete</button>
              </div>`
              )
              .join("")}</div>`
         : `<p class="tiny muted">No attempts yet.</p>`
     }
     ${
       library.isCourse(phrase.id)
         ? `<p class="tiny muted center" style="margin:16px 0 0">This one's part of the course, so it stays put.
              You can edit it, or reset your edit, from Edit above.</p>`
         : `<button class="btn btn-danger" id="p-delete" style="width:100%;margin-top:16px">Delete card</button>`
     }`
  );

  armDelete(document.getElementById("p-delete"), "Tap again to delete for good", async () => {
    await library.removePhrase(phrase.id);
    closeSheet();
    toast("Card deleted.");
    render();
  });

  document.getElementById("p-practise").onclick = () => {
    closeSheet();
    state.tab = "learn";
    startPractice([phrase]);
  };

  document.getElementById("p-edit").onclick = () => {
    closeSheet();
    editPhrase(phrase);
  };

  sheetBody.querySelector("[data-fav]")?.addEventListener("click", () => {
    library.toggleFavourite(phrase.id);
    showPhrase(library.phraseById(phrase.id) ?? phrase);
    render();
  });

  if (settings.hasAssistant) {
    cardChatPanel(document.getElementById("p-chat"), "Ask about this card", () => ({
      languageCode: COURSE_LANGUAGE,
      languageName: "Spanish",
      deck: "Deb-o-lingo",
      card: {
        text: phrase.text,
        translation: phrase.translation,
        situation: phrase.situation ?? "",
        usageNote: phrase.usageNote ?? "",
        focusNote: phrase.focusNote ?? "",
      },
    }));
  }

  sheetBody.querySelectorAll("[data-play]").forEach((button) =>
    button.addEventListener("click", async () => {
      const blob = await audioStore.getRecording(button.dataset.play);
      if (blob) player.play(blob);
      else toast("That recording's audio is missing.");
    })
  );
  sheetBody.querySelectorAll("[data-delete]").forEach((button) =>
    button.addEventListener("click", async () => {
      await library.removeAttempt(button.dataset.delete);
      showPhrase(phrase);
    })
  );
}

/* One editor for every phrase. Deb's own cards are rewritten in place; a
   course card is stored as an override, so Reset puts content.js back. */
function editPhrase(phrase, onSaved = null) {
  const course = phrase ? library.isCourse(phrase.id) : false;

  openSheet(
    phrase ? "Edit phrase" : "New phrase",
    `<label class="field"><span>Spanish — leave empty to jot the English down for later</span>
       <textarea id="f-text">${esc(phrase?.text ?? "")}</textarea></label>
     <label class="field"><span>English</span>
       <textarea id="f-translation">${esc(phrase?.translation ?? "")}</textarea></label>
     <label class="field"><span>Situation (optional)</span>
       <textarea id="f-situation">${esc(phrase?.situation ?? "")}</textarea></label>
     <label class="field"><span>How it's used (optional)</span>
       <textarea id="f-usage">${esc(phrase?.usageNote ?? "")}</textarea></label>
     <label class="field"><span>Tip (optional)</span>
       <textarea id="f-note" placeholder="What to listen for">${esc(phrase?.focusNote ?? "")}</textarea></label>
     ${
       settings.hasAssistant
         ? `<button class="btn" id="f-ai" style="width:100%;margin-bottom:10px">Rebuild the rest with AI</button>
            <div id="f-ai-note" class="notice" hidden></div>
            <p class="tiny muted" style="margin:0 0 12px">Change the Spanish and this rewrites the meaning, the
              situation and the tip to match. Nothing is saved until you tap Save.</p>`
         : ""
     }
     <div class="btn-row">
       <button class="btn" data-close-sheet>Cancel</button>
       <button class="btn btn-primary" id="f-save">Save</button>
     </div>
     ${
       course
         ? library.isEdited(phrase.id)
           ? `<button class="btn" id="f-reset" style="width:100%;margin-top:10px">Reset to the original</button>
              <p class="tiny muted" style="margin:10px 0 0">This is a course card — your version is saved over it,
                and Reset brings the original back.</p>`
           : `<p class="tiny muted" style="margin:12px 0 0">This is a course card. Your edit is saved over it and
                can be reset later.</p>`
         : phrase
         ? `<button class="btn btn-danger" id="f-delete" style="width:100%;margin-top:10px">Delete card</button>`
         : ""
     }`
  );

  autosizeAll(sheetBody);
  wireEditorAI(phrase);

  document.getElementById("f-save").onclick = () => {
    const text = document.getElementById("f-text").value.trim();
    const translation = document.getElementById("f-translation").value.trim();
    if (!text && !translation) {
      toast("Add the Spanish or the English — either will do.");
      return;
    }
    const data = {
      text,
      translation,
      situation: document.getElementById("f-situation").value.trim() || null,
      usageNote: document.getElementById("f-usage").value.trim() || null,
      focusNote: document.getElementById("f-note").value.trim() || null,
    };
    if (phrase) library.updatePhrase({ ...phrase, ...data });
    else library.addPhrase(data);
    closeSheet();
    if (onSaved) onSaved(phrase ? library.phraseById(phrase.id) : null);
    render();
  };

  document.getElementById("f-reset")?.addEventListener("click", () => {
    library.resetPhrase(phrase.id);
    closeSheet();
    render();
  });

  armDelete(document.getElementById("f-delete"), "Tap again to delete for good", async () => {
    await library.removePhrase(phrase.id);
    closeSheet();
    toast("Card deleted.");
    render();
  });
}

/* "Rebuild the rest with AI" — the same /complete-card call the Add tab makes,
   pointed at a card that already exists. Change 'un cortado' to 'un café solo'
   and the English, the situation, the usage note and the tip all follow,
   instead of the card having to be deleted and written again.

   Which fields get sent matters. Editing the Spanish but not the English
   leaves the two disagreeing, and sending both would ask the assistant to
   reconcile a contradiction. So whichever side was actually edited is the one
   sent; the untouched side is dropped, exactly as if it had been left blank on
   the Add tab. Change both, or neither, and both go. */
function wireEditorAI(phrase) {
  const button = document.getElementById("f-ai");
  if (!button) return;

  const field = (id) => document.getElementById(id);
  const before = {
    text: field("f-text").value,
    translation: field("f-translation").value,
    situation: field("f-situation").value,
    usage: field("f-usage").value,
    note: field("f-note").value,
  };
  const noteBox = document.getElementById("f-ai-note");

  const restore = () => {
    for (const [id, value] of [
      ["f-text", before.text], ["f-translation", before.translation],
      ["f-situation", before.situation], ["f-usage", before.usage], ["f-note", before.note],
    ]) field(id).value = value;
    noteBox.hidden = true;
    autosizeAll(sheetBody);
  };

  button.addEventListener("click", async () => {
    const target = field("f-text").value.trim();
    const english = field("f-translation").value.trim();
    if (!target && !english) {
      toast("Write something in Spanish or English first.");
      return;
    }

    const targetEdited = target !== before.text.trim();
    const englishEdited = english !== before.translation.trim();
    const onlyOneSide = targetEdited !== englishEdited;

    const label = button.textContent;
    button.disabled = true;
    button.innerHTML = `<span class="spinner"></span> Rebuilding…`;
    noteBox.hidden = true;
    try {
      const result = await cardAssistant.complete(
        {
          target: onlyOneSide && englishEdited ? "" : target,
          english: onlyOneSide && targetEdited ? "" : english,
          situation: field("f-situation").value.trim(),
          deck: "Deb-o-lingo",
          languageCode: COURSE_LANGUAGE,
          languageName: "Spanish (Spain)",
        },
        settings
      );
      // The sheet may have been closed while it was thinking.
      if (!field("f-text")) return;

      field("f-text").value = result.text;
      field("f-translation").value = result.translation;
      field("f-situation").value = result.situation;
      field("f-usage").value = result.usageNote;
      field("f-note").value = result.focusNote;
      autosizeAll(sheetBody);

      noteBox.className = "notice";
      noteBox.innerHTML = `${esc(result.reviewNote || "Rebuilt. Check it over, then Save.")}
        <button class="link" id="f-ai-undo" style="padding:0 0 0 4px">Undo</button>`;
      noteBox.hidden = false;
      document.getElementById("f-ai-undo").addEventListener("click", restore);
    } catch (error) {
      noteBox.className = "notice bad";
      noteBox.textContent = error.message;
      noteBox.hidden = false;
    } finally {
      if (document.getElementById("f-ai")) {
        button.disabled = false;
        button.textContent = label;
      }
    }
  });
}

// --------------------------------------------------------------------- add
//
// The AI card builder, ported from Xerra. Deb types whatever she can remember
// — in Spanish, in English, or a mangled mix — and the Worker returns a
// corrected card with the meaning, the setting and a pronunciation tip. The
// Gemini key never leaves Cloudflare; this app only holds the shared passcode.

function renderAdd() {
  view.innerHTML = `
    <h1>Add a card</h1>
    <p class="muted add-intro">Write whatever you remember, in Spanish or English. Perico's clever cousin
      will fix it up and build the rest of the card.</p>

    ${
      settings.hasAssistant
        ? ""
        : `<div class="notice add-setup">The card builder needs its address and passcode.
             <button class="link" id="open-assistant-settings">Set it up</button></div>`
    }

    <div class="card add-card">
      ${composerField("add-target", "Spanish", COURSE_LANGUAGE, true)}
      <div class="language-divider"><span>or</span></div>
      ${composerField("add-english", "English", "en-US", true)}

      <div class="field">
        <div class="field-head">
          <label for="add-situation">Situation <span class="muted">(optional)</span></label>
        </div>
        <textarea id="add-situation" rows="2" lang="en-US"></textarea>
      </div>

      <button class="btn btn-primary btn-big add-complete" id="complete-card">Build the card</button>
      <div id="add-error" class="notice bad" hidden></div>
    </div>

    <section id="card-preview" hidden>
      <div class="section-label">Check it over</div>
      <div class="card add-card">
        <div id="review-note" class="notice" hidden></div>
        <label class="field"><span>How it's used</span>
          <textarea id="result-usage" rows="3"></textarea></label>
        <label class="field"><span>Pronunciation tip</span>
          <textarea id="result-focus" rows="3"></textarea></label>
        <div class="btn-row">
          <button class="btn" id="try-again">Try again</button>
          <button class="btn btn-primary" id="save-card">Save it</button>
        </div>
      </div>
    </section>

    <section id="add-chat" hidden></section>

    <div class="card">
      <p class="tiny muted" style="margin:0">
        Saved cards join <strong>Lo tuyo</strong> on the path, five to a lesson, and show up in Repaso.
      </p>
    </div>`;

  autosizeAll(view);

  document.getElementById("open-assistant-settings")?.addEventListener("click", () => {
    state.tab = "settings";
    render();
  });

  const completeButton = document.getElementById("complete-card");
  const tryAgain = document.getElementById("try-again");
  completeButton.addEventListener("click", completeCard);
  tryAgain.addEventListener("click", completeCard);
  document.getElementById("save-card").addEventListener("click", saveCard);

  async function completeCard() {
    const target = document.getElementById("add-target").value.trim();
    const english = document.getElementById("add-english").value.trim();
    if (!target && !english) {
      toast("Write something in Spanish or English first.");
      return;
    }
    if (!settings.hasAssistant) {
      toast("Set the card builder up in Settings first.");
      return;
    }

    setAddBusy(true);
    const errorBox = document.getElementById("add-error");
    errorBox.hidden = true;
    try {
      const result = await cardAssistant.complete(
        {
          target,
          english,
          situation: document.getElementById("add-situation").value.trim(),
          deck: "Deb-o-lingo",
          languageCode: COURSE_LANGUAGE,
          languageName: "Spanish (Spain)",
        },
        settings
      );
      // She may have wandered off to another tab while it thought.
      if (state.tab !== "add") return;

      document.getElementById("add-target").value = result.text;
      document.getElementById("add-english").value = result.translation;
      document.getElementById("add-situation").value = result.situation;
      document.getElementById("result-usage").value = result.usageNote;
      document.getElementById("result-focus").value = result.focusNote;

      const review = document.getElementById("review-note");
      review.textContent = result.reviewNote;
      review.hidden = !result.reviewNote;
      document.getElementById("card-preview").hidden = false;
      // Sized after unhiding — a display:none box has no height to measure.
      autosizeAll(view);

      // A fresh panel per card: a new card means a new conversation.
      cardChatPanel(document.getElementById("add-chat"), "Ask about this card", () => ({
        languageCode: COURSE_LANGUAGE,
        languageName: "Spanish (Spain)",
        deck: "Deb-o-lingo",
        card: {
          text: document.getElementById("add-target").value.trim(),
          translation: document.getElementById("add-english").value.trim(),
          situation: document.getElementById("add-situation").value.trim(),
          usageNote: document.getElementById("result-usage").value.trim(),
          focusNote: document.getElementById("result-focus").value.trim(),
        },
      }));
    } catch (error) {
      errorBox.textContent = error.message;
      errorBox.hidden = false;
    } finally {
      setAddBusy(false);
    }
  }

  function saveCard() {
    const text = document.getElementById("add-target").value.trim();
    const translation = document.getElementById("add-english").value.trim();
    if (!text || !translation) {
      toast("It needs the Spanish and the English before saving.");
      return;
    }
    const duplicate = library
      .allPhrases()
      .some((phrase) => normaliseSentence(phrase.text) === normaliseSentence(text));
    if (duplicate) {
      toast("That one's already in Phrases.");
      return;
    }

    library.addPhrase({
      text,
      translation,
      situation: document.getElementById("add-situation").value.trim() || null,
      usageNote: document.getElementById("result-usage").value.trim() || null,
      focusNote: document.getElementById("result-focus").value.trim() || null,
    });
    renderAdd();
    toast("Saved to Lo tuyo. ¡Olé!");
  }

  function setAddBusy(busy) {
    completeButton.disabled = busy;
    tryAgain.disabled = busy;
    completeButton.innerHTML = busy ? `<span class="spinner"></span> Building…` : "Build the card";
  }
}

/* Compare sentences the way a person would: ignoring case, accents and the
   punctuation Spanish sprinkles around questions. */
function normaliseSentence(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* Chat about a card, shown under a finished card on Add and on the phrase
   sheet. History lives only as long as the panel does — it's a study aside,
   not a stored transcript. getContext runs per question, so edits count. */
function cardChatPanel(host, title, getContext) {
  const history = [];
  let busy = false;

  host.innerHTML = `
    <div class="section-label">${esc(title)}</div>
    <div class="card chat-card">
      <div class="chat-log" hidden></div>
      <form class="chat-form">
        <textarea rows="1" aria-label="${esc(title)}"></textarea>
        <button class="btn btn-primary" type="submit">Ask</button>
      </form>
      <div class="notice bad chat-error" hidden></div>
    </div>`;
  host.hidden = false;

  const log = host.querySelector(".chat-log");
  const form = host.querySelector(".chat-form");
  const input = form.querySelector("textarea");
  autosize(input);
  const send = form.querySelector("button");
  const errorBox = host.querySelector(".chat-error");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    ask();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      ask();
    }
  });

  async function ask() {
    const question = input.value.trim();
    if (!question || busy) return;
    if (!settings.hasAssistant) {
      toast("Set the card builder up in Settings first.");
      return;
    }

    history.push({ role: "user", text: question });
    input.value = "";
    autosize(input);
    errorBox.hidden = true;
    setBusy(true);
    renderLog();
    try {
      const result = await cardAssistant.chat({ ...getContext(), history }, settings);
      history.push({ role: "assistant", text: result.reply });
    } catch (error) {
      // Put the question back so a retry is one tap, not a retype.
      history.pop();
      input.value = question;
      autosize(input);
      errorBox.textContent = error.message;
      errorBox.hidden = false;
    } finally {
      setBusy(false);
      renderLog();
    }
  }

  function setBusy(value) {
    busy = value;
    send.disabled = value;
  }

  function renderLog() {
    log.hidden = !history.length && !busy;
    log.innerHTML =
      history
        .map((turn) => `<div class="chat-msg ${turn.role === "user" ? "user" : "assistant"}">${esc(turn.text)}</div>`)
        .join("") +
      (busy ? `<div class="chat-msg assistant chat-thinking"><span class="spinner"></span></div>` : "");
    log.scrollTop = log.scrollHeight;
  }
}

/* `lang` on the textarea is what points the iPhone keyboard's own dictation
   button at the right language, which is the dictation that actually works
   here — the in-page mic buttons were removed because webkitSpeechRecognition
   doesn't deliver on iOS. */
function composerField(id, label, locale, required = false) {
  return `<div class="field">
    <div class="field-head">
      <label for="${id}">${esc(label)}${required ? "" : ` <span class="muted">(optional)</span>`}</label>
    </div>
    <textarea id="${id}" rows="3" lang="${locale}" autocapitalize="sentences"></textarea>
  </div>`;
}

// ---------------------------------------------------------------- settings

function renderSettings() {
  const doneCount = LESSONS.filter((l) => progress.isDone(l.id)).length;

  view.innerHTML = `
    <h1>Settings</h1>

    <div class="section-label">Card builder</div>
    <div class="card">
      <label class="field"><span>Address</span>
        <input type="text" id="s-assistant-url" value="${esc(settings.assistantEndpoint)}" autocomplete="off"
               placeholder="The address Fin sent you"></label>
      <label class="field"><span>Shared passcode</span>
        <input type="password" id="s-assistant-passcode" value="${esc(settings.assistantPasscode)}" autocomplete="off"></label>
      <button class="btn btn-primary" id="s-assistant-test" style="width:100%">Save and test</button>
      <div id="s-assistant-result" style="margin-top:10px"></div>
      <p class="tiny muted" style="margin:12px 0 0">
        This is what powers the Add tab. The passcode is the shared app one — not a key of your own.
      </p>
    </div>

    <div class="section-label">Azure voice and scoring</div>
    <div class="card">
      <label class="field"><span>Speech key</span>
        <input type="password" id="s-key" value="${esc(settings.azureKey)}" autocomplete="off" placeholder="Paste the key Fin sent you"></label>
      <label class="field"><span>Region</span>
        <input type="text" id="s-region" value="${esc(settings.azureRegion)}" autocomplete="off" placeholder="northeurope"></label>
      <label class="field"><span>Voice</span>
        <select id="s-voice">
          ${VOICES.map(
            (v) => `<option value="${v.id}" ${v.id === settings.azureVoice ? "selected" : ""}>${esc(v.name)} · ${esc(v.detail)}</option>`
          ).join("")}
        </select></label>
      <button class="btn btn-primary" id="s-test" style="width:100%">Save and test</button>
      <div id="s-test-result" style="margin-top:10px"></div>
      <p class="tiny muted" style="margin:12px 0 0">
        The key is stored only in this browser, on this device. It's what makes the
        scoring and the good voices work.
      </p>
    </div>

    <div class="section-label">Lessons</div>
    <div class="card">
      <label class="field"><span>Slow speed — ${Math.round(settings.slowRate * 100)}%</span>
        <input type="range" id="s-rate" min="0.4" max="0.9" step="0.05" value="${settings.slowRate}"></label>
      <div class="switch-row">
        <span>Show meaning up front</span>
        <input type="checkbox" id="s-translation" ${settings.showTranslationUpFront ? "checked" : ""}>
      </div>
      <div class="switch-row">
        <span>Level 2 — drill from memory</span>
        <input type="checkbox" id="s-recall" ${settings.recallMode ? "checked" : ""}>
      </div>
      <p class="tiny muted" style="margin:8px 0 0">Once you've said a card well ${RECALL_AFTER} times it stops
        showing you the Spanish — you get the English and have to remember it. There's a "Show me" if you're stuck.</p>
    </div>

    <div class="section-label">Audio</div>
    <div class="card">
      <button class="btn" id="s-prefetch" style="width:100%">Download all lesson audio</button>
      <div id="s-prefetch-status" class="tiny muted" style="margin-top:8px"></div>
      <button class="btn btn-danger" id="s-clear" style="width:100%;margin-top:10px">Clear audio cache</button>
      <p class="tiny muted" style="margin:10px 0 0" id="s-usage"></p>
    </div>

    <div class="section-label">Your data</div>
    <div class="card">
      <button class="btn" id="s-export" style="width:100%">Export progress and phrases</button>
      <label class="btn" style="width:100%;margin-top:10px;cursor:pointer">
        Import from a file
        <input type="file" id="s-import" accept="application/json" hidden>
      </label>
      <p class="tiny muted" style="margin:10px 0 0">
        ${doneCount} of ${LESSONS.length} lessons done · ${library.customPhrases.length} own phrase${
          library.customPhrases.length === 1 ? "" : "s"
        } ·
        ${library.favourites.length} favourite${library.favourites.length === 1 ? "" : "s"} ·
        ${library.attempts.length} recordings. iOS can clear a web app's storage if it
        goes unused for a long time, so export once in a while.
      </p>
    </div>

    <p class="tiny muted center" style="margin-top:22px">deb·o·lingo — made for Deb, with love (and a parrot)</p>`;

  document.getElementById("s-rate").oninput = (event) => {
    settings.slowRate = Number(event.target.value);
    settings.save();
    event.target.parentElement.querySelector("span").textContent = `Slow speed — ${Math.round(settings.slowRate * 100)}%`;
  };

  document.getElementById("s-translation").onchange = (event) => {
    settings.showTranslationUpFront = event.target.checked;
    settings.save();
  };

  document.getElementById("s-recall").onchange = (event) => {
    settings.recallMode = event.target.checked;
    settings.save();
  };

  document.getElementById("s-assistant-test").onclick = async () => {
    settings.assistantEndpoint = document.getElementById("s-assistant-url").value.trim();
    settings.assistantPasscode = document.getElementById("s-assistant-passcode").value.trim();
    settings.save();

    const box = document.getElementById("s-assistant-result");
    if (!settings.hasAssistant) {
      box.innerHTML = `<div class="notice">Enter the address and the shared passcode.</div>`;
      return;
    }
    box.innerHTML = `<p class="small muted"><span class="spinner"></span> Testing…</p>`;
    try {
      const result = await cardAssistant.test(settings);
      box.innerHTML = `<div class="notice good">Card builder connected${result.model ? ` · ${esc(result.model)}` : ""}.</div>`;
    } catch (error) {
      box.innerHTML = `<div class="notice bad">${esc(error.message)}</div>`;
    }
  };

  document.getElementById("s-voice").onchange = (event) => {
    settings.azureVoice = event.target.value;
    settings.save();
  };

  document.getElementById("s-test").onclick = async () => {
    settings.azureKey = document.getElementById("s-key").value.trim();
    settings.azureRegion = document.getElementById("s-region").value.trim();
    settings.azureVoice = document.getElementById("s-voice").value;
    settings.save();

    const box = document.getElementById("s-test-result");
    if (!settings.hasAzure) {
      box.innerHTML = `<div class="notice">No key set — the browser voice will be used, without comparison or scoring.</div>`;
      return;
    }
    box.innerHTML = `<p class="small muted"><span class="spinner"></span> Testing…</p>`;
    try {
      await speech.synthesise("Hola", COURSE_LANGUAGE, settings);
      box.innerHTML = `<div class="notice good">Azure is working. New audio will use ${esc(settings.azureVoice)}.</div>`;
    } catch (error) {
      box.innerHTML = `<div class="notice bad">${esc(speech.lastError ?? error.message)}</div>`;
    }
  };

  document.getElementById("s-prefetch").onclick = async () => {
    const status = document.getElementById("s-prefetch-status");
    if (!settings.hasAzure) {
      status.textContent = "Needs an Azure key.";
      return;
    }
    await speech.prefetch(library.drillable(), settings, (done, total) => {
      status.textContent = `${done} / ${total}`;
    });
    status.textContent = "Done — every lesson now works offline.";
    showUsage();
  };

  document.getElementById("s-clear").onclick = async () => {
    await audioStore.clearModelCache();
    toast("Cached model audio cleared. Recordings are untouched.");
    showUsage();
  };

  document.getElementById("s-export").onclick = () => {
    const blob = new Blob([library.exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `debolingo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  document.getElementById("s-import").onchange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      library.importJSON(await file.text());
      toast("Imported.");
      render();
    } catch (error) {
      toast(`Import failed: ${error.message}`);
    }
  };

  showUsage();
}

async function showUsage() {
  const el = document.getElementById("s-usage");
  if (!el) return;
  const usage = await audioStore.usage();
  el.textContent = usage
    ? `Using ${(usage.usage / 1e6).toFixed(1)} MB of roughly ${(usage.quota / 1e6).toFixed(0)} MB available.`
    : "";
}

// ------------------------------------------------------------------ mascot
//
// Perico the parrot. Parrots repeat what they hear, which is the entire
// pedagogy of this app. Deliberately NOT an owl.

function parrotSVG(size = 80) {
  return `
  <svg class="parrot" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="50" cy="62" rx="26" ry="30" fill="#58cc02"/>
    <ellipse cx="50" cy="70" rx="15" ry="19" fill="#89e219"/>
    <circle cx="50" cy="34" r="21" fill="#58cc02"/>
    <path d="M39 12 Q50 2 61 12 Q57 7 50 7 Q43 7 39 12z" fill="#ff4b4b"/>
    <path d="M44 10 Q50 4 56 10 L53 14 L47 14z" fill="#ffc800"/>
    <circle cx="42" cy="32" r="7.5" fill="#fff"/>
    <circle cx="58" cy="32" r="7.5" fill="#fff"/>
    <circle cx="43.5" cy="33" r="3.4" fill="#3c3c3c"/>
    <circle cx="56.5" cy="33" r="3.4" fill="#3c3c3c"/>
    <path d="M50 38 Q59 38 57 46 Q54 52 50 52 Q46 52 43 46 Q41 38 50 38z" fill="#ffc800"/>
    <path d="M46 51 Q50 54 54 51 L53 56 Q50 58 47 56z" fill="#e0a500"/>
    <path d="M27 55 Q18 66 26 80 Q32 72 34 62z" fill="#1cb0f6"/>
    <path d="M73 55 Q82 66 74 80 Q68 72 66 62z" fill="#1cb0f6"/>
    <path d="M44 90 L44 96 M50 90 L50 97 M56 90 L56 96" stroke="#e0a500" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

function flameSVG() {
  return `<svg class="flame" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4-3 5.5-3 9a3.6 3.6 0 0 0 .4 1.7C7.6 12 7 10.6 7 10.6 5.6 12.4 5 14.2 5 15.7 5 19.7 8.1 22 12 22s7-2.3 7-6.3c0-4.9-5.2-7-7-13.7z"/></svg>`;
}

// -------------------------------------------------------------------- boot

settings.load();
library.load();
progress.load();
state.showTranslation = settings.showTranslationUpFront;
render();

// Voice list on Safari populates asynchronously.
window.speechSynthesis?.getVoices?.();
window.speechSynthesis?.addEventListener?.("voiceschanged", () => {});

window.addEventListener("resize", () => {
  if (state.tab === "learn" && state.stage === "drill") drawCanvases();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
