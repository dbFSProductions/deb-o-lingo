# The project: lineage, versions, the forks, what is not built

Moved word for word out of `CLAUDE.md` at v62, when `app.js` was split into
modules. It is the history and the reasoning as written at the time: where it
says "in app.js" it now means one of the modules listed in `CLAUDE.md`. Add
new reasoning at the end.

---

## Deb-o-lingo — working notes

A personal Spanish (es-ES) pronunciation trainer for one specific beginner,
Deb: five-minute lessons, Duolingo-flavoured UI, real pronunciation scoring.
Not for release; the audience is exactly two people.

`README.md` is for the people using it. This file is for whoever works on it.

## Lineage: this is a fork of Xerra's web app

The core came from `dbFSProductions/listen-record-learn` (`docs/` — "Xerra",
a Catalan trainer). Division of labour:

| File | Relationship to Xerra |
|---|---|
| `docs/js/audio.js` | **Verbatim copy, both halves.** Recording, playback, the speech detector, the waveform and the pitch tracker are the same code in both repos — change one, change the other, and re-verify numerically (below). Only two comments differ, where the tail-pad argument names a Spanish final -s rather than a Catalan final -t. |
| `docs/js/speech.js` | Same behaviour, comments retouched. Port bug fixes both ways. |
| `docs/js/store.js` | Restructured: one fixed language, course content is *code* (content.js) not seeded data, plus lesson progress + streaks. |
| `docs/js/app.js` | Drill/canvas/scoring internals ported; everything around them (path, lessons, banners, celebration) is new. The Add tab, the card-chat panel, stars, autosizing text boxes and the attempt-trend line are ports of Xerra's — keep them in step. Xerra's in-app dictate buttons are the exception: they have been taken out here (see *The composer has no dictate buttons*). |
| `docs/js/card-assistant.js` | Was a verbatim copy; **Xerra's has since grown call timing** (`aiLog` + a Settings panel, its PR #29) that this app doesn't have, so don't "fix" the two back into agreement without porting it deliberately. Everything else is the same, and it talks to the *same deployed Worker*: the Worker takes the language per request, and Pages serves both apps from the one `github.io` origin its CORS list allows. There is no `worker/` directory here — the code lives in Xerra's repo. All five endpoints are called from here (`/complete-card`, `/chat`, `/replies`, `/interview`, `/about-cards`). |
| `docs/js/version.js` | Ported from Xerra. Bumped in step with `VERSION` in `sw.js`; Settings shows the pair. |
| `docs/js/content.js` | **Hand-written here.** No Swift twin, no generator — unlike Xerra, editing it directly is correct. Xerra now carries a Catalan rewrite of this course (its Salutacions, Tapes, El mercat and most of Cafès i sortir); the situations are shared, the focusNotes deliberately are not — hers teach Castilian, Xerra's teach Catalan. Add a unit here and it's worth offering there. |
| `docs/app.css` | Was the divergent one; Xerra has now taken this palette on. The two are meant to stay in step — change a colour here and change it there. Xerra keeps its own structure (section accents, page-head banners, deck meters), so port the *values*, not the rules. |

Xerra gotchas that still apply here: the `.sheet` `display:flex` vs `hidden`
trap (comment preserved in app.css), service-worker staleness (bump **both**
`VERSION`s — `sw.js` and `js/version.js` — when shipping changed assets), and
never commit an Azure key — it lives only in localStorage, entered in Settings.

### Two version strings, bumped together

`VERSION` in `sw.js` and `VERSION` in `docs/js/version.js` aren't derived from
each other — `sw.js` is a classic worker and can't import an ES module, and
inlining one into the other needs the build step this app deliberately doesn't
have. Settings shows both instead, as *Running* (the executing JavaScript) and
*Installed* (read back from `caches.keys()`), so forgetting one shows up as two
different numbers on the screen rather than silently. That panel is also the
answer to "is the fix in, or has the phone not caught up?" — after a deploy the
installed number moves first, and the gap is the reload still owed.

**Say the two numbers out loud whenever you hand work over.** Every pull
request and every merge should end with the pair written out — `js/version.js`
first, then `sw.js`'s — because Settings → *Version* is the only way to tell
"the fix is in" from "the phone hasn't caught up", and that check is worthless
without knowing what number to expect. So: state them in the PR body, and state
them again when reporting a change as done. Deb should never have to go and
read the diff to find out what she's looking for.
`.github/pull_request_template.md` has a slot for them so the PR half is
structural rather than a thing to remember.

Bumping it is necessary and was once not sufficient. The install handler used
to precache with `cache.add(url)`, whose fetch goes through the browser's own
HTTP cache — and Pages serves everything `max-age=600`. So for ten minutes
after a deploy, a brand-new version's cache could be filled with pre-deploy
copies of some files and post-deploy copies of others, and cache-first then
served that mix until the *next* version bump, with no amount of reloading
fixing it. (That is Xerra's story; this repo shipped the fix before it
happened here.) Precaching now uses `new Request(url, { cache: "reload" })` so
a version's cache is all of one version, and navigations are network-first
(cache only as the offline fallback) so the HTML can never be staler than the
scripts it names. **Don't undo either one for "fewer requests."**

