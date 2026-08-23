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
| `docs/js/card-assistant.js` | **Verbatim copy**, and it talks to the *same deployed Worker* as Xerra: the Worker takes the language per request, and Pages serves both apps from the one `github.io` origin its CORS list allows. There is no `worker/` directory here — the code lives in Xerra's repo. All five endpoints are now called from here (`/complete-card`, `/chat`, `/replies`, `/interview`, `/about-cards`). |
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
| `debolingo.notes` | Answers she kept from a card chat, by phrase id. |
| `debolingo.replies` | What she might hear back, by phrase id. |
| `debolingo.aboutMe` | The Sobre mí interview transcript (not keyed by phrase). |

`library.decorate()` is what merges an override, the star flag, the kept notes
and the replies onto a stored phrase — anything that reads a phrase for display
or for drilling must go through it, or Deb's edit will be invisible in that one
place. Export/import carries all seven stores plus the transcript.

**Notes and replies are not edits, so they are not overrides.** An override is
a diff against content.js that "Reset to the original" throws away; losing the
answer Deb kept about a phrase because she reset its wording would be wrong.
They get their own stores for the same reason favourites does: a course phrase
is code and can't carry anything.

**`decorate()` hands back a copy, and that is the one thing to watch.** Xerra
mutates the phrase object its queue is holding (`setReplies`, `keepNote`); here
the queue is holding a copy, so `library.setReplies`/`keepNote` write the store
and the *caller* assigns the result back onto the copy it has
(`phrase.replies = …`, `phrase.notes = …`). Same fix in a different shape:
repaint the card you're looking at, never `render()` underneath yourself —
a render in the drill takes the attempt off the screen and the chat with it.
`updatePhrase` strips `favourite`, `notes` and `replies` back off before
saving, so a stale second copy can't ride along in export.

