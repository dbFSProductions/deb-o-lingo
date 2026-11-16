# Stories

Moved word for word out of `CLAUDE.md` at v62, when `app.js` was split into
modules. It is the history and the reasoning as written at the time: where it
says "in app.js" it now means one of the modules listed in `CLAUDE.md`. Add
new reasoning at the end.

---

## Stories: a scene, then some questions

Asked for as *"tiny mini stories — three or four sentences that make up a
scene, followed by a few questions that are multiple-choice, as a kind of
comprehension test"*. `STORIES` in content.js, `stories` in store.js, and the
`stories` tab in app.js (`renderStories`, `renderStory`, `openStory`).

- **Hand-written, like everything else in content.js.** Thirty-four scenes from
  Deb's own week — the doorman, the café, the market, tapas, Pilates, rain
  and plants, the lift, the restaurant, the bakery, a parcel that is a plant
  — written out of the course's own vocabulary, easiest first. **The six
  from `historia-11` on are harder on purpose**, asked for as *"make those
  stories a little bit more difficult"* once the ten had been used up: five
  longer sentences rather than four, the past tenses El pasado drills,
  subordinate clauses, and four questions rather than three. The page
  iterates lines and questions, so nothing in app.js knows a story's size.
  They lean on the four Palabras lessons that arrived with them (the till,
  the shelf, the flat and the street, out and about — `palabras-9` to
  `palabras-12`, phrase ids from `palabras-14-1`), asked for as *"more
  everyday words that I would need to use in a store or just in everyday
  life"*. **The ten from `historia-17` on climb**, asked for as *"more
  please — maybe slowly make them progressively harder and longer"*: four
  at six lines and four questions, four at seven lines and five, two at
  eight lines with a twist. **The eight from `historia-27` on** came with
  the five everyday units and are written out of their vocabulary — the
  plants, the flat hunt, Thanksgiving, the lottery, the grapes, the Kings;
  they carry a `tier` each and are spread across the five, so an easy one
  appended at the end still lists under Short. The grammar climbs with them — the conditional,
  *cuando* with the subjunctive, reported speech, *se le rompió*, object
  pronouns doing real work — and the neighbour and the doorman get names,
  Carmen and Manolo, because at that length "la vecina del quinto" four
  times a story is a mouthful. The Worker
  could write these, and deliberately doesn't: a story is where the cards
  are met again in a sentence that isn't the card, and that only works if
  the sentences use the cards. Add a story by appending; never renumber.
- **`STORY_TIERS` is the climb, declared.** Five steps — Short, A bit
  harder, Longer, Longer still, Hard — each with a one-line *sub* saying
  what it adds. A story names its tier in `tier`; the first sixteen predate
  the field, so `tierOf` reads theirs off the id, and a story with no `tier`
  is not an error. The list groups by tier under a `.list-banner` in
  Stories' red (the Phrases shape), with *read of total* on each banner, and
  the story page says its tier beside *Story 17 of 26*. The numbering runs
  on through the groups, because "story 17" is how a story gets referred to.
  Add a tier by adding a row and naming it on the stories — nothing else
  reads the list. **Keep a new story's length honest to its tier's sub**,
  since that line is the promise the banner makes.
- **The question is English and the answers are Spanish.** Deb's choice, of
  three offered. The question is never the obstacle; reading the Spanish is.
  The options are lifted from the story, so the distractors are things that
  were said too. `answer` is an index into `options` as written, and
  **`openStory` shuffles each option set once** (`order`) so the right one
  isn't wherever the file put it.
- **The English is held back until every question is answered**, and a tap
  on any line says it aloud — the help that isn't an answer. *Read it all to
  me* says the joined lines as one utterance through `sayAloud`, so it is
  cached like a phrase and works on the browser voice. Once answered, *Show
  the English* prints each line's English under it; the toggle re-renders,
  which is safe here because nothing on the page is an attempt.
- **A wrong pick costs nothing and closes the question**, with the right
  answer lit green whether or not it was picked and the verdict naming it.
  The result card appears when the last question closes, the score is
  recorded once (`stories.record`, which also says whether the best moved),
  and *Next story* or *Read it again* opens a fresh session with a fresh
  shuffle.
- **A story is reading, not speaking.** Nothing records, nothing is scored
  for pronunciation and **no attempt is written** — a story counting toward
  level two or the review schedule would be the quiet-mode mistake again.
  What it does count is **study time**: `studying()` is true while the
  questions are still open (`state.story.finishedAt` null), so ten minutes of
  stories wins a day like ten minutes of lessons. It stops counting at the
  result card, as Match stops at the end of a round.
- **It is a tab, like Match and Prizes**, not a stage of `learn`: `state.tab
  === "stories"` with `state.story` null for the list and set for a story.
  `homeLink()` on the list, *‹ Stories* on a story, and `[data-open-story]`
  is handled by the delegated listener on `view` so the result card's
  buttons and the list's rows share one handler.
- **Not in Xerra yet.** The machinery ports as is; the stories don't — they
  are Deb's week in Castilian, and Xerra's would be someone else's in
  Catalan, the same way the keyword pictures are.

Worth asserting: thirty-four `.story-row`s under five `.list-banner`s
reading *Short*, *A bit harder*, *Longer*, *Longer still* and *Hard* with
counts 12, 8, 6, 5 and 3, the rows numbered 1 to 34 straight through, and no
`.story-best` on a clean boot; `historia-26` opens on eight `.story-line`s
and five `.story-q`s with its intro reading *Story 26 of 34 · Hard*, and
`historia-27`, appended with `tier: "easy"`, is numbered 27 but listed
under *Short*;
a story opens with four `.story-line`s, four `[data-line]` play buttons,
`#story-read`, no `.story-en` and no `#story-english`, three `.story-q`s
and nine `.story-opt`s all `lang="es-ES"`, the question text English; a
right pick paints `.story-q.right` with `.story-opt.is-right` and three
disabled options, a wrong one `.story-q.wrong` with the picked option
`.is-wrong`, the right one `.is-right` and a verdict naming it; the result
appears only after the third answer, reading *2 of 3*, with `#story-english`
and a *Next story* button; the store holds `best: 2, of: 3, times: 1` and
`debolingo.attempts` is still empty; a second read scoring 3 moves `best` to
3 and `times` to 2, the list shows *3/3 ✓* and the tile *1 of 34 read*; the
last story offers only *Read it again*; an open story ticks `awards.study`
and export carries `stories`. The smoke script is in the session scratchpad
with the others.
