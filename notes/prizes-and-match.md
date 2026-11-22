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

### Harder rounds: Listen, and more pairs

Asked for as *"is there also a way to make things more challenging?"*, and
of four offered (Listen, similar words together, bigger rounds, words only)
these two were chosen.

- **Two pill rows on the Match page**, Read / Listen and 6 / 8 / 10, kept in
  `settings.matchListen` and `settings.matchPairs`. Changing either starts a
  fresh round: a round that changed shape halfway has no honest time.
- **Listen turns the Spanish column into speakers.** A tap says the card and
  picks it; a second tap says it again and *keeps* it picked, because hearing
  it again is the game and losing your place for it would punish that. The
  writing appears once the pair is matched, and the matched card stays a
  Listen button as before. Nothing is said on the match itself in Listen —
  she has just heard it.
- **Listen needs Azure.** The browser voice on iOS can accept an utterance
  and never say it, and a round of silent speakers can't be played. Without a
  key the option is shown disabled with one line saying why, and a saved
  Listen falls back to reading.
- **A best time is only a best against the same kind of round.** `bestTime`
  stays what it always was — six pairs, read, every round before this
  existed — and every other kind keeps its own in `awards.match.bests`, keyed
  `read-8`, `listen-10` and so on. Additive, so an older backup imports as it
  did. Pairs count towards the medals whatever the round, so a ten-pair round
  earns faster; that is fair, it is more work.
- `tools/checks/match.js`: default six and Read; ten and Listen remembered;
  every Spanish card a speaker with no writing; a tap asks the (fake) Azure
  for that card's text and picks it, a second tap keeps it picked; a miss;
  matched cards show their Spanish; a round with a miss sets no best, a clean
  one sets `listen-10` and leaves `bestTime` alone; without a key, Listen is
  disabled and a saved Listen plays as Read with the saved eight pairs.

#### Said on the pick, and a stylesheet that didn't arrive (v65)

- **A Spanish card says itself when picked, in Read too** — asked for by Deb
  the day Listen shipped, *"always make it say the sentence when it is
  selected, as well as when it's correct"*. So a pick says it and a match says
  it again, in both modes. The one exception is a match made while the pick is
  still talking: `sayAloud` stops the player before its busy guard, so a
  second call would cut the line off and say nothing. In Read a second tap on
  the picked card still unpicks it, silently. Azure only, as before.
- **v64's pills arrived unstyled on her phone** — the new Match page, with
  Read / Listen and 6 / 8 / 10 as bare iOS buttons and Listen on but not gold.
  That is new scripts beside an older `app.css`. It could not be reproduced
  here (no WebKit, no route to Pages), so the cause is inferred: the install
  fetched a copy of the stylesheet from before the deploy, and cache-first
  kept the mix until the next bump. `sw.js` now precaches `url?v=VERSION`, so
  no cache between the phone and Pages can answer with an old copy; every
  lookup already used `ignoreSearch` (the one that didn't, the offline
  fallback to `./index.html`, does now). The pills also set
  `appearance: none` so they never lean on Safari's default button.

### Build, the sentence game (v69)

Asked for as *"Deb's individual word vocab is coming on nicely but not putting
the words into full sentences. Maybe there is a game that gets her to combine
words and build sentences"*, with "can I have a cookie please" as the example.
The design was talked through with an advisor model first, and cut to the
first version below.

- **The mechanic.** An English prompt, an empty line, a tray of Spanish tiles.
  Tap a tile to place it, tap a placed one to send it back (no dragging on
  iOS), Check commits. Match trains recognising a word; this is the step after
  it, from a meaning to Spanish in order.
- **Frames, not free grammar.** A beginner gets to sentences through set
  phrases with a gap. `FRAMES` in `content.js`: *¿Me pone ___, por favor?*,
  *Quiero*, *Necesito*, *¿Dónde está*, *Voy a*, *Me duele*, *¿Cuánto
  cuesta*, each with a hand-picked list of Palabras ids that make sense in it
  ("¿Me pone una farmacia?" is grammatical and silly). Hand-written like the
  rest of the content (rule 6); the Worker was not used, since that would
  need a new endpoint over there and would give Spanish nobody had read.
- **The article is the decision.** The noun's `el`/`la` is turned into the
  frame's form: un/una, el/la, al/a la. Frame chunks are one tile ("me pone"),
  the article and noun two. The tray has three decoys: the article of the
  other gender, another noun the frame takes, and another frame's opening.
  Punctuation and capitals stay off the tiles ("¿Me" would give away where it
  goes) and appear on the finished line.
- **Her edits count.** Words are read through `library.phraseById`, so an
  edited Palabras word shows as edited. A word that is deleted, no longer
  starts with el/la, or is el-but-feminine (el agua) is skipped.
- **Misses.** A wrong Check shakes the tiles in the wrong slots and counts;
  two misses offer *Show me*, which counts one more and isn't tallied as
  built. A right one is said aloud (Azure only, as in Match); Listen beside
  it always works.
