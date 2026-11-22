// Build, the sentence game: an English prompt, a tray of Spanish tiles, put them in order.

import { FRAMES } from "./content.js";
import { library, settings, awards, genderOf } from "./store.js";
import { esc, homeLink, normaliseSentence, sayAloud, shuffle, state, stopEverything, view } from "./core.js";
import { render } from "./app.js";
import { checkAwards } from "./prizes.js";

/* Asked for as a game that gets her "to combine words and build sentences":
   her Palabras words were coming on, her sentences were not. Match trains
   recognising a word; this trains the step after it, going from a meaning to
   Spanish in the right order.

   A sentence is a frame from FRAMES (content.js) with one of her nouns in the
   gap. The frame's chunks are one tile each ("me pone", "por favor") because a
   frame is learnt as a unit; the article and the noun are two, because el or
   la — un or una, al or a la — is the one real decision in the sentence. The
   tray carries three tiles too many: the article of the other gender, another
   noun the frame takes, and another frame's opening. Punctuation and capitals
   are off the tiles — "¿Me" would say where it goes — and on the finished
   line.

   Tap a tray tile to place it, tap a placed one to send it back; no dragging.
   Check commits. A wrong Check shakes the tiles in the wrong place and counts
   a miss; two misses offer Show me, which counts as one more. A right one is
   said aloud (Azure only, as in Match) and the line shows in full.

   Nothing here writes an attempt: a built sentence is not a card, and level
   two and Review are read off attempts by phrase id. It counts study time
   while a round is open, and a lifetime tally in `awards.build`. */

export const BUILD_ROUND = 6;
const DECOYS = 3;

const ARTICLES = {
  indef: { m: "un", f: "una" },
  def: { m: "el", f: "la" },
  a: { m: "al", f: "a la" },
};

/* One of her words as a frame needs it, read through the library so her edit
   shows. Null for a word that is gone, or no longer starts with el / la — the
   article rule has nothing to work from — or is one of the el-but-feminine
   nouns (el agua), where un / al would be wrong. */
export function nounFor(frame, id) {
  const phrase = library.phraseById(id);
  if (!phrase) return null;
  const words = phrase.text.trim().split(/\s+/);
  const article = words[0]?.toLowerCase();
  const gender = genderOf(phrase);
  if (!["el", "la"].includes(article) || words.length < 2 || !gender) return null;
  if ((article === "el") !== (gender === "m")) return null;
  const english =
    frame.english?.[id] ??
    String(phrase.translation ?? "")
      .replace(/\([^)]*\)/g, " ")
      .split(/[,;]/)[0]
      .replace(/^\s*the\s+/i, "")
      .replace(/\s+/g, " ")
      .trim();
  if (!english) return null;
  return { id, noun: words.slice(1).join(" "), gender, english };
}

const capFirst = (line) => line.replace(/^([¿¡]?)(\p{L})/u, (m, mark, letter) => mark + letter.toUpperCase());

/** A frame and a noun made into one question: its answer tiles, its decoys, its two lines. */
export function makeSentence(frame, word) {
  const articles = ARTICLES[frame.article];
  const article = articles[word.gender];
  const wrong = articles[word.gender === "m" ? "f" : "m"];
  const answer = frame.tiles.flatMap((t) => (t === "{np}" ? [article, word.noun] : [t]));
  const np =
    frame.article === "indef"
      ? `${/^[aeiou]/i.test(word.english) ? "an" : "a"} ${word.english}`
      : `the ${word.english}`;
  const taken = new Set(answer);
  const decoys = [];
  const offer = (text) => {
    if (text && !taken.has(text) && decoys.length < DECOYS) {
      taken.add(text);
      decoys.push(text);
    }
  };
  offer(wrong);
  for (const id of shuffle([...frame.nouns])) {
    const other = id === word.id ? null : nounFor(frame, id);
    if (other && other.noun !== word.noun) {
      offer(other.noun);
      break;
    }
  }
  for (const other of shuffle(FRAMES.filter((f) => f.id !== frame.id))) {
    offer(other.tiles[0]);
    if (decoys.length >= DECOYS) break;
  }
  return {
    frameId: frame.id,
    nounId: word.id,
    answer,
    tiles: shuffle([...answer, ...decoys]).map((text, i) => ({ i, text })),
    es: capFirst(frame.es.replace("{np}", `${article} ${word.noun}`)),
    en: capFirst(frame.en.replace("{np}", np).replace("{noun}", word.english)),
  };
}

