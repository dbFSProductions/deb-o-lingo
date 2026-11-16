// The config that split Deb-o-lingo's app.js at v62. See PORTING.md in the
// listen-record-learn repository (tools/split-app/) for the method, and
// xerra.config.js there for the format.
//
// RANGES is read in file order. Each entry says "from the statement that
// declares this name, everything belongs to this module" until the next
// marker. A marker starting with @ matches a statement with no name by the
// text it starts with. OVERRIDE moves single names out of the range they fall
// in. HEAD is the one-line comment written at the top of each module.
const RANGES = [
  ['view','core'],['repliesBlock','replies'],['sayAloud','core'],['fetchReplies','replies'],
  ['pictureBlock','pictures'],['notesBlock','ask'],['stripTrailingStop','core'],['chatContext','ask'],['shuffle','core'],
  ['@view.addEventListener("click"','app'],['stopEverything','core'],['render','app'],
  ['OWN_UNIT_ID','path'],['interviewPayload','about'],['startLesson','drill'],['typedWords','quiet'],
  ['dropFromQueue','drill'],['typeBox','quiet'],['quitLesson','drill'],
  ['renderComparison','score'],['renderComplete','drill'],['drawCanvases','score'],
  ['renderAddWord','add'],['renderQuick','quick'],['renderPhrases','phrases'],
  ['SINGLE_WORD_SITUATION','add'],['PICTURE_BRIEF','pictures'],['wireEditorAI','phrases'],['renderAdd','add'],
  ['normaliseSentence','core'],['cardChatPanel','ask'],['composerField','add'],['renderSettings','settings'],
  ['STUDY_TICK_MS','prizes'],['startMatch','match'],['PLAY_SVG','story-page'],['parrotSVG','core'],
  ['@settings.load()','app'],
];
const OVERRIDE = { goHome:'app', PLAY_SVG:'core', noVoice:'core' };
const HEAD = {
  app:'Deb-o-lingo — the entry point: boot, the render dispatcher, goHome and the one delegated listener on the view.',
  core:'What every page shares: the DOM handles, `state`, small helpers, sheets, sayAloud, the home link and the icons. Imports no page module — keep it that way.',
  replies:'"What might they say back?": the replies block under a card, fetching them, and keeping one as a card.',
  pictures:'The keyword mnemonic: the picture block, the gender cue and field, drawings (IndexedDB), and the prompts that invent or re-imagine a scene.',
  ask:'The ask panel (`cardChatPanel`) the drill, the phrase sheet and the Add review share, and the notes kept from it.',
  path:'The home tiles and the path: units, sections, lessons, and the nodes at the end of the course.',
  about:'Sobre mí: the interview and the cards it writes.',
  drill:'The drill: starting a lesson or a practice queue, loading a card, the card itself, level two, the past-tense gate, recording, the banner and the lesson\'s end.',
  quiet:'Quiet mode: the box you type the answer into and how a typed answer is marked.',
  score:'After an attempt: the comparison, the score card, and the waveform and pitch canvases.',
  add:'Add a word and Add a card.',
  quick:'Quick: one box, one button, the phrase.',
  phrases:'All Phrases, the phrase sheet, and the editor with its AI rebuild.',
  settings:'Settings, the version panel and the storage line.',
  prizes:'Prizes: the study clock, what has been won, the celebration overlay and the Prizes page.',
  match:'Match: the pairs game.',
  'story-page':'Stories: the list, and a story with its questions.',
};

module.exports = { RANGES, OVERRIDE, HEAD };
