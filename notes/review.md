# Review

Moved word for word out of `CLAUDE.md` at v62, when `app.js` was split into
modules. It is the history and the reasoning as written at the time: where it
says "in app.js" it now means one of the modules listed in `CLAUDE.md`. Add
new reasoning at the end.

---

## Review: spaced repetition, read off the attempts

Ported from Xerra, asked for as *"add the review feature. Maybe just 10 or 15
a day rather than 20"*. Retrieval practice was in (level two) and scheduling
was not: nothing ever brought a card back except Repaso's random seven.

- **`library.reviewOf(id)` is the whole rule, and nothing is stored.** The
  interval doubles with every *day* a card has been said well and resets to
  one day the moment it isn't — `REVIEW_DAYS` is 1, 2, 4, 8, 16, 32, 64 —
  read off the attempt history like `recallReady` is. Days rather than goes,
  because four good goes in one sitting are one act of remembering. A card
  never attempted has no review: it is new, and the path is where new cards
  are met. Skipping a card (Next, no recording) records no attempt, so a
  listen-only pass schedules nothing; a typed go in quiet mode is not an
  attempt either. **Nothing demotes.**
- **`REVIEW_CAP` is ten**, not Xerra's twenty. A lesson here is five cards
  and Repaso is seven — one coffee — so ten is the same size of sitting.
  `reviewToday()` in app.js is the one reader — the session (`min(due,
  cap)`) and the rest — for the strip, the node and the queue, so the three
  can never disagree about what Start starts. The backlog is said as the
  quieter clause (*10 cards to review today · 5 more waiting*), never hidden.
- **`startReview()` is `startPractice` with the due cards, most overdue
  first, and a title.** So it is a practice queue like Repaso's: no lesson
  ticks, no streak, *¡Repaso completado!* at the end. `startPractice` took a
  `{ title }` option for it; nothing else reads the title yet.
- **Two surfaces.** The Review tile on the home page — it was a `.due-strip`
  under the parrot until it was asked down into the grid, see *Home is eight
  tiles* — and a Review node first in Mézclalo behind Practice, which is still
  absent when nothing is due. The tile is always there and says *Nothing due
  today* instead; a tap then only toasts. Teal, kept from the strip; it is
  quiet mode's colour in the lesson, and the two never share a screen.
- **Settings only describes it.** There is no switch: a review you can turn
  off is a review you forget you turned off, and with nothing due it costs
  nothing to be on.

Worth asserting: a tile reading *Nothing due today* and no node with no
attempts, and the tile's tap toasting; a good attempt three days old, a good
one today and a failed one yesterday give a tile reading *2 cards to review
today* and a node reading *Review · 2 today*, the tile and the node both
start a queue with the three-day-old card first, and
finishing it ticks no lesson; fifteen due read *10 cards to review today · 5
more waiting* and drill ten; one due reads *1 card*.

## Three ways to be asked, a miss steps back, the session shuffled (v66)

Ported from Xerra's v131 and v133, where Review was reported as *"too
repetitive … I get bored and so avoid doing the reviews"*. Deb's Review was
the same machinery, so it would hit the same wall.

- **`reviewTask` in drill.js asks each due card one of up to three ways**,
  at random, leaving out the way the previous card was asked: as its level
  has it; **by ear** (`"echo"` — no Spanish and no English, Listen and Slow
  stay, *Show the words* is one tap away); or **from a reply** (`"answer"` —
  one of the card's *What might they say back?* lines is the question, with
  *Hint: what you meant, in English*). The answer way needs replies on the
  card and level two switched on; nothing is fetched to make one possible.
- **Every way ends in a spoken attempt filed as before** — `"listen"` for an
  echo, `"recall"` / `"recall-shown"` for an answer — so level two, the
  prizes and `reviewOf` read the same history. Nothing is persisted.
  `state.levelTwo` keeps what the card had earned so `announceLevelUp` does
  not toast *¡Nivel 2!* on a level-two card asked by ear.
- **Only in Review**: `startReview` passes `{ review: true }` to
  `startPractice`, which puts it on `state.lesson`. Not in quiet mode, and
  switching quiet mode mid-card takes the task off (`dropTask`). Deb-o has no
  road mode, so that half of Xerra's guard is gone.
- **`reviewOf` reads the history a day at a time.** A good day climbs a rung;
  a day with any miss steps back two (`REVIEW_STEP_BACK`) — sixteen days to
  four, not to one; a card missed on three days running (`REVIEW_REST_AFTER`)
  rests a week (`REVIEW_REST_DAYS`). A card never missed is scheduled exactly
  as before. Still nothing demotes: this decides when a card comes round,
  never its level. No migration.
- **The session is shuffled**: the ten most overdue are still the ones
  chosen, then `startReview` shuffles them. The *Worth asserting* above about
  the three-day-old card coming first no longer holds.

Asserted in `tools/checks/review.js`: the ladder from planted histories, six
sessions over twelve due cards, and the three ways with `Math.random`
steered (two 0.99s leave the shuffle as it was).
