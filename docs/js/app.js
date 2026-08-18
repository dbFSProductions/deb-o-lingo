// Deb-o-lingo — app shell, routing and views.
//
// The drill mechanics (record, analyse, compare, score) are ported from Xerra;
// the shell around them is a Duolingo-style course: a winding path of small
// lessons, a progress bar, result banners, streaks and a celebration screen.

import { library, settings, progress, audioStore, VOICES, uid } from "./store.js";
import { COURSE, COURSE_LANGUAGE, LESSONS, lessonById } from "./content.js";
import { Recorder, Player, analyse, relativeSemitones, resample } from "./audio.js";
import { speech, browserSpeech, scoring } from "./speech.js";

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
  tab: "learn", // learn | phrases | settings
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

function toast(message, ms = 2600) {
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (toastEl.hidden = true), ms);
}

// ---------------------------------------------------------------- updating
//
// Deb should never have to know what a cache is. The service worker fetches
// fresh code whenever there's signal; this half makes sure a new build that
// lands while the app is open actually reaches the screen — without yanking
// the page out from under a recording.

const UPDATED_FLAG = "debolingo.justUpdated";

let reloadPending = false;
let reloading = false;

function midLesson() {
  return state.tab === "learn" && state.stage === "drill";
}

/** Reload now if it's a harmless moment, otherwise as soon as it is one. */
function applyUpdate() {
  if (reloading) return;
  if (midLesson()) {
    reloadPending = true; // render() picks this up when she leaves the drill
    return;
  }
  reloading = true;
  try {
    sessionStorage.setItem(UPDATED_FLAG, "1");
  } catch {
    /* private mode — the toast is a nicety, the reload is the point */
  }
  location.reload();
}

/** Called from render() so a deferred update lands the moment the drill ends. */
function flushPendingUpdate() {
  if (reloadPending && !midLesson()) applyUpdate();
}

/**
 * Ask the server whether there's a newer build, right now. Resolves true if
 * one is on its way in (in which case the page is about to reload itself).
 */
async function checkForNewVersion() {
  if (!("serviceWorker" in navigator)) {
    location.reload();
    return true;
  }
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      location.reload();
      return true;
    }
    await registration.update();
    const pending = registration.installing ?? registration.waiting;
    if (!pending) return false;
    pending.postMessage({ type: "skip-waiting" });
    return true;
  } catch {
    return false;
  }
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
  window.scrollTo(0, 0);
  flushPendingUpdate(); // a new build that landed mid-drill lands now instead
  if (state.tab === "learn") {
    if (state.stage === "drill") return renderDrill();
    if (state.stage === "complete") return renderComplete();
    return renderPath();
  }
  if (state.tab === "phrases") return renderPhrases();
  return renderSettings();
}

// -------------------------------------------------------------------- path

function unlockOrder() {
  return LESSONS.map((l) => l.id);
}

function firstOpenLesson() {
  const order = unlockOrder();
  return order.find((id) => !progress.isDone(id)) ?? null;
}

function isUnlocked(lessonId) {
  if (settings.unlockAll) return true;
  const order = unlockOrder();
  const index = order.indexOf(lessonId);
  if (index <= 0) return true;
  return progress.isDone(order[index - 1]) || progress.isDone(lessonId);
}

/* A phrase becomes practisable once its lesson has actually been studied —
   so Phrases and Repaso agree on what Deb has met, and she can't jump ahead
   into a drill for words she has never seen. */
function phrasesUnlocked(lessonId) {
  return settings.unlockAll || progress.isDone(lessonId);
}

