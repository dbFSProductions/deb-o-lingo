// Stories: the list, and a story with its questions.

import { STORIES, STORY_TIERS, storyById, tierOf } from "./content.js";
import { stories } from "./store.js";
import { PLAY_SVG, esc, homeLink, sayAloud, shuffle, state, stopEverything, view } from "./core.js";
import { render } from "./app.js";

export function openStories() {
  stopEverything();
  state.tab = "stories";
  state.story = null;
  render();
}

export function openStory(id) {
  const story = storyById(id);
  if (!story) return;
  stopEverything();
  state.tab = "stories";
  state.story = {
    id,
    order: story.questions.map((q) => shuffle(q.options.map((_, i) => i))),
    picks: {},
    english: false,
    finishedAt: null,
    result: null,
  };
  render();
}

/* The list, grouped by tier under a banner each — the same banner-and-
   striped-rows shape as Phrases, in Stories' red — so the climb from four
   lines to eight is visible before a story is opened. The numbering runs on
   through the groups, because "story 17" is how a story gets referred to. */
export function renderStories() {
  const read = STORIES.filter((story) => stories.isRead(story.id)).length;
  const row = (story, i) => {
    const r = stories.results[story.id];
    const full = r && r.best === r.of;
    return `
      <button class="row striped story-row" style="--hue:var(--red)" data-open-story="${esc(story.id)}">
        <span class="story-num">${i + 1}</span>
        <span class="row-main">
          <span class="row-title" lang="es-ES">${esc(story.title)}</span><br>
          <span class="row-sub">${esc(story.teaser)}</span>
        </span>
        ${r ? `<span class="story-best ${full ? "full" : ""}">${r.best}/${r.of}${full ? " ✓" : ""}</span>` : ""}
        <span class="chev">›</span>
      </button>`;
  };
  const groups = STORY_TIERS.map((tier) => {
    const members = STORIES.map((story, i) => ({ story, i })).filter(({ story }) => tierOf(story) === tier.id);
    if (!members.length) return "";
    const done = members.filter(({ story }) => stories.isRead(story.id)).length;
    return `
      <div class="list-banner" style="--hue:var(--red);--hue-dark:var(--red-dark)">
        <span class="list-banner-name">${esc(tier.title)} <span class="list-banner-sub">${esc(tier.sub)}</span></span>
        <span class="list-banner-count">${done} of ${members.length}</span>
      </div>
      <div class="rows rows-spaced">${members.map(({ story, i }) => row(story, i)).join("")}</div>`;
  });
  view.innerHTML = `
    <header class="home-head section-head">
      <div class="wordmark">Stories</div>
      ${homeLink()}
    </header>
    <p class="muted section-intro">A little scene, then some questions about it. They get longer and harder as they go.
      ${read ? `${read} of ${STORIES.length} read.` : `${STORIES.length} to read, easiest first.`}</p>
    ${groups.join("")}`;
}

