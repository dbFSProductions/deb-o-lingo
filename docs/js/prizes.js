// Prizes: the study clock, what has been won, the celebration overlay and the Prizes page.

import {
  library, progress, awards, localDay, monthPlus, DAY_DONE_SECONDS, WEEK_NEEDS, MONTH_MISSES,
  SEASON_MONTHS, WEEK_STARTS, PRO_TIERS, MATCH_TIERS,
} from "./store.js";
import { esc, homeLink, state, stopEverything, toast, view } from "./core.js";
import { render } from "./app.js";

// ------------------------------------------------------------------ prizes
//
/* Challenges, and the prizes for winning them. Asked for in these words: Deb
   is competitive and wants rewarding for beating a challenge, even one against
   herself. Three of them, and the rules all live in store.js (`awards`):

   - The streak challenge. Ten minutes of study makes a day count; six days
     wins the week; a month with no more than four days off wins the month;
     three winning months in a row is the rung above that.
   - Pronunciation Pro. Azure's own blended score — the small "Azure" number
     beside the dial, not the weakest word the dial shows — over 70, 80, 90
     and 100, one attempt, each medal won once.
   - Match. English to Spanish, six pairs a round, any card in the app, and
     medals for the number of pairs matched over all time. It has The Past's
     square on the home screen.

   Nothing before `awards.since` counts: the ask was to start from today, so
   an attempt scored before the feature arrived lights no medal.

   What is here is the clock, the celebration and the two pages. The clock
   ticks study seconds while a drill or a round of Match is on screen, the tab
   is visible and she has touched the phone inside the last minute and a
   half — so a lesson left open on the table does not win the week. A prize is
   celebrated the moment it is won, on whatever screen that happens to be, as
   an overlay rather than a render: a render mid-drill would take the attempt
   she is looking at off the screen. */

const STUDY_TICK_MS = 5000;
const IDLE_AFTER_MS = 90 * 1000;
export const MATCH_ROUND = 6;

let lastTouch = Date.now();
for (const type of ["pointerdown", "keydown", "touchstart"]) {
  document.addEventListener(type, () => { lastTouch = Date.now(); }, { passive: true, capture: true });
}

/** Is what is on screen study? Any drill — lesson, Review, Repaso, quiet
    mode — a round of Match that is still going, or a story whose questions
    are still being answered. */
function studying() {
  if (state.tab === "learn" && state.stage === "drill") return true;
  if (state.tab === "match") return Boolean(state.match) && !state.match.finishedAt;
  return state.tab === "stories" && Boolean(state.story) && !state.story.finishedAt;
}

function studyTick() {
  if (document.visibilityState !== "visible") return;
  if (Date.now() - lastTouch > IDLE_AFTER_MS) return;
  if (!studying()) return;
  const today = localDay();
  const before = awards.dayDone(today);
  awards.addStudy(STUDY_TICK_MS / 1000, today);
  if (!before && awards.dayDone(today)) toast("Ten minutes — today counts towards the week.", 3200);
  checkAwards();
}
setInterval(studyTick, STUDY_TICK_MS);

/* Anything newly won: write it down, then celebrate it unless told not to.
   The queue is for the rare double — a month and a three-in-a-row on the same
   tick — so the second waits for the first's ¡Olé! rather than painting over
   it. */
const prizeQueue = [];

export function checkAwards({ silent = false } = {}) {
  const fresh = awards.pending(library.attempts);
  for (const { id, at } of fresh) {
    if (!awards.grant(id, at)) continue;
    if (!silent) prizeQueue.push(id);
  }
  if (prizeQueue.length && !document.getElementById("prize-overlay")) showNextPrize();
  return fresh.length;
}

export function openPrizes() {
  stopEverything();
  state.tab = "prizes";
  render();
}

