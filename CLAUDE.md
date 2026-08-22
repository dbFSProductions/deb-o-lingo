# Deb-o-lingo — working notes

A personal Spanish (es-ES) pronunciation trainer for one specific beginner,
Deb: five-minute lessons, Duolingo-flavoured UI, real pronunciation scoring.
Not for release; the audience is exactly two people.

`README.md` is for the people using it. This file is for whoever works on it.

---

## Lineage: this is a fork of Xerra's web app

The core came from `dbFSProductions/listen-record-learn` (`docs/` — "Xerra",
a Catalan trainer). Division of labour:

| File | Relationship to Xerra |
|---|---|
| `docs/js/audio.js` | Waveform + pitch analysis are a **verbatim copy**, verified against a 150 Hz tone — if you change the algorithm in either repo, change it in the other and re-verify against a known tone. The playback section has diverged: `comparableLoudness` boosts quiet mic recordings to TTS level before playing (Xerra would likely want the same fix). |
| `docs/js/speech.js` | Same behaviour, comments retouched. Port bug fixes both ways. |
| `docs/js/store.js` | Restructured: one fixed language, course content is *code* (content.js) not seeded data, plus lesson progress + streaks. |
| `docs/js/app.js` | Drill/canvas/scoring internals ported; everything around them (path, lessons, banners, celebration) is new. The Add tab, the card-chat panel, dictation, stars, autosizing text boxes and the attempt-trend line are ports of Xerra's — keep them in step. |
| `docs/js/card-assistant.js` | **Verbatim copy**, and it talks to the *same deployed Worker* as Xerra: the Worker takes the language per request, and Pages serves both apps from the one `github.io` origin its CORS list allows. There is no `worker/` directory here — the code lives in Xerra's repo. |
| `docs/js/content.js` | **Hand-written here.** No Swift twin, no generator — unlike Xerra, editing it directly is correct. Xerra now carries a Catalan rewrite of this course (its Salutacions, Tapes, El mercat and most of Cafès i sortir); the situations are shared, the focusNotes deliberately are not — hers teach Castilian, Xerra's teach Catalan. Add a unit here and it's worth offering there. |
| `docs/app.css` | Was the divergent one; Xerra has now taken this palette on. The two are meant to stay in step — change a colour here and change it there. Xerra keeps its own structure (section accents, page-head banners, deck meters), so port the *values*, not the rules. |

Xerra gotchas that still apply here: the `.sheet` `display:flex` vs `hidden`
trap (comment preserved in app.css), service-worker staleness (bump `VERSION`
in `sw.js` when shipping changed assets), and never commit an Azure key —
it lives only in localStorage, entered in Settings.

---

## Content model

`content.js` exports `COURSE`: units → lessons → phrases. Rules:

- **Phrase ids are stable and referenced by saved attempts.** Never renumber;
  append.
- A lesson is ~5 phrases — one 6:30am coffee. Keep them that size.
- Every phrase has a `focusNote` written for an American English speaker
  learning **Castilian** Spanish — soft d's, silent h, b=v, the 'th' in
  ce/ci/z, tapped r. The notes are the pedagogy, not decoration.
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

## What is data, and what is code

`content.js` is code and stays the source of truth. Everything Deb does to it
is stored beside it, keyed by phrase id:

| localStorage key | Holds |
|---|---|
| `debolingo.phrases` | Her own cards — from the Add tab or written by hand. |
| `debolingo.overrides` | Her edits to *course* phrases, as a diff of changed fields only. Empty diff = key deleted, so "Reset to the original" is a delete and an untouched phrase costs no storage. |
| `debolingo.favourites` | Starred phrase ids, course and custom alike. |
| `debolingo.attempts` | Recordings and scores (audio blobs live in IndexedDB). |
| `debolingo.progress` | Completed lessons + streak. |

`library.decorate()` is what merges an override and the star flag onto a stored
phrase — anything that reads a phrase for display or for drilling must go
through it, or Deb's edit will be invisible in that one place. Export/import
carries all five.