- **No attempt is written.** A built sentence is not a card, and level two and
  Review are read off attempts by phrase id. It counts study time while a
  round is open (`studying()` in prizes.js) and keeps `awards.build`
  `{ total, rounds, perfect }`, additive, so an older backup imports as 0.
- **Home.** Review went from a square to a strip under the week, the same
  shape, in its teal, by request: "move the daily review up to be under
  streak … a full width, half tile like streak. Then put this in the space
  of the full tile where review is now." Build is that square, in pink.
- **Not built yet:** a Listen pill (hear the sentence, build what you heard),
  saying it into the mic with an unsaved score, round sizes, medals, more
  frames, plurals, her own Your-words nouns in the gaps, keeping a built
  sentence as a card, a word-by-word hard mode.
- `tools/checks/build.js`: every frame × noun is made by the app's own code
  (`BUILD_PRINT=1` prints them all to be read by eye), three distinct decoys
  and no punctuation on any tray, *Me duele el pie*, *Voy al médico* with
  *a la* as the decoy, *an umbrella*; eight squares with Build seventh and
  Review a strip under the week less than 0.7 of a square high; a round of
  six with no noun twice, place, take back, a wrong order shakes, Show me
  after two, each right sentence said by the fake Azure, a finished round
  tallied, no attempt written, the square's count.

#### Each tile says itself; a wrong Check says where and why (v70)

From Deb's first rounds, three asks together: *"says the word every time it
was clicked, so she hears the words as she's building"*, *"more clear that
they are in the wrong order after she clicks check — the colour change is
quite subtle"*, and *"maybe it should offer hints as to why it's wrong"*.
Talked through with the advisor again before building.

- **A tile says itself as it goes onto the line.** Placing only: taking one
  back is undoing, and silence keeps the gestures apart. Exactly what is on
  the tile ("me pone", "a la", "un"); isolated articles sound a little
  clipped, and that is accepted. Decoys speak too, so the sound carries no
  verdict. Azure only, as in Match. The busy flag is put on the tile just
  painted onto the line, which the next repaint replaces, so a quick second
  tap stops the first and is said rather than refused as busy.
- **Marks that stay.** v69's red border on a pink tile lasted half a second.
  Now every placed tile is filled, with a glyph so colour is never alone:
  green ✓ right word right place, gold ↔ in the sentence but not here, red ✕
  struck through not in this sentence. They stay (`game.marks`) until she
  moves any tile, then all clear — a half-updated set would lie. Check is
  disabled until something changes, so one mistake can't cost two misses.
  Marking a slot right gives nothing away: she has committed and paid.
- **One hint line, the most useful that applies** (`hintFor`): the wrong
  article first ("*silla* is a **la** word — so **una**, not un"; "a + el
  squeezes into **al**"), then a decoy noun ("*tenedor* is the fork — this
  one wants the chair"), then a decoy opening ("*quiero* is 'I want' — this
  sentence starts another way", from each frame's new `gist`), then a word
  short, then the order ("The little word goes first: **una** silla"; "All
  the right words — just the order", and on the second miss "Start with
  **necesito**"). Hand-written, never the Worker: one line, instant, read
  before it shipped.
- **The reason stays with the answer.** If the wrong article was on the line
  at any Check, the solved card keeps the article line beside ¡Eso es! or
  Show me's answer, so she leaves with the rule and not just the sentence.
- `tools/checks/build.js` now also: every hint's wording on sentences built
  for it; marks for right-word-wrong-place and a stray; placing a tile asks
  the fake Azure for its text and taking it back asks for nothing; the wrong
  article marked out and the rest right, the hint naming the word, Check
  disabled, the marks still there after the shake, cleared by a move; the
  order hint and gold marks; Show me with the reason kept.

#### The noun before its article (v71)

Asked for as *"when it's correcting the sentences, it should show that the
noun needs correction first and then correct the article"*. Right: the
article hangs on the noun, so with the wrong noun on the line a hint about
its article is about a word that shouldn't be there — and putting *una*
right in front of *tenedor* would teach the wrong pair. `hintFor` now reads
wrong noun → wrong article → another sentence's opening → a word short →
order. The marks are unchanged: both tiles still show red ✕, because they
are both wrong; the hint is which to fix first. Asserted: a wrong noun with
a wrong article gets the noun's hint, and a wrong article beats a stray
opening.

Also in v71, unrelated: the smoke check failed about one run in twelve on
`AbortError: The play() request was interrupted by a call to pause()`. The
score card's Model / You buttons and the phrase sheet's recordings called
`player.play()` without a catch, so a tap that stopped a clip before it
started left an unhandled rejection — silent on the phone, a console error
in the check. They now catch and ignore it, as Listen in the drill already
did; a later tap stopping a clip is not an error.
