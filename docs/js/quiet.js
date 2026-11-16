// Quiet mode: the box you type the answer into and how a typed answer is marked.

import { COURSE_LANGUAGE } from "./content.js";
import { RECALL_AFTER } from "./store.js";
import { esc, state } from "./core.js";

/* ------------------------------------------------- marking a typed answer

   Quiet mode has no audio to send anywhere, so nothing Azure says applies and
   there is no score to give. What there is instead is the text she typed and
   the text she meant, and the useful thing to say about them is *which word*
   went wrong — the same claim `attemptScore` makes about a spoken go, one
   medium over: a reader doesn't average you either.

   Four verdicts rather than two, and the middle ones are the point. Accents
   are a long-press on an iOS keyboard, and marking `esta` wrong for missing
   the accent on `está` would make the mode too annoying to use — but silently
   accepting it would teach the wrong spelling. So it is right, and it is told
   which words lost their accents. `ñ` is folded the same way, since it is the
   same long-press: `ano` for `año` is marked and forgiven, not struck out.

   `normaliseSentence` can't be the first pass here, because it folds accents
   itself — it exists to say "Vivo en Madrid." and "vivo en madrid" are one
   card. `typedWords` keeps the accents in `norm` and folds them in `bare`, so
   the two can be told apart. */

function typedWords(value) {
  return String(value ?? "")
    .split(/\s+/)
    /* `clean` is the word as written with the punctuation round it taken off —
       what to print when naming one of theirs, since "¿cuántos?" with the
       question marks is not the word. */
    .map((raw) => ({
      raw,
      clean: raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""),
      norm: raw.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ""),
    }))
    .filter((word) => word.norm)
    .map((word) => ({ ...word, bare: foldAccents(word.norm) }));
}

