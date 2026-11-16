# Prizes and Match

Moved word for word out of `CLAUDE.md` at v62, when `app.js` was split into
modules. It is the history and the reasoning as written at the time: where it
says "in app.js" it now means one of the modules listed in `CLAUDE.md`. Add
new reasoning at the end.

---

## Prizes: three challenges, read off what she did

Asked for in these words: Deb is competitive and wants rewarding for beating a
challenge, even against herself. The answers she gave to the four questions
that mattered are the constants at the top of the `awards` section of
store.js, and nothing about them is hidden in app.js.

- **Ten minutes of study makes a day count** (`DAY_DONE_SECONDS`). Her own
  number, not a lesson: a lesson is about five, so a day is two, or one and
  the review. The clock is in app.js — `studyTick` adds five seconds while a
  drill of any kind or a round of Match is on screen, the tab is visible and
  she has touched the phone inside the last ninety seconds. The idle guard is
  the whole reason a lesson left open on the table does not win the week.
  Browsing Phrases, the interview and the Add page are not study.
- **Calendar week and calendar month, not rolling windows.** Monday to Sunday
  (`WEEK_STARTS`, the one place that is decided), 1st to last. Six days wins
  the week (`WEEK_NEEDS`); a month with no more than four days off wins the
  month (`MONTH_MISSES`, so 27 of 31 and 26 of 30). A target she can see
  coming, one shot per period. **The next rung is mine to have picked: three
  winning months in a row is a prize of its own** (`SEASON_MONTHS`), awarded on
  every third month of a run.
- **Pronunciation Pro reads Azure's blend, not the weakest word.** Her choice,
  made knowing the dial shows the harder number. `attempt.overall` ≥ 70, 80,
  90, 100 on one attempt, each medal once. The page says which number it is,
  because the two sit beside each other on the score card.
- **Match counts pairs over all time**, any card in the app, medals at 50,
  100, 250 and 500 (`MATCH_TIERS`). Rounds, clean rounds and the best clean
  time are kept to be beaten and win nothing. Two cards with the same English
  can't share a round. The Spanish is said aloud on a match only with an
  Azure key — the browser-voice toast would otherwise fire on every pair.
  **A matched Spanish card is a Listen button from then on** (asked for by
  Deb the day it shipped): it goes through `sayAloud` on any voice, since a
  tap is an explicit ask, and wears a speaker; the English half is inert.
- **Whether a prize is won is computed; only *when* is stored.** `study` is
  the one thing written as it happens; weeks, months and seasons are read
  off it the way `reviewOf` reads the attempts, and the pronunciation tiers
  are read off the attempts themselves. `earned` exists so a prize is
  celebrated once and the cabinet can date it. `awards.pending()` is the one
  reader; `checkAwards()` in app.js grants and celebrates whatever it returns.
- **Nothing before `awards.since` counts.** Asked for as *"start all the
  rewards from today"*. The day is written the first time the store loads
  (or a backup without one is restored), `awards.counted()` filters the
  attempts by it, and the Prizes page says the date. An Azure 85 from last month
  lights no medal; a cabinet with prizes in it on day one is not a challenge.
  Anything won while the app was closed — the week turning over at midnight
  — is still granted silently at boot rather than thrown as a fanfare.
- **The celebration is an overlay, never a render.** A medal won mid-lesson
  must leave the attempt on the screen; `showNextPrize` appends to `body` and
  queues the rare double. *See all your prizes* is left off it while a drill
  is on screen, because that tap would quit the lesson.
- **The flame is a different count and deliberately still is.** It counts
  finished lessons, as it always has; the challenge counts minutes. The Prizes page
  says so in one line rather than making the two agree, which would have
  meant either changing what the flame has meant since the first version or
  counting a five-minute lesson as a ten-minute day. Tapping the flame now
  opens Prizes instead of toasting one line.
- **The titles are English, by request.** The first cut said Premios, Racha,
  Vitrina and ¡Semana ganada!, on the app's habit of Spanish names; asked
  what they meant, Fin chose English. The ¡Olé! on the button stays, as it
  does on the Add and Sobre mí toasts.
- **Two surfaces, like Review.** The `.week-strip` under the parrot on the
  home page — seven dots, the thing on that page that changes every day —
  and the Match tile, in The Past's old square. Everything else is on
  the Prizes page: the week, the month, the three-in-a-row run, the two medal
  grids and the *Trophy cabinet*, every prize with its date. Settings describes it
  and links to it; there is no switch to turn it off.

Worth asserting: eight tiles, one of them `[data-open-match]` and none
`[data-section="past"]`, `pasado-1` on the Practice path, seven dots and
`since` set to today on a clean boot, no overlay; attempts from September
seeded beside one from this morning grant only what today's score clears; five
done days plus 595 s today, then one tick inside a drill, paints
`#prize-overlay` reading *Week won!* with no `#prize-all` and the
`.drill-text` still underneath; 200 s with no input adds at most 95 s;
three 27-day months seeded grant `month-2026-10` and `season-2026-10` with no
overlay; a stubbed 93 celebrates 70, 80 and 90 in turn with the score card
still on screen; a round of Match with `total: 49` planted celebrates
*Matched!* on the first pair, reports its miss, and a clean second round
counts as `perfect`; export carries `awards`. The smoke script is in the
session scratchpad, like the others.