/* Six sentences, a different frame each where it can be and never the same
   noun twice, so one word doesn't carry the round. */
function dealRound() {
  const frames = shuffle([...FRAMES]);
  const options = frames.map((frame) => ({
    frame,
    words: shuffle(frame.nouns.map((id) => nounFor(frame, id)).filter(Boolean)),
  }));
  const used = new Set();
  const round = [];
  while (round.length < BUILD_ROUND) {
    let added = false;
    for (const { frame, words } of options) {
      if (round.length >= BUILD_ROUND) break;
      const word = words.find((w) => !used.has(w.id));
      if (!word) continue;
      used.add(word.id);
      round.push(makeSentence(frame, word));
      added = true;
    }
    if (!added) break;
  }
  return shuffle(round);
}

export function startBuild() {
  stopEverything();
  const items = dealRound();
  state.build = {
    items,
    index: 0,
    placed: [],
    tries: 0,
    solved: false,
    shown: false,
    misses: 0,
    startedAt: Date.now(),
    finishedAt: null,
  };
  state.tab = "build";
  render();
}

export function renderBuild() {
  const game = state.build;
  if (!game) {
    state.tab = "learn";
    return render();
  }
  view.innerHTML = `
    <header class="home-head section-head">
      <div class="wordmark">Build</div>
      ${homeLink()}
    </header>
    <p class="muted section-intro">Put the Spanish together. Tap a word to place it, tap it again to take it back — and watch your el and la.</p>
    <div class="match-bar">
      <span><strong id="build-count">${Math.min(game.index + 1, game.items.length)}</strong> of ${game.items.length}</span>
      <span>misses <strong id="build-misses">${game.misses}</strong></span>
      <span>total <strong id="build-total">${awards.build.total}</strong></span>
    </div>
    <div id="build-card"></div>`;
  if (!game.items.length) {
    document.getElementById("build-card").innerHTML = `<div class="card"><p>No sentences to build — the words they need have all been edited or deleted.</p></div>`;
    return;
  }
  paintBuild();
}

/* Everything on the page that changes, repainted on its own — never through
   render(), which would jump the page and cut off the sentence being said. */
function paintBuild() {
  const game = state.build;
  const host = document.getElementById("build-card");
  if (!game || !host) return;
  const count = document.getElementById("build-count");
  const misses = document.getElementById("build-misses");
  if (count) count.textContent = Math.min(game.index + 1, game.items.length);
  if (misses) misses.textContent = game.misses;
  const total = document.getElementById("build-total");
  if (total) total.textContent = awards.build.total;
  if (game.finishedAt) return paintBuildDone(host);

  const item = game.items[game.index];
  const tile = (t, where) =>
    `<button class="build-tile" data-tile="${t.i}" data-where="${where}" lang="es-ES">${esc(t.text)}</button>`;
  const placed = game.placed.map((i) => item.tiles[i]);
  host.innerHTML = `
    <div class="card build-card ${game.solved ? "solved" : ""}">
      <p class="build-prompt">${esc(item.en)}</p>
      <div class="build-line" aria-label="Your sentence">${
        game.solved
          ? `<span class="build-said" lang="es-ES">${esc(item.es)}</span>`
          : placed.map((t) => tile(t, "line")).join("") || `<span class="build-empty">Tap the words below</span>`
      }</div>
      ${
        game.solved
          ? `<p class="build-verdict">${game.shown ? "That's how it goes." : game.tries ? "¡Eso es! Got there." : "¡Perfecto!"}</p>
             <div class="btn-row">
               <button class="btn btn-ghost" id="build-listen">Listen</button>
               <button class="btn btn-primary" id="build-next">${game.index + 1 < game.items.length ? "Next" : "Finish"}</button>
             </div>`
          : `<div class="build-tray">${item.tiles
              .map((t) => (game.placed.includes(t.i) ? `<span class="build-tile build-gap" aria-hidden="true">${esc(t.text)}</span>` : tile(t, "tray")))
              .join("")}</div>
             <div class="btn-row">
               ${game.tries >= 2 ? `<button class="btn btn-ghost" id="build-show">Show me</button>` : ""}
               <button class="btn btn-primary" id="build-check" ${game.placed.length ? "" : "disabled"}>Check</button>
             </div>`
      }
    </div>`;

  const card = host.firstElementChild;
  card.addEventListener("click", (event) => {
    const button = event.target.closest("button.build-tile");
    if (!button || game.solved) return;
    const i = Number(button.dataset.tile);
    if (button.dataset.where === "tray") game.placed.push(i);
    else game.placed = game.placed.filter((x) => x !== i);
    paintBuild();
  });
  document.getElementById("build-check")?.addEventListener("click", checkBuild);
  document.getElementById("build-show")?.addEventListener("click", showBuild);
  document.getElementById("build-next")?.addEventListener("click", nextBuild);
  const listen = document.getElementById("build-listen");
  listen?.addEventListener("click", () => sayAloud(listen, item.es));
  return card;
}