**Only Deb's own cards can be deleted.** `library.removePhrase()` takes the
card, its attempts and its recordings, and the phrase sheet offers it — armed,
so it takes two taps (`armDelete()`, shared with the editor's copy). A course
card has no delete: it's code, and deleting one would mean inventing a
sixth "hidden ids" store. The sheet says so rather than leaving Deb hunting
for a button that isn't there. If hiding course cards is ever wanted, that's
the design to have, not a `removePhrase` that silently does nothing.

Her own cards ride the path as a generated unit, **Lo tuyo**, chunked five to a
lesson in creation order (`own-1`, `own-2`, …). The ids are stable as cards are
appended; deleting one can reshuffle membership, which costs at most a
completion tick on a lesson she made herself.

### Editing a card, and the AI rebuild

The edit sheet has a **Rebuild the rest with AI** button (only when the card
assistant is configured). It calls the same `/complete-card` the Add tab does —
**the Worker is unchanged**, which matters because it lives in Xerra's repo and
serves both apps.

The one piece of judgement is which side gets sent. Change the Spanish but not
the English and the two now disagree; sending both would ask the assistant to
reconcile a contradiction. So `wireEditorAI` snapshots the fields when the
sheet opens and sends only the side that was actually edited, dropping the
other as if it had been left blank on the Add tab. Change both, or neither, and
both go. Nothing is written until Save — for a course card that means no
override is created — and the review notice carries an Undo that puts the
snapshot back.

The lesson bar has an **EDIT** button for the card she has just heard and
realised isn't how she'd say it. `editPhrase(phrase, onSaved)` takes a callback
for it: the lesson queue holds decorated copies and the model audio is cached
by text, so the fixed card has to go back into `lesson.queue` and be reloaded —
a re-render alone would keep the old text's audio.

Xerra has both in the same shape. Keep them in step.

---

## Level two: drilling from memory

A card is read aloud until `library.goodAttempts()` reaches `RECALL_AFTER` (2),
then `library.recallReady()` flips it to a memory question: the drill prints
the *English* where the Spanish normally goes and withholds three things, all
of which would answer it — the Spanish text, the `focusNote`, and the
Listen/Slow buttons (the model audio says it out loud). **If you add anything
to the drill card, decide which side of that line it falls on.**

Three flags in `state` carry it: `recall` (this card is a question), `revealed`
(the answer is on screen — always true at level one) and `peeked` (Show me was
used rather than remembering). Recording reveals; so does Show me. Attempts now
carry `mode` — `"listen"`, `"recall"` or `"recall-shown"`. Older attempts have
no `mode`, which reads as `"listen"`, because that is what they were.

An attempt counts toward the two if it scored a pass **or wasn't scored at
all** — with no Azure key there is no score to judge by, and the alternative is
that nothing ever leaves level one on the degraded path.

Deliberately *not* done: peeking doesn't demote a card, and nothing ever comes
back down. Spaced repetition is still the unbuilt feature below, and a decay
rule is the shape it should take, not a special case bolted onto this.

Xerra has the same feature in the same shape — same constants, same flags, same
`mode` values. Keep them in step.

---

## Running and checking

```bash
cd docs && python3 -m http.server 8765   # http://127.0.0.1:8765
```

Playwright against that URL beats clicking through. Worth asserting: no
console errors on boot, the path shows 12 course nodes + Repaso with **nothing
locked** (`.node.locked` should never match), the deepest lesson opens straight
away with `.drill-text` populated, an edit to a course phrase drills as edited
and Reset puts it back, a starred phrase raises the Favourites node, a saved
card appears in Phrases *and* in Lo tuyo, and completion writes progress +
lights the streak.

For level two, seed `debolingo.attempts` with two passing attempts on a known
phrase id and assert the drill shows the *English* in `.drill-text`, carries a
`.level-badge`, and has no `#listen` and no `.focus-note`; then that `#show-me`
brings all three back. Recording can be driven headlessly with Chromium's
`--use-fake-device-for-media-stream` (plus `--use-fake-ui-for-media-stream`),
which is enough to check the reveal-on-record and the stored `mode`. Anything touching Azure or the card assistant can't be
covered — no key and no passcode in the repo, ever.

Deployment is GitHub Pages from `main`/`docs`. All paths are relative, so it
works from a subpath. Bump `sw.js` `VERSION` when shipping changes or the
phone will keep the old build.

---

## Deliberately not built yet (v2 ideas)

- **"Say it your way"** — the requested next feature: Deb attempts her own
  guess at how to say something, the app transcribes it (Azure STT), and
  explains — kindly — what a native would say instead, especially word-order
  habits carried over from American English (adjective placement, "¿Puedo
  tener...?" → "¿Me pone...?", unnecessary subject pronouns, etc.). Needs
  design: probably free-recording against a *situation* prompt rather than a
  fixed phrase, plus a small rules/examples table for common EN→ES transfer
  errors.
- Spaced repetition beyond the simple Repaso shuffle. Level two is the first
  half of it — cards get harder once known — but nothing decays, so a card
  learned in March is still "level 2, done" in August. A decay rule (and a
  demotion when a level-2 card is peeked at or failed) is the next step, and it
  belongs here rather than as a special case inside the drill.
- Xerra's Practice tab groups a deck's rows with a progress meter and an
  average. Deb's path shows per-lesson bests instead; if free-practice ever
  needs more shape than Repaso + Favourites, that's the pattern to port.
- More units as Deb's world grows (pharmacy, taxi, phone calls).
