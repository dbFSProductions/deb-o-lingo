// France: a dozen survival phrases for a two-day trip. Tap one, hear it.
//
// Deliberately apart from everything else. These are not course cards: no
// recording, no score, no attempts, no Review, no prizes, nothing saved. The
// Spanish machinery all assumes es-ES (the Worker calls, the focusNotes, the
// one Azure voice in Settings), and a short trip doesn't need any of it.
// The whole feature is this file, a strip on the home page and two lines in
// app.js, so it is as easy to take out again as it was to put in.
// `notes/france.md` has the reasoning.

import { settings } from "./store.js";
import { esc, homeLink, noVoice, player, state, stopEverything, toast, view } from "./core.js";
import { speech, browserSpeech } from "./speech.js";
import { render } from "./app.js";

const LANGUAGE = "fr-FR";
/* Settings holds one Azure voice, and it is Spanish: a Spanish voice reading
   French reads it with a Spanish accent. So this page passes a copy of the
   settings with a French voice in it. The audio cache is keyed on the voice,
   so these never collide with the Spanish clips. */
const VOICE = "fr-FR-DeniseNeural";
const frenchSettings = () => ({ ...settings, azureVoice: VOICE });

/* `say` is a rough respelling for an English mouth. Capitals are the
   stressed bit (French leans on the end); "(n)" is a nasal n — start it,
   don't finish it. */
export const FRENCH = [
  { fr: "Bonjour", en: "Hello", say: "bo(n)-ZHOOR" },
  { fr: "Bonsoir", en: "Good evening", say: "bo(n)-SWAHR" },
  { fr: "S'il vous plaît", en: "Please", say: "seel voo PLAY" },
  { fr: "Merci", en: "Thank you", say: "mair-SEE" },
  { fr: "Merci beaucoup", en: "Thank you very much", say: "mair-SEE boh-KOO" },
  { fr: "Oui. Non.", en: "Yes. No.", say: "WEE. NO(n)." },
  { fr: "Excusez-moi", en: "Excuse me", say: "ex-kew-zay MWAH" },
  { fr: "Un café, s'il vous plaît", en: "A coffee, please", say: "uh(n) ka-FAY, seel voo PLAY" },
  { fr: "Un café crème, s'il vous plaît", en: "A white coffee, please", say: "uh(n) ka-fay KREM, seel voo PLAY" },
  { fr: "L'addition, s'il vous plaît", en: "The bill, please", say: "la-dee-SYO(n), seel voo PLAY" },
  { fr: "Où sont les toilettes ?", en: "Where are the toilets?", say: "oo so(n) lay twa-LET" },
  { fr: "Parlez-vous anglais ?", en: "Do you speak English?", say: "par-lay voo o(n)-GLAY" },
  { fr: "Je ne parle pas français", en: "I don't speak French", say: "zhuh nuh parl pah fro(n)-SAY" },
  { fr: "Au revoir", en: "Goodbye", say: "oh ruh-VWAHR" },
];

export function openFrance() {
  stopEverything();
  state.tab = "france";
  render();
}

/* Is every clip already on the phone? Only asked once, per page visit, and
   only with an Azure key: the browser voice needs nothing fetched. */
let saved = null;

export function renderFrance() {
  view.innerHTML = `
    <header class="home-head section-head">
      <div class="wordmark">Bonjour!</div>
      ${homeLink()}
    </header>
    <p class="muted section-intro">Tap a phrase to hear it. Say <strong>Bonjour</strong> whenever you walk in somewhere — in France it matters. And <em>un café</em> is a little black espresso; ask for a <em>café crème</em> if you want milk.</p>
    <div class="rows rows-spaced">
      ${FRENCH.map(
        (p, i) => `
        <button class="row striped france-row" style="--hue:var(--blue)" data-french="${i}">
          <span class="france-speaker" aria-hidden="true">🔊</span>
          <span class="row-main">
            <span class="row-title france-fr" lang="${LANGUAGE}">${esc(p.fr)}</span>
            <span class="france-en">${esc(p.en)}</span>
            <span class="france-say">${esc(p.say)}</span>
          </span>
        </button>`
      ).join("")}
    </div>
    <p class="muted france-offline" id="france-offline">${offlineLine()}</p>`;

  view.querySelectorAll("[data-french]").forEach((button) =>
    button.addEventListener("click", () => say(button, FRENCH[Number(button.dataset.french)].fr))
  );
  if (settings.hasAzure && saved === null) saveForOffline();
}

function offlineLine() {
  if (!settings.hasAzure) return "Using the phone's own French voice.";
  if (saved === null) return "Saving the voices for when there's no signal…";
  if (saved.done < saved.of) return `Saving the voices for when there's no signal… ${saved.done} of ${saved.of}`;
  return "All saved — this page works with no signal.";
}

/* Fetch every clip once, so in France the page needs no data at all. One at
   a time, as `prefetch` does; a tap meanwhile just asks for its own. */
async function saveForOffline() {
  const phrases = FRENCH.map((p) => ({ text: p.fr, language: LANGUAGE }));
  saved = { done: 0, of: phrases.length };
  const paint = () => {
    const line = document.getElementById("france-offline");
    if (line) line.textContent = offlineLine();
  };
  for (const phrase of phrases) {
    if (await speech.modelAudio(phrase, frenchSettings())) saved.done++;
    paint();
  }
  // Something failed (no signal, a bad key): try again on the next visit.
  if (saved.done < saved.of) {
    const line = document.getElementById("france-offline");
    if (line) line.textContent = "Couldn't save all the voices — open this page again on wifi.";
    saved = null;
  }
}

async function say(button, text) {
  player.stop();
  browserSpeech.stop();
  if (button.dataset.busy === "1") return;
  button.dataset.busy = "1";
  button.classList.add("busy");
  try {
    const blob = await speech.modelAudio({ text, language: LANGUAGE }, frenchSettings());
    if (blob) await player.play(blob);
    else if (browserSpeech.available(LANGUAGE)) browserSpeech.speak(text, LANGUAGE, { onSilent: noVoice });
    else noVoice();
  } catch {
    toast("Couldn't play that.");
  } finally {
    button.dataset.busy = "0";
    button.classList.remove("busy");
  }
}