function checkBuild() {
  const game = state.build;
  const item = game.items[game.index];
  const placed = game.placed.map((i) => item.tiles[i].text);
  if (normaliseSentence(placed.join(" ")) === normaliseSentence(item.answer.join(" "))) {
    solve();
    return;
  }
  game.misses += 1;
  game.tries += 1;
  paintBuild();
  /* Shake the tiles that are not where they belong; a placed tile in the
     right slot stays still, so she can see how far she got. */
  document.querySelectorAll('.build-line .build-tile').forEach((el, slot) => {
    if (placed[slot] === item.answer[slot]) return;
    el.classList.add("miss");
    setTimeout(() => el.classList.remove("miss"), 500);
  });
}

function showBuild() {
  const game = state.build;
  const item = game.items[game.index];
  game.misses += 1;
  game.shown = true;
  const free = [...item.tiles];
  game.placed = item.answer.map((text) => {
    const at = free.findIndex((t) => t && t.text === text);
    const t = free[at];
    free[at] = null;
    return t.i;
  });
  solve();
}

function solve() {
  const game = state.build;
  game.solved = true;
  if (!game.shown) awards.recordBuilt();
  const card = paintBuild();
  /* Said as it lands, like a matched pair — Azure only, because the browser
     voice on iOS fails silently and its toast would fire on every sentence.
     Listen beside it goes through sayAloud whatever the voice. */
  const listen = document.getElementById("build-listen");
  if (settings.hasAzure && listen) sayAloud(listen, game.items[game.index].es, "");
  card?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  checkAwards();
}

function nextBuild() {
  const game = state.build;
  if (game.index + 1 >= game.items.length) {
    game.finishedAt = Date.now();
    awards.recordBuildRound({ misses: game.misses });
    paintBuild();
    checkAwards();
    return;
  }
  stopEverything();
  Object.assign(game, { index: game.index + 1, placed: [], tries: 0, solved: false, shown: false });
  paintBuild();
}

function paintBuildDone(host) {
  const game = state.build;
  const seconds = Math.round((game.finishedAt - game.startedAt) / 1000);
  const n = game.items.length;
  const total = awards.build.total;
  host.innerHTML = `
    <div class="card match-result">
      <h2>${game.misses ? `Done — ${game.misses} miss${game.misses === 1 ? "" : "es"}.` : `Perfect! ${n} of ${n}, no misses.`}</h2>
      <p class="muted" style="margin:6px 0 12px">${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}. ${total} sentence${total === 1 ? "" : "s"} built all told.</p>
      <div class="btn-row">
        <button class="btn btn-primary" id="build-again">Another round</button>
      </div>
    </div>`;
  document.getElementById("build-again").onclick = startBuild;
}
