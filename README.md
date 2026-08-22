# Deb-o-lingo 🦜

A tiny personal Spanish trainer, made for exactly one student: Deb.

Five-minute lessons for real life — greeting the doorman, ordering coffee and
cava, tapas, *para llevar*, and holding your own at a market counter. You hear
a native voice, record yourself saying the same thing, and the app shows you
how close you got: side-by-side waveforms, an intonation comparison, and a
word-by-word pronunciation score.

It looks a little like a certain green owl on purpose, but there's no ads, no
gems, no guilt — and every phrase is here because Deb will actually say it this
week.

## Using it (Deb, this bit is for you)

1. Open the app's web address in **Safari** on your iPhone.
2. Tap the Share button → **Add to Home Screen**. Now it's an app.
3. Open it, go to **Settings**, and paste in the key Fin sent you
   (region stays `northeurope`). Tap **Save and test**.
4. Go to **Learn** and do the first lesson. That's it. One lesson a day at
   6:30 keeps the flame lit. 🔥

Nothing is locked. Every lesson on the path is open from day one — start at the
top if you like the order, or jump straight to the market if that's where
you're going this afternoon.

A few things worth knowing:

- **The microphone asks permission once** — say yes, it only records when you
  tap the big button.
- **Cards get harder once you know them.** Say a card well twice and it goes
  up to **level 2**: from then on the drill shows you only the English, and
  you have to come up with the Spanish yourself before it shows you the
  phrase. Trying to remember is the bit that makes it stick. There's a **Show
  me** button for when it's gone completely — no shame in it, the card just
  comes round again. If you'd rather not, Settings → *Level 2 — drill from
  memory* turns it off.
- **Skip is allowed.** If a phrase won't come out at 6:30am, hit SKIP and move
  on. Tomorrow it'll be in Repaso.
- **Repaso** (the dumbbell at the bottom of the path) mixes up everything —
  the whole course plus your own cards.
- **Star anything.** Tap the star on a phrase and it gathers into a Favourites
  node next to Repaso, for the handful that keep tripping you up.
- **The Phrases tab** is your phrasebook: every phrase in the app, with your
  best score and every recording. Search it — it looks inside the tips and the
  situations too, so "market" or "polite" finds things.
- **The Add tab** builds new cards for you. Type what you're trying to say, in
  Spanish or English or a mangled mix, and it comes back corrected with the
  meaning, when to use it, and what to listen for. You can ask it follow-up
  questions about any card ("why *me pone* and not *puedo tener*?"). Cards you
  save join **Lo tuyo** on the path.
- **Jot things down.** Leave the Spanish blank and just write the English —
  it'll sit under "needs the Spanish" until you or the Add tab fills it in.
- **Edit anything**, including the lessons that came with the app. If a tip
  doesn't help you, rewrite it; there's a Reset if you change your mind.
- **Let it rebuild the card for you.** Change *un cortado* to *un café solo*
  and tap **Rebuild the rest with AI** — the English, the situation, how it's
  used and the tip all get rewritten to match, so you don't have to. Nothing is
  saved until you tap Save, and there's an Undo if you don't like it.
- **Edit mid-lesson.** There's an EDIT at the top of the lesson bar for the
  card you've just heard and thought "I'd never say that".
- **Delete your own cards.** Open one from the Phrases tab and there's a
  Delete at the bottom — it asks twice, because it takes the recordings with
  it. Course cards stay put; edit them instead.
- Anything your doorman *actually* says that isn't in here — tell Fin, or just
  add it yourself on the Add tab.
- **Settings → Export** saves your progress to a file once in a while. iPhones
  sometimes clear a web app's storage if it's unused for a long time.

## What the scores mean

The score comes from Azure's pronunciation assessment — the same speech
recognition tech call centres use, pointed at your Spanish. 80+ means a native
would follow you without blinking. Tap a tinted word to see which *sound*
inside it needs work. The waveforms underneath show rhythm: if your bar chart
is much longer than the model's, you're leaving gaps between words that
Spanish doesn't have.

## For whoever maintains this

This is a sibling of [Xerra](https://github.com/dbFSProductions/listen-record-learn),
a Catalan pronunciation trainer. The audio and scoring core is ported from
there. See `CLAUDE.md` for working notes, and keep the two in sync when fixing
core bugs.

Run it locally:

```bash
cd docs && python3 -m http.server 8765
# open http://127.0.0.1:8765  (must be localhost — the mic needs a secure context)
```

No build step, no dependencies, vanilla ES modules. Deploys as a static site
(GitHub Pages, `main` branch, `/docs` folder).