function foldAccents(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* A slip of one letter is a slip, not a different word. `cuchilo` for
   `cuchillo` struck through as wrong *and* listed as left out is two marks
   for one letter, which is harsher than a teacher would be. So a word within
   a letter of the one meant is *close*: it pairs with its word, so nothing is
   "left out", and it is shown beside the spelling it should have had.

   Optimal string alignment distance — insert, delete, substitute, or swap two
   neighbours, since `muisc` is a typo and not a different word either. One
   edit is allowed from four letters, two from eight; nothing shorter, because
   `a` is one edit from `e` and both are words. Measured on the accent-folded
   forms, so an accent lost on the same word isn't charged twice. */
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

function closeEnough(a, b) {
  const longest = Math.max(a.length, b.length);
  if (longest < 4) return false;
  return editDistance(a, b) <= (longest >= 8 ? 2 : 1);
}

/* Which of her words landed, and which of theirs never turned up. Straight
   longest-common-subsequence over the accent-folded words: comparing position
   by position would mark every word after a missed one as wrong, which is the
   opposite of naming the one she got wrong. Phrases are a handful of words, so
   the quadratic table costs nothing.

   Weighted, so that an exact word is worth two and a close one is worth one:
   the alignment then never pairs a near miss where an exact match was there to
   be had, and a close word only ever stands in for the word it is nearest to. */
function alignWords(mine, theirs) {
  const worth = (a, b) => (a.bare === b.bare ? 2 : closeEnough(a.bare, b.bare) ? 1 : 0);
  const table = Array.from({ length: mine.length + 1 }, () => new Array(theirs.length + 1).fill(0));
  for (let i = mine.length - 1; i >= 0; i--) {
    for (let j = theirs.length - 1; j >= 0; j--) {
      const pair = worth(mine[i], theirs[j]);
      table[i][j] = Math.max(
        table[i + 1][j],
        table[i][j + 1],
        pair ? table[i + 1][j + 1] + pair : 0
      );
    }
  }
  const marks = mine.map(() => "miss");
  const meant = mine.map(() => null);
  const landed = theirs.map(() => false);
  let i = 0;
  let j = 0;
  while (i < mine.length && j < theirs.length) {
    const pair = worth(mine[i], theirs[j]);
    if (pair && table[i][j] === table[i + 1][j + 1] + pair) {
      marks[i] = pair === 2 ? (mine[i].norm === theirs[j].norm ? "ok" : "accent") : "close";
      if (pair === 1) meant[i] = theirs[j].clean;
      landed[j] = true;
      i++;
      j++;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  return { marks, meant, missing: theirs.filter((_, at) => !landed[at]).map((word) => word.clean) };
}

/* The whole of what a typed go produces, and it is deliberately not persisted
   anywhere: no attempt record, no tally, nothing in export/import.

   `library.goodAttempts` counts an *unscored* attempt as a good one — that is
   the no-Azure path, and it is right there — so a typed go filed as an attempt
   would push a card to level two after four quiet sessions in which she had
   never once said it out loud, and would land in `bestScore`, the history and
   the review schedule besides. Credit in this app means having said it well.
   Same call the dot-or-line gate makes about a wrong shape, for the same
   reason: a memory of what she gets wrong is a decay rule wanting to be
   designed, not a counter bolted on here. */
export function checkTyped(typed, phrase) {
  const mine = typedWords(typed);
  const theirs = typedWords(phrase.text);
  const { marks, meant, missing } = alignWords(mine, theirs);
  /* Four verdicts, worst mark wins. A word that is simply not there, or a word
     of hers that matches nothing, is wrong; a slip of a letter is close; an
     accent is a keyboard problem; and the rest is right. */
  const verdict =
    missing.length || marks.includes("miss")
      ? "wrong"
      : marks.includes("close")
      ? "close"
      : marks.includes("accent")
      ? "accents"
      : "right";
  return {
    verdict,
    words: mine.map((word, at) => ({ raw: word.raw, clean: word.clean, mark: marks[at], meant: meant[at] })),
    missing,
  };
}

/* The box, and the two ways out of it. Ported from Xerra.

   `autocorrect` and `spellcheck` are off deliberately and are not decoration:
   iOS will happily correct her Spanish for her, and a mode that marks her on
   what the keyboard knows is worse than no mode at all. `lang` is the course
   locale, so the keyboard and its dictation key are in the right language.

   The Show me link only appears at level one. Level two already has its own
   full-width Show me above — the one that plays the audio with it — and two
   ways to give up on one screen is one too many. */
export function typeBox(phrase, asking) {
  return `
    <div class="quiet-answer">
      <label class="field">
        <span>Your answer</span>
        <textarea id="quiet-input" rows="1" lang="${esc(phrase.language ?? COURSE_LANGUAGE)}"
                  autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false"></textarea>
      </label>
      <button class="btn btn-primary" id="quiet-check" style="width:100%">Check</button>
      ${
        asking
          ? ""
          : `<p class="center" style="margin:12px 0 0"><button class="link" id="quiet-show">Show me</button></p>`
      }
    </div>`;
}

/* What she wrote, marked. The phrase itself is on the card directly above by
   the time this renders, so this half prints her answer rather than
   reprinting theirs — the eye does the comparing, and the marks say where to
   look.

   No dial and no percentage. There is no audio here, so there is nothing
   Azure could have scored, and a number invented on the spot would sit next
   to real ones in the same app and read as though it meant the same thing. */
export function typedVerdict() {
  const answer = state.typed;
  if (!answer) return "";
  /* After Show me there is no verdict to print — nothing was marked — but
     there is still a way back into the question. She has just read the
     answer, and writing it from memory now is the one thing that makes
     reading it worth anything. */
  if (answer.shown) return `<p class="center" style="margin:16px 0 0">${againButton("Now write it from memory")}</p>`;
  const slips = answer.words.filter((word) => word.mark === "close");
  const head =
    answer.verdict === "right"
      ? "¡Eso es!"
      : answer.verdict === "accents"
      ? "Right — mind the accents."
      : answer.verdict === "close"
      ? `Nearly — ${slips.length === 1 ? "one letter" : "a letter or two"} off.`
      : "Not quite.";
  return `
    <div class="card quiet-verdict ${answer.verdict}">
      <strong>${head}</strong>
      <p class="typed-back">${answer.words
        .map((word) => `<span class="typed-word ${word.mark}">${esc(word.raw)}</span>`)
        .join(" ")}</p>
      ${
        /* The spelling it should have had, one line per slip. A struck-through
           word says only that it was wrong; a dotted one with its answer
           beside it says what to fix, which is the whole of what a typo needs. */
        slips.length
          ? `<p class="tiny muted typed-fixes">${slips
              .map((word) => `<span class="typed-fix"><s>${esc(word.clean)}</s> ${esc(word.meant)}</span>`)
              .join(" · ")}</p>`
          : ""
      }
      ${
        answer.missing.length
          ? `<p class="tiny muted">Left out: ${esc(answer.missing.join(" · "))}</p>`
          : ""
      }
      <p class="tiny muted">Not scored or kept — the ${RECALL_AFTER} good goes to level 2 are spoken ones.</p>
      ${againButton("Write it again")}
    </div>`;
}

/* The way back into a quiet card's question. Without it the only way to have
   another go at a card just got wrong is Next, and round the whole lesson
   again — which is the moment she least wants to leave it. One id whichever
   wording it wears, so one listener serves both. */
function againButton(label) {
  return `<button class="btn" id="quiet-again" style="width:100%;margin-top:12px">${label}</button>`;
}
