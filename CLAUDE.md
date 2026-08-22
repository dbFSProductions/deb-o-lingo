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
| `docs/js/content.js` | **Hand-written here.** No Swift twin, no generator — unlike Xerra, editing it directly is correct. |
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
lights the streak. Anything touching Azure or the card assistant can't be
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
- Spaced repetition beyond the simple Repaso shuffle.
- Xerra's Practice tab groups a deck's rows with a progress meter and an
  average. Deb's path shows per-lesson bests instead; if free-practice ever
  needs more shape than Repaso + Favourites, that's the pattern to port.
- More units as Deb's world grows (pharmacy, taxi, phone calls).
