// Build, the sentence game, and the home page around it. The frames are read
// as data first — every frame × noun is made into its sentence and printed
// with BUILD_PRINT=1, so the Spanish can be read by eye before a merge. Then a
// round is played: a wrong order shakes and counts, Show me appears after
// two, a right one is said by the (fake) Azure, a finished round is tallied,
// and the home page has Review as a strip under the week and Build in its
// square. Azure is the fake SDK from lib.js with a synthesiser that writes
// down what it was asked to say.
const path = require("path");
const { open, fakeAzure, tally, STORE } = require("./lib.js");
const { ok, done } = tally("build");

const recordingAzure = `(${fakeAzure})();
  window.SpeechSDK.SpeechSynthesizer = function () {
    this.close = () => {};
    const said = (t, bad) => { (window.__sdk.said ||= []).push(String(t)); bad("no synthesis in the checks"); };
    this.speakTextAsync = (t, ok, bad) => said(t, bad);
    this.speakSsmlAsync = (t, ok, bad) => said(t, bad);
  };`;

(async () => {
  const { FRAMES, COURSE_PHRASES } = await import(path.resolve(__dirname, "../../docs/js/content.js"));
  const byId = new Map(COURSE_PHRASES.map((p) => [p.id, p]));
  const dupes = (list) => list.filter((x, i) => list.indexOf(x) !== i);
  ok(dupes(FRAMES.map((f) => f.id)).length === 0, "frame ids unique");
  const unknown = FRAMES.flatMap((f) => f.nouns.filter((id) => !byId.has(id)));
  ok(unknown.length === 0, `every frame noun is a course card: ${unknown}`);
  const notNoun = FRAMES.flatMap((f) => f.nouns.filter((id) => !/^(el|la) \S/.test(byId.get(id)?.text ?? "")));
  ok(notNoun.length === 0, `every frame noun starts with el or la: ${notNoun}`);
  ok(FRAMES.every((f) => f.tiles.filter((t) => t === "{np}").length === 1 && f.es.includes("{np}")), "each frame has one gap");

  const { browser, page, errors } = await open({ settings: { azureKey: "k" }, init: recordingAzure });
  const stored = (key) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || "null"), `${STORE}.${key}`);

  // Every sentence the frames can make, made by the app's own code.
  const all = await page.evaluate(async () => {
    const { FRAMES } = await import("./js/content.js");
    const { makeSentence, nounFor } = await import("./js/build.js");
    return FRAMES.flatMap((frame) => frame.nouns.map((id) => makeSentence(frame, nounFor(frame, id))));
  });
  if (process.env.BUILD_PRINT) for (const s of all) console.log(`  ${s.es.padEnd(38)} ${s.en}`);
  ok(all.every((s) => s.tiles.length === s.answer.length + 3), "every sentence has three decoys");
  ok(all.every((s) => new Set(s.tiles.map((t) => t.text)).size === s.tiles.length), "no two tiles in a tray say the same");
  ok(all.every((s) => !/[¿?¡!.,]/.test(s.tiles.map((t) => t.text).join(" "))), "no punctuation on the tiles");
  const pie = all.find((s) => s.frameId === "frame-duele" && s.nounId === "palabras-22-4");
  ok(pie?.es === "Me duele el pie." && pie.en === "My foot hurts.", `Me duele el pie / My foot hurts: ${pie?.es} / ${pie?.en}`);
  const medico = all.find((s) => s.frameId === "frame-voy" && s.nounId === "palabras-17-1");
  ok(medico?.es === "Voy al médico." && medico.tiles.some((t) => t.text === "a la"), `Voy al médico, with a la as the decoy: ${medico?.es}`);
  const paraguas = all.find((s) => s.frameId === "frame-necesito" && s.nounId === "palabras-23-3");
  ok(paraguas?.en === "I need an umbrella." && paraguas.tiles.some((t) => t.text === "una"), `I need an umbrella, una as the decoy: ${paraguas?.en}`);
  const pone = all.find((s) => s.frameId === "frame-pone");
  ok(pone?.answer[0] === "me pone" && pone.answer.at(-1) === "por favor" && /^¿Me pone un[a]? .*, por favor\?$/.test(pone.es), `¿Me pone …, por favor?: ${pone?.es}`);

  // Home: Review is a strip under the week, Build is a square, still eight.
  await page.waitForSelector(".tile");
  ok((await page.$$(".tile")).length === 8, "eight squares");
  ok(!(await page.$(".tile[data-review]")), "Review is not a square any more");
  ok(await page.$(".week-strip + .review-strip[data-review]"), "Review is a strip straight under the week");
  ok(/Nothing due today/.test(await page.textContent("[data-review]")), "Review says nothing is due on a fresh start");
  const order = await page.$$eval(".tile", (els) => els.map((e) => e.querySelector(".tile-title").textContent));
  ok(order[6] === "Build", `Build is the seventh square, where Review was: ${order}`);
  const tops = await page.$$eval(".tile[data-open-build], .review-strip, .week-strip:not(.review-strip)", (els) => els.map((e) => [e.className, e.getBoundingClientRect().height]));
  const strip = tops.find(([c]) => c.includes("review-strip"))[1];
  const square = tops.find(([c]) => c.includes("tile"))[1];
  ok(strip < square * 0.7, `the strip is about half a square high: ${strip} vs ${square}`);

  // A round.
  await page.click("[data-open-build]");
  await page.waitForSelector(".build-prompt");
  ok((await page.textContent(".match-bar")).includes("of 6"), "a round is six sentences");
  const game = () => page.evaluate(async () => {
    const { state } = await import("./js/core.js");
    const g = state.build;
    return { index: g.index, misses: g.misses, item: g.items[g.index], nouns: g.items.map((i) => i.nounId), finished: Boolean(g.finishedAt) };
  });
  let g = await game();
  ok(new Set(g.nouns).size === 6, "no noun twice in a round");
  ok(await page.$("#build-check[disabled]"), "Check waits for a tile");

  // Wrong: the answer backwards (or a decoy first) — shakes, counts, twice offers Show me.
  const tap = (text, where = "tray") =>
    page.evaluate(({ text, where }) => {
      const el = [...document.querySelectorAll(`.build-tile[data-where="${where}"]`)].find((b) => b.textContent === text);
      el.click();
    }, { text, where });
  const wrong = [...g.item.answer].reverse();
  for (const t of wrong) await tap(t);
  ok((await page.$$('.build-line .build-tile')).length === wrong.length, "tapped tiles go onto the line");
  ok((await page.$$(".build-tray .build-gap")).length === wrong.length, "and leave their outline in the tray");
  await tap(wrong[0], "line");
  ok((await page.$$('.build-line .build-tile')).length === wrong.length - 1, "a tile on the line goes back on a tap");
  await tap(wrong[0]);
  await page.click("#build-check");
  ok(await page.$(".build-line .build-tile.miss"), "a wrong order shakes");
  ok((await game()).misses === 1 && !(await page.$("#build-show")), "one miss, no Show me yet");
  await page.click("#build-check");
  ok(await page.$("#build-show"), "two misses offer Show me");
  await page.click("#build-show");
  await page.waitForSelector(".build-said");
  ok((await page.textContent(".build-said")) === g.item.es, `Show me shows the sentence: ${g.item.es}`);
  ok((await game()).misses === 3, "Show me counts as a miss");
  ok((await stored("awards")).build.total === 0, "a shown sentence is not counted as built");

  // The rest, right first time; each said as it lands.
  for (let n = 1; n < 6; n++) {
    await page.click("#build-next");
    await page.waitForSelector(".build-prompt");
    g = await game();
    ok(g.index === n, `on to sentence ${n + 1}`);
    for (const t of g.item.answer) await tap(t);
    await page.evaluate(() => { window.__sdk.said = []; });
    await page.click("#build-check");
    await page.waitForSelector(".build-said");
    await page.waitForFunction(() => (window.__sdk.said || []).length > 0);
    ok((await page.evaluate(() => window.__sdk.said.join("|"))).includes(g.item.es), `said aloud: ${g.item.es}`);
  }
  ok((await page.textContent("#build-total")) === "5", "the bar's total follows what is built");
  await page.click("#build-next");
  await page.waitForSelector("#build-again");
  ok(/3 misses/.test(await page.textContent(".match-result")), "the round reports its misses");
  const awards = (await stored("awards")).build;
  ok(awards.total === 5 && awards.rounds === 1 && awards.perfect === 0, `tallied: ${JSON.stringify(awards)}`);
  const attempts = await stored("attempts");
  ok(!attempts || (Array.isArray(attempts) ? attempts.length === 0 : Object.keys(attempts).length === 0), "no attempt written");

  // Home again: the square counts what was built; export carries it.
  await page.click("[data-go-home]");
  await page.waitForSelector("[data-open-build]");
  ok(/5 sentences built/.test(await page.textContent("[data-open-build]")), "the square says five built");
  await done(browser, errors);
})();