export function renderStory() {
  const story = storyById(state.story?.id);
  if (!story) {
    state.story = null;
    return render();
  }
  const session = state.story;
  const total = story.questions.length;
  const done = Object.keys(session.picks).length === total;
  const at = STORIES.indexOf(story);
  const next = STORIES[at + 1] ?? null;
  const score = story.questions.filter((q, i) => session.picks[i] === q.answer).length;

  view.innerHTML = `
    <header class="home-head section-head">
      <div class="wordmark" lang="es-ES">${esc(story.title)}</div>
      <button class="link" data-open-stories="1">‹ Stories</button>
    </header>
    <p class="muted section-intro">Story ${at + 1} of ${STORIES.length} · ${esc(
      STORY_TIERS.find((tier) => tier.id === tierOf(story))?.title ?? ""
    )}. Tap a line to hear it${
      done ? "." : " — the English appears once you've answered."
    }</p>

    <div class="card story-card striped" style="--hue:var(--red)">
      <ol class="story-lines">
        ${story.lines
          .map(
            (line, i) => `
          <li class="story-line">
            <button class="reply-play" data-line="${i}" aria-label="Listen to this line">${PLAY_SVG}</button>
            <span class="story-main">
              <span class="story-es" lang="es-ES">${esc(line.es)}</span>
              ${session.english ? `<span class="story-en">${esc(line.en)}</span>` : ""}
            </span>
          </li>`
          )
          .join("")}
      </ol>
      <div class="story-tools">
        <button class="btn btn-ghost story-read" id="story-read">Read it all to me</button>
        ${
          done
            ? `<button class="link" id="story-english">${session.english ? "Hide the English" : "Show the English"}</button>`
            : ""
        }
      </div>
    </div>

    <div class="section-label">Questions</div>
    ${story.questions
      .map((q, qi) => {
        const picked = session.picks[qi];
        const open = picked == null;
        return `
        <div class="card story-q ${open ? "" : picked === q.answer ? "right" : "wrong"}" data-question="${qi}">
          <p class="story-question">${qi + 1}. ${esc(q.q)}</p>
          <div class="story-options">
            ${session.order[qi]
              .map((oi) => {
                const cls = open ? "" : oi === q.answer ? "is-right" : oi === picked ? "is-wrong" : "";
                return `<button class="story-opt ${cls}" data-q="${qi}" data-o="${oi}" lang="es-ES" ${
                  open ? "" : "disabled"
                }>${esc(q.options[oi])}</button>`;
              })
              .join("")}
          </div>
          ${
            open
              ? ""
              : `<p class="story-verdict">${
                  picked === q.answer ? "¡Eso es!" : `Not quite — it's <strong lang="es-ES">${esc(q.options[q.answer])}</strong>.`
                }</p>`
          }
        </div>`;
      })
      .join("")}

    <div id="story-done">${
      done
        ? `<div class="card story-result">
             <h2>${score} of ${total} — ${score === total ? "¡perfecto!" : score >= total - 1 ? "¡muy bien!" : "read it again, it'll come."}</h2>
             <p class="muted" style="margin:6px 0 12px">${
               session.result?.improved && session.result.times > 1
                 ? "Your best on this one so far."
                 : session.result?.times > 1
                 ? `Best so far ${session.result.best} of ${session.result.of}.`
                 : "First read. The English is under the story now."
             }</p>
             <div class="btn-row">
               ${next ? `<button class="btn btn-primary" data-open-story="${esc(next.id)}">Next story</button>` : ""}
               <button class="btn ${next ? "btn-ghost" : "btn-primary"}" data-open-story="${esc(story.id)}">Read it again</button>
             </div>
           </div>`
        : ""
    }</div>`;

  view.querySelectorAll("[data-line]").forEach((button) =>
    button.addEventListener("click", () => {
      const line = story.lines[Number(button.dataset.line)];
      if (line) sayAloud(button, line.es, "Couldn't play that line.");
    })
  );
  /* The whole scene as one utterance, so the lines run on the way a voice
     would read them. Keyed on the joined text, it is cached like any phrase. */
  document.getElementById("story-read").onclick = (event) =>
    sayAloud(event.currentTarget, story.lines.map((line) => line.es).join(" "), "Couldn't read the story.");

  document.getElementById("story-english")?.addEventListener("click", () => {
    session.english = !session.english;
    render();
  });

  view.querySelectorAll(".story-opt:not([disabled])").forEach((button) =>
    button.addEventListener("click", () => {
      const qi = Number(button.dataset.q);
      if (session.picks[qi] != null) return;
      session.picks[qi] = Number(button.dataset.o);
      if (Object.keys(session.picks).length === total) {
        session.finishedAt = Date.now();
        const right = story.questions.filter((q, i) => session.picks[i] === q.answer).length;
        session.result = stories.record(story.id, right, total);
      }
      render();
      if (session.finishedAt) {
        document.getElementById("story-done")?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    })
  );
}
