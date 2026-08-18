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

A few things worth knowing:

- **The microphone asks permission once** — say yes, it only records when you
  tap the big button.
- **Skip is allowed.** If a phrase won't come out at 6:30am, hit SKIP and move
  on. Tomorrow it'll be in Repaso.
- **Repaso** (the dumbbell at the bottom of the path) mixes up everything
  you've already learned.
- Anything your doorman *actually* says that isn't in here — tell Fin, or add
  it yourself on the **Phrases** tab. Added phrases show up in Repaso.
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
