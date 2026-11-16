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
