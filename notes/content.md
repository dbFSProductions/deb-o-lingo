# The content model

Moved word for word out of `CLAUDE.md` at v62, when `app.js` was split into
modules. It is the history and the reasoning as written at the time: where it
says "in app.js" it now means one of the modules listed in `CLAUDE.md`. Add
new reasoning at the end.

---

## Content model

`content.js` exports `COURSE`: units → lessons → phrases. Rules:

- **Phrase ids are stable and referenced by saved attempts.** Never renumber;
  append.
- The **Palabras** cards carry `sounds` and `picture` — see *A word, a sound
  and one ridiculous picture* below. Both are editable fields, so they are
  hers to rewrite and any card may have them, not only a Palabras word. A
  third, `gender`, decides whether the picture paints that word's object blue
  or pink; it is almost always read off the article instead and is written on a
  card only where the article lies.
- A lesson is ~5 phrases — one 6:30am coffee. Keep them that size.
- **Precios y números, El restaurante, De compras and Cada día** came in
  together, with two more Palabras lessons, for Match's sake: the game draws
  from every drillable card, and 111 cards was six pairs a round coming back
  round too soon. Asked for as *"more words and sentences covering a wider
  variety … prices definitely, but still more food shopping, restaurants, and
  everyday stuff"*. They sit on the path in course order after El mercado and
  before El pasado, and they are ordinary units — the deliberate choice was
  proper lessons over a Match-only pile, because a card that can't be
  drilled, scored or reviewed is a card in only one place. Nothing in them
  repeats a phrase already on a card elsewhere: Match refuses two cards with
  the same text in one round, and a duplicate would also be the same phrase
  twice on the path.
- **La vida diaria, Las plantas, Buscar piso, Por la ciudad and Las
  fiestas** came in together, asked for as *"more phrases, more words, more
  match, more stories"* with the topics named — what an American living in
  Barcelona needs in year one: the pharmacy and the phone, her plants,
  looking for housing, directions, and a holidays section with Thanksgiving
  and Christmas coming. Same shape as the four above and sitting after Cada
  día, before El pasado. Four Palabras lessons came with them
  (`palabras-13` to `palabras-16`, phrase ids from `palabras-18-1`), carrying
  the words those units lean on — the pot, the rent, the corner, the
  turkey — and eight stories written out of the same vocabulary, spread
  across the tiers rather than stacked on the end. Las fiestas is where the
  customs live: Nochebuena is the dinner, the lottery is the 22nd, the grapes
  are midnight on the 31st, and presents come on the 6th from the Kings — it
  is in the focusNotes because it is what she'll be asked about.
- **`STORIES` is the other export**, and it is not course content: a story
  is three or four sentences and three questions, read rather than said, and
  nothing in it is a phrase. See *Stories* below. Ids are stable for the
  same reason phrase ids are — `debolingo.stories` is keyed by them.
- Every phrase has a `focusNote` written for an American English speaker
  learning **Castilian** Spanish — soft d's, silent h, b=v, the 'th' in
  ce/ci/z, tapped r. The notes are the pedagogy, not decoration.
- The **El pasado** phrases also carry `aspect` and `aspectNote` — see *Dot in
  a box, or line* below. `aspect` is the shape the card is about, and a lesson's
  contents decide what the gate offers, so filing a card matters twice.
- El pasado cards also carry `marked`: the text with the tense machinery in
  `[brackets]`, drawn on the drill card as amber *lettering* — a letter shade,
  not a background block, which made trabaj-aba read as two words
  (`drillSpanish` in app.js, `.ending-mark` in app.css; `--amber` is the gold
  that works as text, where `--gold` is a fill). The brackets must strip back to `text`
  exactly or the highlight is silently dropped — which is what keeps an edited
  card showing its edit, and makes a typo in the marks cost only the
  highlight. Their translations stay uncontracted ("I have been", "did not")
  on purpose: word-for-word English is what lets the tense mapping be seen.
- And `infinitive` — "trabajar — to work" — printed as one quiet italic line
  under the translation (`.infinitive-line`, behind `showTranslation` since
  the gloss is half the meaning) and beside the term on the phrase sheet. She
  should know what the -aba is hanging off; it also makes visible that *fui a
  Atlanta* is ir while *la clase fue dura* is ser. Deliberately not loud —
  the endings are the loud part.
- If Deb's target ever shifts to Latin American Spanish, the focusNotes need
  rewriting (no 'th'), not just the voice — `VOICES` in store.js is
  deliberately es-ES only, and `settings.load()` resets any voice not in
  that list, so add new voices there when the content is ready for them.

Progress (`debolingo.progress` in localStorage): completed lessons with best
average, and a streak counted in *local* days.

**Nothing is locked.** Every node on the path is open from first launch; the
ticks and the streak record what Deb has done, they don't gate what she may do
next. The old sequential unlocking and its "Unlock all" testing toggle are
gone — don't reintroduce gating as a "fix" for the path looking uniformly
available.

- **Four more Palabras lessons** (`palabras-17` to `palabras-20`, phrase ids
  from `palabras-22-1`), asked for as *more words* once again: the body
  (pilates, the pharmacy), wrapped up for winter, five more everyday verbs to
  sit beside tener / querer / ir / saber, and the people she talks to — the
  neighbour, the waiter, the shop assistant. Words only this time, no new
  units or stories. Two cards are worth knowing about: *la mano* ends in -o
  and is still la, which the article carries, so `genderOf` reads it right
  with no `gender` field; and *el pie*'s note says out loud that it is not
  English "pie", since the bridge (*pea, YEH*) is the nearest honest sound.
  `tools/checks/content.js` came with them: unique ids and texts, every
  Palabras word with its sounds, picture and focusNote, none ending in a
  stop, and the Words tile's count matching the course.
