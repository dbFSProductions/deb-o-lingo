# France (v72)

Asked for as "a tile of just very, very basic French" for a two-day trip:
please, thank you, hello, can I have a coffee. "Simplicity is key."

## What it is

A strip on the home page under Review ("Bonjour! French") opening one page:
fourteen phrases, each a button. Tap it and you hear it. Each row shows the
French, the English, and a rough respelling for an English speaker. Capitals
mark the stress, and "(n)" marks a nasal. Two tips go in the intro: say
*Bonjour* on walking in, and *un café* is an espresso.

## What it deliberately is not

- **Not course content.** The phrases live in `docs/js/france.js`, not
  `COURSE`. In `COURSE` they would leak into Review, Match, Build, All
  Phrases, prizes and every Worker call (all of which send `es-ES` /
  "Spanish (Spain)").
- **No recording or scoring, and nothing saved.** No attempts, so nothing
  touches the streak, Review or export/import.
- **Not a ninth square.** Eight squares are a full grid, and a ninth leaves a
  hole. A strip like Review's fits, and reads as temporary.

## The voice

`settings.azureVoice` is Spanish, and a Spanish voice reads French with a
Spanish accent. The page passes `speech.modelAudio` a *copy* of settings with
`fr-FR-DeniseNeural`. The audio cache is keyed on the voice, so the French
clips never collide with the Spanish ones, and `speech.js` (shared behaviour
with the sister apps) is untouched. With no Azure key it falls back to the
browser's fr-FR voice, then to `noVoice`.

## Offline

She'll be abroad, maybe with no data. With a key, opening the page fetches
every clip into IndexedDB one at a time, and the line at the bottom says when
all are saved. **Open the page once at home on wifi before the trip.**
Cached clips are served before the Azure SDK is loaded, so they play with no
signal. The one thing that removes them is Settings' clear-the-audio-cache
button, which empties the whole model cache, French included. After
pressing it, open the French page on wifi again.

## Removing it

Delete `docs/js/france.js`. Then remove its `SHELL` entry, the
`franceStrip()` call and function and the `FRENCH` import in `path.js`, the two
lines in `app.js`, the `.france-*` CSS and `tools/checks/france.js`.

## Checked

`tools/checks/france.js` runs headless with a fake Azure SDK and asserts:
- the strip is there and the eight squares are untouched;
- every phrase is marked `fr-FR`;
- the save-for-offline pass and a tap both ask for a `fr-FR-` voice with the
  right text;
- a failed save says to retry on wifi;
- nothing French reaches localStorage;
- with a synthesiser that succeeds, the page reaches "All saved" and a
  later tap makes no new Azure call (served from the cache);
- with no key, Azure is never asked.

Not tried: the real Azure French voice, and iOS Safari's fr-FR browser voice.

## v73: the strip takes itself away

Asked for the day it shipped: "set it to disappear from the front page in 72
hours". `FRANCE_UNTIL` in `france.js` is 2026-11-28 10:00 UTC, 72 hours
after the ask. After that, read off the phone's clock, `franceStrip()` draws
nothing. Only the strip goes. The page and its saved clips stay, so moving the
date later brings it back with nothing else to change. Done as a date in the
code rather than a later pull request that deletes it: it needs nobody to be
around on the day, and it can't half-happen. The check pins the clock the day
before for everything it does, then the day after to see the strip gone.