## Deliberately not built yet (v2 ideas)

- **"Say it your way"** — the requested next feature: Deb attempts her own
  guess at how to say something, the app transcribes it (Azure STT), and
  explains — kindly — what a native would say instead, especially word-order
  habits carried over from American English (adjective placement, "¿Puedo
  tener...?" → "¿Me pone...?", unnecessary subject pronouns, etc.). Needs
  design: probably free-recording against a *situation* prompt rather than a
  fixed phrase, plus a small rules/examples table for common EN→ES transfer
  errors.
- Demotion. Review brings a card back on a schedule read off the attempts,
  but nothing ever comes back down from level two — a card peeked at or
  failed comes round sooner, that is all. If a demotion is ever wanted it
  belongs in `reviewOf`'s neighbourhood, not as a special case in the drill.
- Xerra's Practice tab groups a deck's rows with a progress meter and an
  average. Deb's path shows per-lesson bests instead; if free-practice ever
  needs more shape than Repaso + Favourites, that's the pattern to port.
- More units as Deb's world grows (pharmacy, taxi, phone calls).

### Where the two forks still differ

Two things here are waiting to be offered to Xerra rather than ported from it:
the Stories machinery (the scenes themselves don't port — see *Stories*), and
the Review-as-a-tile shape, if a home screen that always shows Review is
wanted there too. The four everyday units are situations worth offering, as
the first four were, with Catalan focusNotes written fresh. What's left is
deliberate:

- **The composer's dictate buttons.** Xerra has them; here they are gone,
  because Safari has no `SpeechRecognition` and they only ever pointed at the
  keyboard's own microphone. See *The composer has no dictate buttons*.

- **The editor's AI rebuild handles replies differently.** Here `wireEditorAI`
  reports whether the card in the boxes is the assistant's rewrite, and Save
  drops the replies if it is, so the card offers *What might they say back?*
  again. Xerra fetches a replacement set instead and lets Undo restore the
  originals — better, and more moving parts. Either is defensible; don't
  "fix" one into the other without deciding which.
- **Deck list versus path.** Xerra browses by deck with an accordion and a
  merged search page; here everything hangs off the path plus a flat Phrases
  list. Sobre mí is a home tile in both now; behind it, its cards are a deck
  there and `ownPhrases` in a named deck here.
- **Road mode.** Xerra's drill stripped to Listen, record, You and the score
  for practising on the move. Quiet mode — its mirror — is here now; road
  mode is not, and this drill card has never carried the situation or the
  usage note, so half of what road mode is for taking off isn't there.
- **The dot-or-line gate is here in a three-shape cut.** Xerra has five shapes
  in two languages; El pasado has dot, line and the present perfect, its own
  five-card lessons, and the endings printed loud (see *Dot in a box, or
  line* above). Porting Xerra's `both`/pluperfect later is additive — an
  `ASPECTS` entry and cards.
- **The keyword pictures are in all three forks now**, with the same machinery
  and deliberately different scenes. Xerra's is a **Paraules** family of six
  decks, thirty-six Catalan words, and it needed no Worker change — `/picture`
  was already deployed. Two things it had to solve that Spanish doesn't pose:
  Catalan's `ll` has no English sound to bridge to (the scenes say "ya" and the
  focusNote says *the lli of 'million'*), and its stress decides which vowels
  survive, so *l'escala* is not "escalator" and *la maleta* is not the "mallet"
  used here. Over there the fields ride on the phrase itself rather than
  through an override, since its cards are data rather than code.
- **The content.** Same situations in the everyday decks, deliberately
  different focusNotes — hers teach Castilian, Xerra's teach Catalan.

## v62: app.js split into modules

`app.js` had reached 5,900 lines. At v62 it was split into an entry point and
one module per page, the way Xerra's was at its v130, with the same tool
(`tools/split-app/split.js`, copied from that repo) and this app's own plan
(`tools/split-app/debolingo.config.js`). No behaviour was meant to change.

- **The tool moves code; it does not rewrite it.** One edit was made by hand
  first, because the tool demanded it: `let recorder` became `state.recorder`,
  since `toggleRecording` in `drill.js` replaces it and an imported `let` is
  read-only. Xerra made the same change for the same reason.
- **`core.js` imports no page module**, so every page can lean on it at load
  time. `goHome` and `render` live in `app.js` because they need the pages.
- **`prizes.js` starts the study clock when it is imported** (`setInterval`
  at its top level), as the single file did at boot.
- **Mum-o-lingo was split the same day** with its own config; the two module
  lists differ only where the apps do (no prizes, match, stories or quiet
  mode there).
- Checked with `tools/checks/smoke.js` before and after, `node --check`,
  ESLint `no-undef`, a line-for-line comparison against the old file, and an
  upgrade from v61 with its service worker installed, then offline. All of it
  headless, with Azure faked and the Worker stubbed.
