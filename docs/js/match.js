// Match: the pairs game.

import { library, settings, awards, MATCH_TIERS } from "./store.js";
import {
  esc, homeLink, normaliseSentence, sayAloud, shuffle, state, stopEverything, toast, view,
} from "./core.js";
import { render } from "./app.js";
import { MATCH_ROUND, checkAwards } from "./prizes.js";

// ------------------------------------------------------------------- match

/* Six pairs from everything drillable, Spanish down the left and the English
   shuffled down the right. Tap one of each: a pair turns green and is said
   aloud, a miss shakes and is forgotten. A pair never leaves its slot, so the
   columns stay still under her thumb. Two cards with the same English (or the
   same Spanish) can't share a round — that would be a question with two right
   answers. */
export function startMatch() {
  stopEverything();
  const pool = shuffle(library.drillable().filter((p) => p.text.trim() && (p.translation ?? "").trim()));
  const seen = new Set();
  const pairs = [];
  for (const p of pool) {
    const es = `es:${normaliseSentence(p.text)}`;
    const en = `en:${normaliseSentence(p.translation)}`;
    if (seen.has(es) || seen.has(en)) continue;
    seen.add(es);
    seen.add(en);
    pairs.push({ id: p.id, text: p.text, translation: p.translation });
    if (pairs.length === MATCH_ROUND) break;
  }
  if (pairs.length < 2) {
    toast("Not enough cards to play Match yet.");
    return;
  }
  state.match = {
    pairs,
    right: shuffle([...pairs]),
    picked: null,
    matched: new Set(),
    misses: 0,
    startedAt: Date.now(),
    finishedAt: null,
  };
  state.tab = "match";
  render();
}

export function renderMatch() {
  const game = state.match;
  if (!game) {
    state.tab = "learn";
    return render();
  }
  const card = (side, p) =>
    `<button class="match-card ${game.matched.has(p.id) ? "matched" : ""}" data-side="${side}" data-id="${esc(p.id)}"
             lang="${side === "es" ? "es-ES" : "en"}">${esc(side === "es" ? p.text : p.translation)}</button>`;

  view.innerHTML = `
    <header class="home-head section-head">
      <div class="wordmark">Match</div>
      ${homeLink()}
    </header>
    <p class="muted section-intro">Tap a Spanish card, then its English. ${game.pairs.length} pairs a round. Tap a matched Spanish card to hear it again.</p>
    <div class="match-bar">
      <span><strong id="match-count">${game.matched.size}</strong> of ${game.pairs.length}</span>
      <span id="match-clock" class="match-clock">0:00</span>
      <span>total <strong id="match-total">${awards.match.total}</strong></span>
    </div>
    <div class="match-grid">
      <div class="match-col">${game.pairs.map((p) => card("es", p)).join("")}</div>
      <div class="match-col">${game.right.map((p) => card("en", p)).join("")}</div>
    </div>
    <div id="match-done"></div>`;

  view.querySelector(".match-grid").addEventListener("click", (event) => {
    const button = event.target.closest(".match-card");
    if (button) pickMatch(button);
  });

  clearInterval(state.matchTimer);
  state.matchTimer = setInterval(paintMatchClock, 1000);
  paintMatchClock();
  if (game.finishedAt) paintMatchDone();
}

function paintMatchClock() {
  const el = document.getElementById("match-clock");
  const game = state.match;
  if (!el || !game) {
    clearInterval(state.matchTimer);
    state.matchTimer = null;
    return;
  }
  const s = Math.floor(((game.finishedAt ?? Date.now()) - game.startedAt) / 1000);
  el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function pickMatch(button) {
  const game = state.match;
  if (!game) return;
  const { side, id } = button.dataset;
  /* A matched Spanish card says itself again on a tap — asked for by Deb the
     day Match shipped. The English stays inert. An explicit tap goes through
     `sayAloud` whatever the voice is, like every Listen button, so a browser
     voice that fails says so rather than nothing. */
  if (button.classList.contains("matched")) {
    if (side === "es") sayAloud(button, game.pairs.find((p) => p.id === id)?.text ?? button.textContent);
    return;
  }
  if (game.finishedAt) return;
  const picked = game.picked;

  // Same side: a second tap on the same card unpicks it, any other switches.
  if (!picked || picked.side === side) {
    picked?.button.classList.remove("picked");
    if (picked && picked.id === id && picked.side === side) {
      game.picked = null;
      return;
    }
    button.classList.add("picked");
    game.picked = { side, id, button };
    return;
  }

  picked.button.classList.remove("picked");
  game.picked = null;
  if (picked.id === id) {
    const esButton = side === "es" ? button : picked.button;
    for (const b of [picked.button, button]) b.classList.add("matched");
    game.matched.add(id);
    awards.recordPair();
    const count = document.getElementById("match-count");
    const total = document.getElementById("match-total");
    if (count) count.textContent = game.matched.size;
    if (total) total.textContent = awards.match.total;
    /* Hear it as it lands — the pair is a card, and a card is for saying.
       Only with Azure: the browser voice on iOS fails silently and the toast
       that names that failure would fire on every pair. */
    if (settings.hasAzure) sayAloud(esButton, esButton.textContent, "");
    esButton.setAttribute("aria-label", `${esButton.textContent} — tap to hear it again`);
    if (game.matched.size === game.pairs.length) finishMatch();
    else checkAwards();
  } else {
    game.misses += 1;
    for (const b of [picked.button, button]) {
      b.classList.remove("miss");
      void b.offsetWidth; // restart the shake
      b.classList.add("miss");
      setTimeout(() => b.classList.remove("miss"), 500);
    }
  }
}

function finishMatch() {
  const game = state.match;
  game.finishedAt = Date.now();
  const seconds = Math.round((game.finishedAt - game.startedAt) / 1000);
  awards.recordRound({ misses: game.misses, seconds });
  clearInterval(state.matchTimer);
  state.matchTimer = null;
  paintMatchClock();
  paintMatchDone();
  checkAwards();
}

function paintMatchDone() {
  const game = state.match;
  const host = document.getElementById("match-done");
  if (!game?.finishedAt || !host) return;
  const seconds = Math.round((game.finishedAt - game.startedAt) / 1000);
  const clean = game.misses === 0;
  const best = awards.match.bestTime;
  const total = awards.match.total;
  const next = MATCH_TIERS.find((tier) => tier > total);
  host.innerHTML = `
    <div class="card match-result">
      <h2>${
        clean
          ? `Perfect! ${game.pairs.length} of ${game.pairs.length}, no misses.`
          : `Done — ${game.misses} miss${game.misses === 1 ? "" : "es"}.`
      }</h2>
      <p class="muted" style="margin:6px 0 12px">${seconds}s${
        clean && best === seconds ? " — your best clean round" : best != null ? ` · best clean round ${best}s` : ""
      }. ${total} pair${total === 1 ? "" : "s"} matched all told${next ? `, ${next - total} to the next medal` : ""}.</p>
      <div class="btn-row">
        <button class="btn btn-primary" id="match-again">Another round</button>
        <button class="btn btn-ghost" data-open-prizes>Prizes</button>
      </div>
    </div>`;
  document.getElementById("match-again").onclick = startMatch;
  host.scrollIntoView({ behavior: "smooth", block: "end" });
}
