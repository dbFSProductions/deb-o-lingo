// The hand-written course, read as data: what a new batch of cards must not
// break. Ids are referenced by saved attempts, Match refuses two cards with
// the same text in a round, and a Palabras word without its sound, picture
// and focusNote is a card with half its method missing. Then the Words tile
// is opened to see the count it shows matches the course.
const path = require("path");
const { open, tally } = require("./lib.js");
const { ok, done } = tally("content");

(async () => {
  const { COURSE, COURSE_PHRASES, STORIES } = await import(path.resolve(__dirname, "../../docs/js/content.js"));
  const dupes = (list) => list.filter((x, i) => list.indexOf(x) !== i);

  ok(dupes(COURSE_PHRASES.map((p) => p.id)).length === 0, `phrase ids unique: ${dupes(COURSE_PHRASES.map((p) => p.id))}`);
  ok(dupes(COURSE_PHRASES.map((p) => p.text)).length === 0, `phrase texts unique: ${dupes(COURSE_PHRASES.map((p) => p.text))}`);
  const lessonIds = COURSE.flatMap((u) => u.lessons.map((l) => l.id));
  ok(dupes(lessonIds).length === 0, `lesson ids unique: ${dupes(lessonIds)}`);
  ok(dupes(STORIES.map((s) => s.id)).length === 0, "story ids unique");
  const missing = COURSE_PHRASES.filter((p) => !p.text || !p.translation || !p.focusNote);
  ok(missing.length === 0, `every card has text, translation, focusNote: ${missing.map((p) => p.id)}`);

  const palabras = COURSE.find((u) => u.id === "palabras");
  const words = palabras.lessons.flatMap((l) => l.phrases);
  const bare = words.filter((p) => !p.sounds || !p.picture);
  ok(bare.length === 0, `every Palabras word has sounds and picture: ${bare.map((p) => p.id)}`);
  const sentence = words.filter((p) => /[.!]$/.test(p.text));
  ok(sentence.length === 0, `no Palabras word ends in a stop: ${sentence.map((p) => p.id)}`);

  const { browser, page, errors } = await open();
  await page.waitForSelector(".tile");
  const tile = await page.textContent('[data-section="words"]');
  ok(tile.includes(`${words.length} words`), `Words tile says ${words.length} words: ${tile.trim()}`);
  await done(browser, errors);
})();