const MEDAL_TINTS = { bronze: "#cd7f32", silver: "#9aa5ad", gold: "var(--gold)", diamond: "var(--teal)" };
const TIER_METALS = ["bronze", "silver", "gold", "diamond"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function medalSVG(tint, label, size = 64) {
  const long = String(label).length > 2;
  return `<svg class="medal-svg" width="${size}" height="${Math.round(size * 1.2)}" viewBox="0 0 100 120" aria-hidden="true">
    <path d="M28 0h20l12 44-16 10z" fill="var(--red)"/>
    <path d="M72 0H52L40 44l16 10z" fill="var(--blue)"/>
    <circle cx="50" cy="78" r="36" fill="${tint}"/>
    <circle cx="50" cy="78" r="28" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="3"/>
    <text x="50" y="${long ? 85 : 88}" text-anchor="middle" font-size="${long ? 20 : 28}" font-weight="900"
          fill="#fff" stroke="rgba(0,0,0,0.3)" stroke-width="3" paint-order="stroke">${esc(label)}</text>
  </svg>`;
}

function monthName(key) {
  const [y, m] = key.split("-").map(Number);
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

function dayLabel(day) {
  const [, m, d] = day.split("-").map(Number);
  return `${d} ${MONTH_NAMES[m - 1].slice(0, 3)}`;
}

function dateLabel(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

/** What a prize id means on screen: its title, one line, and its medal.
    English titles, asked for — the first cut had Racha, Vitrina and
    ¡Semana ganada!, which read as more things to learn on a prize screen. */
function prizeInfo(id) {
  let m;
  if ((m = id.match(/^pro-(\d+)$/))) {
    const tier = Number(m[1]);
    const metal = TIER_METALS[PRO_TIERS.indexOf(tier)] ?? "gold";
    return {
      group: "pro",
      title: tier === 100 ? "Perfect 100!" : "Pronunciation Pro!",
      line: tier === 100 ? "Azure gave you a perfect 100." : `Azure scored you ${tier} or better.`,
      medal: (size) => medalSVG(MEDAL_TINTS[metal], String(tier), size),
    };
  }
  if ((m = id.match(/^match-(\d+)$/))) {
    const tier = Number(m[1]);
    const metal = TIER_METALS[MATCH_TIERS.indexOf(tier)] ?? "gold";
    return {
      group: "match",
      title: "Matched!",
      line: `${tier} pairs matched.`,
      medal: (size) => medalSVG(MEDAL_TINTS[metal], String(tier), size),
    };
  }
  if ((m = id.match(/^week-(\d{4}-\d{2}-\d{2})$/))) {
    return {
      group: "streak",
      title: "Week won!",
      line: `${WEEK_NEEDS} days of study in the week of ${dayLabel(m[1])}.`,
      medal: (size) => medalSVG("var(--orange)", `${WEEK_NEEDS}/7`, size),
    };
  }
  if ((m = id.match(/^month-(\d{4}-\d{2})$/))) {
    return {
      group: "streak",
      title: "Month won!",
      line: `${monthName(m[1])}, with no more than ${MONTH_MISSES} days off.`,
      medal: (size) => medalSVG("var(--gold)", "MES", size),
    };
  }
  if ((m = id.match(/^season-(\d{4}-\d{2})$/))) {
    return {
      group: "streak",
      title: "Three months running!",
      line: `${SEASON_MONTHS} winning months in a row, ending ${monthName(m[1])}.`,
      medal: (size) => medalSVG("var(--purple)", `×${SEASON_MONTHS}`, size),
    };
  }
  return { group: "other", title: "Prize", line: id, medal: (size) => medalSVG("var(--text-3)", "?", size) };
}

export function confettiHTML() {
  const colors = ["var(--green)", "var(--blue)", "var(--gold)", "var(--orange)", "var(--purple)"];
  const bits = Array.from({ length: 36 }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 0.9;
    const duration = 2 + Math.random() * 1.6;
    const size = 6 + Math.random() * 7;
    return `<span class="confetto" style="left:${left}%;width:${size}px;height:${size * 0.5}px;background:${colors[i % colors.length]};animation-delay:${delay}s;animation-duration:${duration}s"></span>`;
  }).join("");
  return `<div class="confetti">${bits}</div>`;
}

/* The celebration: an overlay on whatever is underneath, so a medal won
   mid-lesson leaves the lesson exactly as it was. "See all your prizes" is
   kept off it while a drill is on screen, because that would quit the lesson
   on one tap. */
function showNextPrize() {
  const id = prizeQueue.shift();
  if (!id) return;
  const info = prizeInfo(id);
  const overlay = document.createElement("div");
  overlay.className = "prize-overlay";
  overlay.id = "prize-overlay";
  overlay.innerHTML = `
    ${confettiHTML()}
    <div class="prize-card" role="dialog" aria-modal="true" aria-labelledby="prize-title">
      <div class="prize-medal">${info.medal(120)}</div>
      <div class="prize-kicker">New prize</div>
      <h1 class="prize-title" id="prize-title">${esc(info.title)}</h1>
      <p class="prize-line">${esc(info.line)}</p>
      <button class="btn btn-primary btn-big" id="prize-continue">¡Olé!</button>
      ${studying() ? "" : `<button class="link prize-all" id="prize-all">See all your prizes</button>`}
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector("#prize-continue").onclick = () => {
    overlay.remove();
    if (prizeQueue.length) showNextPrize();
  };
  overlay.querySelector("#prize-all")?.addEventListener("click", () => {
    prizeQueue.length = 0;
    overlay.remove();
    openPrizes();
  });
}

/** Seven dots, Monday to Sunday: done, today, missed or still to come. */
export function weekDots(week, { labels = false } = {}) {
  const names = ["S", "M", "T", "W", "T", "F", "S"];
  return `<span class="week-dots ${labels ? "labelled" : ""}">${week.days
    .map((d, i) => {
      const kind = d.done ? "done" : d.today ? "today" : d.future ? "future" : "missed";
      return `<span class="day-dot ${kind}" title="${d.day}">${labels ? names[(WEEK_STARTS + i) % 7] : ""}</span>`;
    })
    .join("")}</span>`;
}

function minutesOf(seconds) {
  return Math.floor(seconds / 60);
}

export function renderPrizes() {
  const today = localDay();
  const week = awards.weekOf(today);
  const month = awards.monthOf(today);
  const todaySeconds = awards.secondsOn(today);
  const todayDone = awards.dayDone(today);
  const minutesLeft = Math.ceil((DAY_DONE_SECONDS - todaySeconds) / 60);
  /* Winning months in a row, counting this one if it is already won and the
     ones before it otherwise — what the three-in-a-row is being built out of. */
  const run = month.won ? awards.seasonRun(month.key) : awards.seasonRun(monthPlus(month.key, -1));
  const pro = awards.proSummary(library.attempts);
  const flame = progress.currentStreak();
  const earned = Object.entries(awards.earned).sort((a, b) => new Date(b[1]) - new Date(a[1]));
  const match = awards.match;
  const nextMatch = MATCH_TIERS.find((tier) => tier > match.total);
  const monthOut = !month.won && month.done + month.left + 1 < month.needs;

  const medalCell = (id, label, sub) => {
    const when = awards.earned[id];
    const info = prizeInfo(id);
    return `
      <div class="medal ${when ? "won" : "locked"}">
        ${info.medal(56)}
        <div class="medal-label">${esc(String(label))}</div>
        <div class="medal-sub">${when ? esc(dateLabel(when)) : esc(sub)}</div>
      </div>`;
  };

  view.innerHTML = `
    <header class="home-head section-head">
      <div class="wordmark">Prizes</div>
      ${homeLink()}
    </header>
    <p class="muted section-intro">Challenges you set yourself: beat the week, beat the month, beat your own best.
      Counting from ${esc(dateLabel(`${awards.since}T12:00:00`))}.</p>

    <div class="list-banner" style="--hue:var(--orange);--hue-dark:var(--orange-dark)">
      <span class="list-banner-name">The streak challenge</span>
      <span class="list-banner-count">${week.done} of 7 days</span>
    </div>
    <div class="card striped" style="--hue:var(--orange)">
      ${weekDots(week, { labels: true })}
      <p class="prize-stat"><strong>Today</strong> ${minutesOf(todaySeconds)} min${
        todayDone ? " — counts ✓" : ` — ${minutesLeft} more to make it count`
      }</p>
      <p class="prize-stat"><strong>This week</strong> ${
        week.won ? "won ✓" : `${week.done} of ${WEEK_NEEDS} days · ${WEEK_NEEDS - week.done} to go`
      }</p>
      <p class="prize-stat"><strong>${esc(monthName(month.key))}</strong> ${
        month.won
          ? "won ✓"
          : monthOut
          ? `${month.done} days — out of reach this month; next month starts fresh`
          : `${month.done} of ${month.needs} days · ${month.left} day${month.left === 1 ? "" : "s"} left`
      }</p>
      <p class="prize-stat"><strong>Three in a row</strong> ${run} winning month${run === 1 ? "" : "s"} in a row · ${SEASON_MONTHS} wins it</p>
      <p class="tiny muted" style="margin:10px 0 0">A day counts after ten minutes in a lesson, a review, Repaso, Match or a story.
        The flame on the home page is a different count — finished lessons, ${flame} day${flame === 1 ? "" : "s"} in a row right now.</p>
    </div>

    <div class="list-banner" style="--hue:var(--blue);--hue-dark:var(--blue-dark)">
      <span class="list-banner-name">Pronunciation Pro</span>
      <span class="list-banner-count">${pro.best != null ? `best ${Math.round(pro.best)}` : "no score yet"}</span>
    </div>
    <div class="card striped" style="--hue:var(--blue)">
      <div class="medal-grid">
        ${PRO_TIERS.map((tier) =>
          medalCell(`pro-${tier}`, tier, pro.best != null ? `best ${Math.round(pro.best)}` : "not yet")
        ).join("")}
      </div>
      <p class="prize-stat">${PRO_TIERS.map((tier) => `over ${tier}: <strong>${pro.counts[tier]}</strong>`).join(" · ")}</p>
      <p class="tiny muted" style="margin:10px 0 0">Azure's own blended score for one attempt — the small <em>Azure</em> number beside
        the dial, not the weakest-word score the dial shows. Each medal is won once, the first time you clear it.</p>
    </div>

    <div class="list-banner" style="--hue:var(--gold);--hue-dark:var(--gold-dark);--hue-on:#4b4b4b">
      <span class="list-banner-name">Match</span>
      <span class="list-banner-count">${match.total} pair${match.total === 1 ? "" : "s"}</span>
    </div>
    <div class="card striped" style="--hue:var(--gold)">
      <div class="medal-grid">
        ${MATCH_TIERS.map((tier) => medalCell(`match-${tier}`, tier, `${Math.max(0, tier - match.total)} to go`)).join("")}
      </div>
      <p class="prize-stat">rounds <strong>${match.rounds}</strong> · clean rounds <strong>${match.perfect}</strong>${
        match.bestTime != null ? ` · best clean round <strong>${match.bestTime}s</strong>` : ""
      }${nextMatch ? ` · next medal in <strong>${nextMatch - match.total}</strong>` : ""}</p>
      <button class="btn btn-primary" data-open-match style="width:100%;margin-top:6px">Play a round</button>
    </div>

    <div class="list-banner" style="--hue:var(--gold);--hue-dark:var(--gold-dark);--hue-on:#4b4b4b">
      <span class="list-banner-name">Trophy cabinet — everything you've won</span>
      <span class="list-banner-count">${earned.length}</span>
    </div>
    ${
      earned.length
        ? `<div class="rows rows-spaced">${earned
            .map(([id, at]) => {
              const info = prizeInfo(id);
              return `
              <div class="row striped cabinet-row" style="--hue:var(--gold)">
                ${info.medal(34)}
                <div class="row-main">
                  <div class="row-title">${esc(info.title)}</div>
                  <div class="row-sub">${esc(info.line)}</div>
                </div>
                <div class="tiny muted cabinet-date">${esc(dateLabel(at))}</div>
              </div>`;
            })
            .join("")}</div>`
        : `<div class="empty"><p>Nothing in the cabinet yet. The first week is the easiest one to win.</p></div>`
    }`;
}