**Only Deb's own cards can be deleted.** `library.removePhrase()` takes the
card, its attempts and its recordings, and the phrase sheet offers it — armed,
so it takes two taps (`armDelete()`, shared with the editor's copy). A course
card has no delete: it's code, and deleting one would mean inventing yet
another "hidden ids" store. The sheet says so rather than leaving Deb hunting
for a button that isn't there. If hiding course cards is ever wanted, that's
the design to have, not a `removePhrase` that silently does nothing.

Her own cards ride the path as a generated unit, **Lo tuyo**, chunked five to a
lesson in creation order (`own-1`, `own-2`, …). The ids are stable as cards are
appended; deleting one can reshuffle membership, which costs at most a
completion tick on a lesson she made herself. Cards the interview wrote are
chunked the same way into a second unit (`about-1`, …) — the two lists are
separate so neither can shuffle the other's lesson ids.

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

## What they might say back

A card carries `replies` — two or three things a person actually says in
answer, each with its English and a play button. Saying your line well is half
of it; the half that strands you is the answer.

- **They have their own Worker endpoint, `/replies`, and that is not a detail.**
  In Xerra they were briefly extra fields on `/complete-card` and it took the
  Add tab down: a required array of objects on top of the six string fields
  roughly doubled the output, a Flash model already shedding load took longer
  than the Worker's per-attempt timeout to produce it, and the button spun for
  a minute before reporting Gemini busy. **Card generation must stay the small,
  fast call it is.** Don't move replies back into the card payload to save a
  request.
- **The Add tab never waits for them.** `askForReplies()` is fired after the
  card is on screen and is never awaited, so the card lands at its old speed,
  Save is enabled immediately, and a failure here costs nothing but the
  section. `repliesToken` guards against a slow set landing after "Try again".
- **The whole course predates the field**, so *What might they say back?*
  offers to go and get some — on the phrase sheet **and in the lesson**, since
  the moment you want them is the moment you have just said the line and
  wondered what happens next.
- **They are held back harder than anything else in the drill.** A situation is
  a clue; "we're full, about twenty minutes" is the answer to the question a
  level-two card is asking you to produce. So `drillReplies` stays out entirely
  while a question is standing, as well as while the meaning is hidden — and
  the *offer* sits behind the same gate as the replies it would fill in.
- Replies play through `speech.modelAudio`, which keys its cache on the text,
  so a reply heard once is available offline like any phrase. `sayAloud` is the
  shared one-tap behaviour: stop whatever is playing, Azure audio if there's a
  key, browser voice if there isn't, busy flag on the button itself so several
  can sit on one screen.

Xerra has all of this, plus a preview line on the Add review that reads the
card aloud, an Undo that withdraws the whole completion, and replies replaced
by the editor's AI rebuild. Those three are **not ported yet** and are worth
having.

## Asking about the card you are practising, and keeping the answer

Getting a card right and not knowing *why* it is right is where practice
stalls. So the lesson carries the same `cardChatPanel` the phrase sheet and the
Add tab use, at the bottom of the page, and an answer worth having can be kept
on the card.

- **Kept per answer, not per conversation.** A chat wanders; the one paragraph
  that explained why it's *me pone* is the part you want under the card next
  time. The button lives inside the answer bubble, and the question that drew
  it is stored with it — an answer with no question in front of it reads like a
  note someone else left.
- **Both halves pick their side of the level-two line, and they pick
  differently.** The printed notes are reference material: out while a question
  is standing *and* out while the meaning is hidden, because a note about a
  card quotes it and always explains it. The ask box shows nothing until you
  type, so it only goes out while the question is standing — but it does have
  to go, because the answer it fetches is built from the card and would
  otherwise be the way round the question.
- **Keeping a note repaints `#drill-notes` in place rather than
  re-rendering.** A `render()` in the drill takes the attempt you are looking
  at off the screen — and throws the conversation away with it.
- The sheet is where a note can be dropped again (*Forget this*). The lesson
  prints them and otherwise keeps out of the way.

## Sobre mí: cards the app writes about Deb

Every other card arrives already written — content.js, or something typed into
Add. These are written *about her*, from an interview held entirely in English,
and they are the answer to "AI-generated content from life context".

- **Why an interview and not a text box.** You don't know what is worth saying
  about yourself until something asks. A blank box captioned "tell us about
  you" gets a blank box back; a question about where you live gets an answer,
  and the answer suggests the next question. The box was the cheaper build and
  it would not have worked.
- **English throughout, and that is the point.** Deb cannot describe her own
  life in Spanish yet — that is the thing the unit is being built to fix.
  `lang="en-US"` on the answer box so the iOS keyboard's dictation types the
  right language into it.
- **What comes out is ordinary cards of hers.** They drill, star, score, level
  up, export, edit and delete exactly like a card from Add, and nothing
  downstream of `library.addPhrase` knows where they came from. `ABOUT_DECK`
  is a name they carry in `deck` and nothing more; the one thing it buys is a
  unit of their own on the path. Resist giving them a flag — the moment they
  are a special *kind* of phrase, every list in the app has to learn about them.
- **The workshop node breaks a rule on purpose.** Every other node on the path
  drills; this one opens the interview, because the interview is the only way
  cards get into the unit. It is also the only node that shows *before its unit
  has anything in it* — "the first time you open it, it asks about you" needs
  something to open. With no card assistant configured the whole unit stays
  away, since it could never hold anything.
- **Two endpoints, not one, and for the established reason.** `/interview` asks
  the next question, `/about-cards` turns the transcript into three to five
  cards. Writing five cards is the big slow call and asking one question is
  not, so they have to be able to fail separately — the same argument that
  moved replies off `/complete-card`. **Both are additive on the Worker, which
  lives in Xerra's repo: `/complete-card`, `/chat` and `/replies` are
  unchanged, so nothing here required a Worker edit.**
- **The transcript is persisted; the card chat's history is not.** That is the
  whole difference between `aboutMe` in store.js and `cardChatPanel`'s local
  array. A card chat is a study aside that dies with the panel. This one is the
  material the cards are built from, so it has to survive a lesson, a reload
  and the weekly reinstall — and it is what stops the assistant asking about
  her job twice. It rides in export/import with the phrases.
- **A question that arrives after she has left is still saved.** `nextQuestion`
  writes the reply to the transcript whether or not the page is still on
  screen, and only the repaint is guarded. The guard is `log.isConnected`, not
  a lookup by id: a `render()` puts a *new* log in the document, so an id
  lookup succeeds while the handles in the closure are stale, and the spinner
  gets painted onto a detached node.
- **`interviewPayload` caps are load-bearing, not cosmetic.** 16 turns at 800
  characters plus 40 existing translations at 120 is what fits under the
  Worker's 24k body cap, which is checked on the raw request *before* its
  validator runs — go over and the whole call is rejected with no way to tell
  why.
- **No review step before saving, unlike Add.** There is no half-remembered
  phrase being corrected here, so there is nothing to check the assistant's
  reading against — and approving five cards one at a time would be the longest
  screen in the app. A wrong one is edited or deleted from the phrase sheet.
- **Duplicates are dropped client-side as well as discouraged in the prompt.**
  A model asked twice about the same life will eventually write the same
  sentence; `normaliseSentence` already ignores case, accents and punctuation,
  so "Vivo en Madrid." and "vivo en madrid" are one card.
- **Clearing the interview is armed, and leaves the cards alone.** It is the
  only way back from a conversation that went somewhere she didn't mean. The
  cards it already wrote are ordinary cards; deleting those is the phrase
  sheet's job. The button appears the moment there is a transcript rather than
  on the next full render — Xerra still has that gap, and it is worth porting
  back.

Xerra has all of this except the last point, in the same shape. Keep them in
step; the divergences that are deliberate are the deck-vs-unit shape (it has a
deck list, this has a path) and the Spanish name.

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

With the assistant stubbed (Playwright's `page.route` over the Worker's paths),
also worth asserting. For replies: `#drill-get-replies` is offered on a card
without them and absent while a level-two question stands, a successful fetch
paints `.drill-replies` with working `[data-say]` buttons, `#p-get-replies` on
the sheet removes itself once they land, and the Add review shows them without
Save ever having waited. For the chat: `#drill-chat` is there at level one and
absent while a question stands, `.chat-keep` puts a `.kept-note` under the card
and flips to `Kept on the card ✓`, and `Forget this` on the sheet removes it.
For Sobre mí: `#about-open` is on the path before the unit has cards and the
whole unit is absent with no assistant configured, opening it fires exactly one
`/interview` by itself, `#about-make` is disabled until a learner turn exists,
a batch containing a punctuation-only repeat adds one fewer than it returned,
the made cards are ordinary phrases with `deck === "Sobre mí"` that appear as
`[data-lesson^="about-"]` on the path, the transcript survives a reload without
a second `/interview`, and `#about-reset` takes two taps and leaves the cards
alone. For the version panel: `#s-running` and `#s-installed` agree after a
clean install. Two smoke scripts covering all of that live in the session
scratchpad rather than the repo — there's no test runner here on purpose.

Anything touching Azure still can't be covered — no key in the repo, ever.

Deployment is GitHub Pages from `main`/`docs`. All paths are relative, so it
works from a subpath. Bump **both** `VERSION`s (`sw.js` and `js/version.js`)
when shipping changes or the phone will keep the old build — and Settings will
tell you which one you forgot.

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

### Still sitting in Xerra, not ported

Found while pulling replies, the drill chat, Sobre mí and the version panel
across. None of them are started here:

- **`audio.js`'s analysis half.** Xerra rewrote `speechBounds`, `trimSilence`
  and `analyse`'s duration: one clip-derived threshold read from the quietest
  frames drives the picture, the sound *and* the pacing note. Here all three
  still use the old fixed 0.015 RMS scan, which silently stops trimming
  anything in a room with a fan in it (`autoGainControl` is off) — and the
  pacing note measures the untrimmed clip, so a take 1.07× the model's length
  can read as 2.2× and scold Deb for the pause before she started talking.
  This is the most worthwhile of the four. Check it numerically with synthetic
  WAVs, not by recording in a quiet room — a quiet room is the case the old
  scan already handled.
- **The score is your weakest word.** Xerra's `attemptScore` returns the lowest
  word score in the attempt (an `Omission` counting as zero) rather than any of
  Azure's aggregates, all of which are generous. Here `a.overall` is still the
  number everywhere. Bringing it in step is `attemptScore` plus the three
  constants (`PASS_GREAT`, `PASS_OK`, `RECALL_PASS`) — and it makes every band
  meaningfully harder, so it's a decision, not a fix.
- **The Add review's preview line and Undo.** Xerra's review plays the card
  aloud before you save it, spells out the way back to the composer fields, and
  has an Undo that withdraws the whole completion and puts the raw three inputs
  back. Deb's review still only reads.
- **The editor's AI rebuild refetching replies.** Handled here in the cheap
  direction: `wireEditorAI` reports whether the card in the boxes is the
  assistant's rewrite, and Save drops the replies if it is, so the card offers
  *What might they say back?* again. Xerra fetches a replacement set instead
  and lets Undo restore the originals — better, and more moving parts.
