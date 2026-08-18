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
| `docs/js/audio.js` | **Verbatim copy.** Waveform + pitch analysis, verified against a 150 Hz tone. If you change the algorithm in either repo, change it in the other and re-verify against a known tone. |
| `docs/js/speech.js` | Same behaviour, comments retouched. Port bug fixes both ways. |
| `docs/js/store.js` | Restructured: one fixed language, course content is *code* (content.js) not seeded data, plus lesson progress + streaks. |
| `docs/js/app.js` | Drill/canvas/scoring internals ported; everything around them (path, lessons, banners, celebration) is new. |
| `docs/js/content.js` | **Hand-written here.** No Swift twin, no generator — unlike Xerra, editing it directly is correct. |

Xerra gotchas that still apply here: the `.sheet` `display:flex` vs `hidden`
trap (comment preserved in app.css), and never commit an Azure key — it lives
only in localStorage, entered in Settings. Service-worker staleness used to be
on that list; see below for how it was dealt with.

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
  rewriting (no 'th'), not just the voice — `VOICES` in store.js already
  lists two es-MX voices for experiments.

Progress (`debolingo.progress` in localStorage): completed lessons with best
average, and a streak counted in *local* days. Lessons unlock sequentially;
Settings has an "Unlock all" toggle for testing.

---

## Running and checking

```bash
cd docs && python3 -m http.server 8765   # http://127.0.0.1:8765
```

Playwright against that URL beats clicking through. Worth asserting: no
console errors on boot, the path shows 12 lesson nodes + Repaso, a lesson
opens with `.drill-text` populated, sequential locking holds (node 2 locked
until node 1 done), and completion writes progress + lights the streak.
Anything touching Azure can't be covered — no key in the repo, ever.

Deployment is GitHub Pages from `main`/`docs`. All paths are relative, so it
works from a subpath.

### Shipping, and why the phone used to lag behind

Deb spent a day on an old build after a deploy went out fine — the service
worker was cache-first, so her phone had no reason to ever look at the server
again. Three things fix that, and all three matter:

- **`sw.js` serves app code network-first** (cache-first only for `vendor/`
  and `icons/`, which never change without a new filename). The cache is the
  offline safety net, not the source of truth.
- **The precache uses `cache: "reload"`** so a new worker can't install using
  the very files it was meant to replace.
- **Open windows are brought forward.** On activate, a worker that deleted a
  stale cache messages open windows; the app reloads itself, deferring if a
  drill is in progress (`flushPendingUpdate` in app.js). Windows on an
  *older* build can't answer that message, so `rescueStaleWindows()`
  navigates them after a grace period.

  That rescue is **deliberately not awaited by `activate`**. A navigation
  needs fetches, and fetches stay queued until activation resolves — awaiting
  it deadlocks the worker against its own page, and the app appears to hang
  for minutes. It was written that way once; don't write it that way again.

Still bump `VERSION` in `sw.js` when shipping changed assets: it names the
cache, and deleting the previous one is what tells a worker that an older
build was on screen. Verified end to end with Playwright — a phone pinned to
the pre-tabbar build fixes itself ~4s after one reopen, a build shipped while
the app is open lands in well under a second, and offline still boots.

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
- More units as Deb's world grows (pharmacy, taxi, phone calls).