function renderPath() {
  const streak = progress.currentStreak();
  const owed = progress.owedToday();
  const doneCount = LESSONS.filter((l) => progress.isDone(l.id)).length;
  const current = firstOpenLesson();

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

  const units = COURSE.map((unit) => {
    const nodes = unit.lessons
      .map((lesson) => {
        const done = progress.isDone(lesson.id);
        const unlocked = isUnlocked(lesson.id);
        const isCurrent = lesson.id === current && unlocked;
        const offset = offsets[nodeIndex++ % offsets.length];
        const best = progress.lessons[lesson.id]?.best;

        const icon = done
          ? `<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
          : unlocked
          ? `<svg viewBox="0 0 24 24"><path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3-5.7-3.1-5.7 3.1 1.2-6.3L2.8 9.3l6.4-.8z"/></svg>`
          : lockSVG("");

        return `
          <div class="node-slot" style="--offset:${offset}">
            ${isCurrent ? `<div class="node-callout">START</div>` : ""}
            <button class="node ${done ? "done" : unlocked ? "open" : "locked"} ${isCurrent ? "current" : ""}"
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
  }).join("");

  const practiceReady = doneCount > 0 || library.customPhrases.length > 0;

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
      <div class="path">
        <div class="node-slot" style="--offset:0">
          <button class="node practice ${practiceReady ? "open" : "locked"}" id="practice"
                  style="--node:var(--blue);--node-dark:var(--blue-dark)" aria-label="Practice">
            <svg viewBox="0 0 24 24"><path d="M7 8v8M4.5 9.5v5M17 8v8M19.5 9.5v5M7 12h10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>
          </button>
          <div class="node-title">Repaso — mix it all up</div>
        </div>
      </div>
    </section>

    ${settings.hasAzure ? "" : `<div class="notice" style="margin-top:8px">Without an Azure key you can listen with the
      browser's voice, but the waveform comparison and scoring won't run. Add the key in Settings.</div>`}`;

  view.querySelectorAll("[data-lesson]").forEach((button) =>
    button.addEventListener("click", () => {
      const lesson = lessonById(button.dataset.lesson);
      if (!lesson) return;
      if (!isUnlocked(lesson.id)) {
        toast("Finish the lesson above this one first ☝️");
        return;
      }
      startLesson(lesson);
    })
  );

  document.getElementById("practice").onclick = () => {
    if (!practiceReady) {
      toast("Finish your first lesson, then come back to mix.");
      return;
    }
    startPractice();
  };

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
    queue: lesson.phrases.map((p) => ({ ...p, language: COURSE_LANGUAGE })),
    index: 0,
    results: [],
    practice: false,
  };
  state.stage = "drill";
  loadPhrase();
}

function startPractice(queueOverride = null) {
  stopEverything();
  const donePhrases = LESSONS.filter((l) => progress.isDone(l.id)).flatMap((l) =>
    l.phrases.map((p) => ({ ...p, language: COURSE_LANGUAGE }))
  );
  const pool = queueOverride ?? shuffle([...donePhrases, ...library.customPhrases]).slice(0, 7);
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
  scoring.lastError = null;
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

  const total = lesson.queue.length;
  const filled = lesson.index + (state.banner ? 1 : 0);
  const pct = Math.round((filled / total) * 100);
  const hasModel = Boolean(state.modelBlob);

  view.innerHTML = `
    <div class="lesson-top">
      <button class="quit" id="quit" aria-label="Quit lesson">✕</button>
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
    </div>

    <p class="instruction">Listen, then say it out loud</p>

    <div class="card drill-card">
      <p class="drill-text">${esc(phrase.text)}</p>
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
    </div>

    <div class="btn-row">
      <button class="btn btn-primary" id="listen">🔊 Listen</button>
      <button class="btn" id="slow">🐢 Slow</button>
    </div>
    ${
      state.loadingModel
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
      <p class="small muted" id="record-label">Tap, say it, tap again</p>
      ${state.banner ? "" : `<button class="link muted-link" id="skip">SKIP</button>`}
    </div>

    <div id="comparison">${state.attempt ? renderComparison() : ""}</div>

    ${state.banner ? renderBanner() : ""}`;

  document.getElementById("quit").onclick = quitLesson;
  document.getElementById("reveal")?.addEventListener("click", () => {
    state.showTranslation = true;
    render();
  });
  document.getElementById("listen").onclick = () => playModel(1);
  document.getElementById("slow").onclick = () => playModel(settings.slowRate);
  document.getElementById("record").onclick = toggleRecording;
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
    render();
  });
  document.getElementById("banner-continue")?.addEventListener("click", () => {
    stopEverything();
    advance({ skipped: false, score: state.attempt?.overall ?? null });
  });

  if (state.attempt) wireComparison();
  drawCanvases();
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
      sub: "A native would follow you without blinking.",
    },
    ok: {
      cls: "ok",
      head: "¡Bien!",
      sub: "Solid. The tinted words below could use another listen.",
    },
    retry: {
      cls: "retry",
      head: "Casi…",
      sub: "Play the model once more and copy the rhythm.",
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

  return `
    <div class="banner ${k.cls}">
      <div class="banner-text">
        <div class="banner-head">${k.head}${banner.score != null ? ` · ${Math.round(banner.score)}` : ""}</div>
        <div class="banner-sub">${k.sub}</div>
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

  const attempt = {
    id: uid(),
    phraseID: phrase.id,
    recordedAt: new Date().toISOString(),
    duration,
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

  if (!settings.hasAzure) return;

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
}

function renderComparison() {
  const attempt = state.attempt;
  const timing = timingSummary();

  return `
    <hr style="border:0;border-top:2px solid var(--line);margin:20px 0">

    <div class="btn-row">
      <button class="btn" id="play-model" ${state.modelBlob ? "" : "disabled"}>Model</button>
      <button class="btn" id="play-you">You</button>
      <button class="btn btn-primary" id="play-ab" ${state.modelBlob ? "" : "disabled"}>A / B</button>
    </div>

    <div class="card" style="margin-top:14px">
      <div class="wave-label" style="color:var(--accent)">Model</div>
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
  if (ratio < 0.8) return `You're about ${Math.round((1 - ratio) * 100)}% quicker than the model.`;
  if (ratio < 1.2) return "Your timing is close to the model — nicely matched.";
  if (ratio < 1.6) return `You're about ${Math.round((ratio - 1) * 100)}% slower than the model.`;
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
    if (state.modelBlob) player.play(state.modelBlob);
  });
  document.getElementById("play-you")?.addEventListener("click", () => {
    if (state.attemptBlob) player.play(state.attemptBlob);
  });
  document.getElementById("play-ab")?.addEventListener("click", () => {
    if (state.modelBlob && state.attemptBlob) {
      player.playBackToBack(state.modelBlob, state.attemptBlob);
    }
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
  view.innerHTML = `
    <h1>Phrases</h1>
    <label class="field"><input type="search" id="search" placeholder="Search"></label>
    <div id="phrase-list"></div>`;

  const search = document.getElementById("search");
  search.addEventListener("input", () => paint(search.value.trim().toLowerCase()));
  paint("");

  function paint(query) {
    const match = (phrase) =>
      !query ||
      phrase.text.toLowerCase().includes(query) ||
      phrase.translation.toLowerCase().includes(query);

    const sections = [];

    const customs = library.customPhrases.filter(match);
    if (customs.length) {
      sections.push(`<div class="section-label">Deb's own phrases</div>
        <div class="rows">${customs.map((p) => rowFor(p)).join("")}</div>`);
    }

    for (const unit of COURSE) {
      for (const lesson of unit.lessons) {
        const inLesson = lesson.phrases
          .map((p) => ({ ...p, language: COURSE_LANGUAGE }))
          .filter(match);
        if (!inLesson.length) continue;
        const locked = !phrasesUnlocked(lesson.id);
        sections.push(`<div class="section-label ${locked ? "locked" : ""}">${esc(unit.title)} · ${esc(
          lesson.title
        )}${locked ? lockSVG() : ""}</div>
          <div class="rows">${inLesson.map((p) => rowFor(p, locked)).join("")}</div>`);
      }
    }

    document.getElementById("phrase-list").innerHTML =
      sections.join("") || `<div class="empty"><p>Nothing matches.</p></div>`;

    document.querySelectorAll("[data-phrase]").forEach((button) =>
      button.addEventListener("click", () => {
        const phrase = library.phraseById(button.dataset.phrase);
        if (phrase) showPhrase(phrase);
      })
    );

    document.querySelectorAll("[data-locked]").forEach((button) =>
      button.addEventListener("click", () => toast("Do this lesson in Learn first, then practise it here 🔒"))
    );
  }

  function rowFor(phrase, locked = false) {
    const best = library.bestScore(phrase.id);
    return `
      <button class="row ${locked ? "locked" : ""}"
              ${locked ? `data-locked="1"` : `data-phrase="${esc(phrase.id)}"`}>
        <span class="row-main">
          <span class="row-title">${esc(phrase.text)}</span><br>
          <span class="row-sub">${esc(phrase.translation)}</span>
        </span>
        ${best != null && !locked ? `<strong style="color:${scoreColour(best)};font-variant-numeric:tabular-nums">${Math.round(best)}</strong>` : ""}
        ${locked ? lockSVG() : `<span class="chev">›</span>`}
      </button>`;
  }
}

function showPhrase(phrase) {
  const attempts = library.attemptsFor(phrase.id);
  const custom = library.customPhrases.some((p) => p.id === phrase.id);

  openSheet(
    phrase.text,
    `<p class="muted" style="margin-bottom:10px">${esc(phrase.translation)}</p>
     ${phrase.focusNote ? `<div class="focus-note" style="margin-bottom:14px"><strong>Tip</strong><span>${esc(phrase.focusNote)}</span></div>` : ""}
     <div class="btn-row" style="margin-bottom:14px">
       <button class="btn btn-primary" id="p-practise">Practise now</button>
       ${custom ? `<button class="btn" id="p-edit">Edit</button>` : ""}
     </div>
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
     }`
  );

  document.getElementById("p-practise").onclick = () => {
    closeSheet();
    state.tab = "learn";
    startPractice([phrase]);
  };
  document.getElementById("p-edit")?.addEventListener("click", () => {
    closeSheet();
    editCustomPhrase(phrase);
  });

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

function editCustomPhrase(phrase) {
  openSheet(
    phrase ? "Edit phrase" : "New phrase",
    `<label class="field"><span>Spanish</span>
       <textarea id="f-text">${esc(phrase?.text ?? "")}</textarea></label>
     <label class="field"><span>English</span>
       <textarea id="f-translation">${esc(phrase?.translation ?? "")}</textarea></label>
     <label class="field"><span>Tip (optional)</span>
       <textarea id="f-note" placeholder="What to listen for">${esc(phrase?.focusNote ?? "")}</textarea></label>
     <div class="btn-row">
       <button class="btn" data-close-sheet>Cancel</button>
       <button class="btn btn-primary" id="f-save">Save</button>
     </div>
     ${phrase ? `<button class="btn btn-danger" id="f-delete" style="width:100%;margin-top:10px">Delete phrase</button>` : ""}`
  );

  document.getElementById("f-save").onclick = () => {
    const text = document.getElementById("f-text").value.trim();
    const translation = document.getElementById("f-translation").value.trim();
    if (!text) {
      toast("It needs the Spanish, at least.");
      return;
    }
    const data = {
      text,
      translation,
      focusNote: document.getElementById("f-note").value.trim() || null,
    };
    if (phrase) library.updateCustom({ ...phrase, ...data });
    else library.addCustom(data);
    closeSheet();
    render();
  };

  document.getElementById("f-delete")?.addEventListener("click", async () => {
    await library.removeCustom(phrase.id);
    closeSheet();
    render();
  });
}

// ---------------------------------------------------------------- settings

function renderSettings() {
  const doneCount = LESSONS.filter((l) => progress.isDone(l.id)).length;

  view.innerHTML = `
    <h1>Settings</h1>

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
        <span>Unlock all lessons</span>
        <input type="checkbox" id="s-unlock" ${settings.unlockAll ? "checked" : ""}>
      </div>
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
        ${doneCount} of ${LESSONS.length} lessons done · ${library.customPhrases.length} own phrases ·
        ${library.attempts.length} recordings. iOS can clear a web app's storage if it
        goes unused for a long time, so export once in a while.
      </p>
    </div>

    <div class="section-label">App version</div>
    <div class="card">
      <button class="btn" id="s-update" style="width:100%">Check for a new version</button>
      <p class="tiny muted" style="margin:10px 0 0" id="s-update-status">
        Deb-o-lingo updates itself whenever you open it with signal. This button is
        for when you're impatient.
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

  document.getElementById("s-unlock").onchange = (event) => {
    settings.unlockAll = event.target.checked;
    settings.save();
  };

  document.getElementById("s-update").onclick = async () => {
    const status = document.getElementById("s-update-status");
    status.textContent = "Looking…";
    const fresh = await checkForNewVersion();
    // A new build reloads the page out from under us, so reaching this line
    // at all means there wasn't one.
    status.textContent = fresh
      ? "Found a new version — updating now…"
      : "You're on the newest version. ✨";
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
    await speech.prefetch(library.allPhrases(), settings, (done, total) => {
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

function lockSVG(cls = "lock-icon") {
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="9" rx="2.4"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>`;
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

// ------------------------------------------------------------ auto-updating

const sawController = Boolean(navigator.serviceWorker?.controller);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("sw.js");

      // Ask GitHub Pages whether there's a newer build: on launch, and again
      // whenever she comes back to the app (an installed PWA can sit in the
      // background for days without a single page load).
      const checkForUpdate = () => registration.update().catch(() => {});
      checkForUpdate();
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") checkForUpdate();
      });

      // A worker that installed while we were looking shouldn't wait politely.
      registration.addEventListener("updatefound", () => {
        const installing = registration.installing;
        installing?.addEventListener("statechange", () => {
          if (installing.state === "installed" && navigator.serviceWorker.controller) {
            installing.postMessage({ type: "skip-waiting" });
          }
        });
      });
    } catch {
      /* No service worker (file://, private mode) — the app still works. */
    }
  });

  // The new worker announces itself; we say "got it" so it doesn't force a
  // navigation, then reload on our own terms.
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type !== "updated") return;
    const worker = event.source ?? navigator.serviceWorker.controller;
    worker?.postMessage({ type: "update-ack" });
    applyUpdate();
  });

  // Belt and braces: a worker taking control means the code on screen is old.
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (sawController) applyUpdate();
  });
}

try {
  if (sessionStorage.getItem(UPDATED_FLAG)) {
    sessionStorage.removeItem(UPDATED_FLAG);
    toast("Updated to the newest Deb-o-lingo ✨");
  }
} catch {
  /* no sessionStorage, no toast */
}
