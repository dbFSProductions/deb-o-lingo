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

  // Every hint, made by the app's own code on a sentence built for it.
  const hints = await page.evaluate(async () => {
    const { FRAMES } = await import("./js/content.js");
    const { makeSentence, nounFor, hintFor, marksFor } = await import("./js/build.js");
    const make = (f, id) => { const frame = FRAMES.find((x) => x.id === f); return makeSentence(frame, nounFor(frame, id)); };
    const silla = make("frame-necesito", "palabras-2-3");
    const medico = make("frame-voy", "palabras-17-1");
    const farmacia = make("frame-voy", "palabras-16-5");
    const cabeza = make("frame-duele", "palabras-22-1");
    const strayNoun = Object.keys(silla.decoyOf).find((t) => silla.decoyOf[t].kind === "noun");
    const strayOpener = Object.keys(silla.decoyOf).find((t) => silla.decoyOf[t].kind === "opener");
    const text = (html) => html.replace(/<[^>]+>/g, "");
    return {
      indef: text(hintFor(silla, ["necesito", "un", "silla"], 1)),
      al: text(hintFor(medico, ["voy", "a la", "médico"], 1)),
      ala: text(hintFor(farmacia, ["voy", "al", "farmacia"], 1)),
      def: text(hintFor(cabeza, ["me duele", "el", "cabeza"], 1)),
      noun: text(hintFor(silla, ["necesito", "una", strayNoun], 1)),
      both: text(hintFor(silla, ["necesito", "un", strayNoun], 1)),
      bothOpener: text(hintFor(silla, [strayOpener, "un", "silla"], 1)),
      opener: text(hintFor(silla, [strayOpener, "una", "silla"], 1)),
      short: text(hintFor(silla, ["necesito", "silla"], 1)),
      swapped: text(hintFor(silla, ["necesito", "silla", "una"], 1)),
      order1: text(hintFor(silla, ["una", "silla", "necesito"], 1)),
      order2: text(hintFor(silla, ["una", "silla", "necesito"], 2)),
      marks: marksFor(silla, ["una", "necesito", strayNoun]).join(" "),
    };
  });
  ok(hints.indef === "silla is a la word — so una, not un.", `wrong un: ${hints.indef}`);
  ok(hints.al === "médico is an el word, and a + el squeezes into al.", `wrong a la: ${hints.al}`);
  ok(hints.ala === "farmacia is a la word — a la, not al.", `wrong al: ${hints.ala}`);
  ok(hints.def === "cabeza is a la word — la cabeza.", `wrong el: ${hints.def}`);
  ok(/^\S+ is the .+ — this one wants the chair\.$/.test(hints.noun), `a stray noun: ${hints.noun}`);
  ok(hints.both === hints.noun.replace(/^/, "") && /wants the chair/.test(hints.both), `wrong noun and wrong article: the noun first: ${hints.both}`);
  ok(hints.bothOpener === "silla is a la word — so una, not un.", `wrong article before a stray opening: ${hints.bothOpener}`);
  ok(/^\S+( \S+)? is “.+” — this sentence starts another way\.$/.test(hints.opener), `a stray opener: ${hints.opener}`);
  ok(hints.short === "One word short — there's still one in the tray for this.", `a word short: ${hints.short}`);
  ok(hints.swapped === "The little word goes first: una silla.", `noun before article: ${hints.swapped}`);
  ok(hints.order1 === "All the right words — just the order.", `order, first miss: ${hints.order1}`);
  ok(hints.order2 === "Right words. Start with necesito.", `order, second miss: ${hints.order2}`);
  ok(hints.marks === "place place out", `marks: right word wrong place, and a stray: ${hints.marks}`);

  // Placing a tile says it; taking it back says nothing.
  const tap = (text, where = "tray") =>
    page.evaluate(({ text, where }) => {
      const el = [...document.querySelectorAll(`.build-tile[data-where="${where}"]`)].find((b) => b.textContent === text);
      el.click();
    }, { text, where });
  const said = () => page.evaluate(() => (window.__sdk.said || []).slice());
  const settle = () => page.waitForFunction(() => ![...document.querySelectorAll(".build-tile")].some((b) => b.dataset.busy === "1"));
  await page.evaluate(() => { window.__sdk.said = []; });
  const first = g.item.answer[0];
  await tap(first);
  await page.waitForFunction((t) => (window.__sdk.said || []).includes(t), first);
  ok(true, `placing "${first}" says it`);
  await settle();
  const n = (await said()).length;
  await tap(first, "line");
  await page.waitForTimeout(150);
  ok((await said()).length === n, "taking it back says nothing");
  ok((await page.$$(".build-tray .build-gap")).length === 0, "and it is back in the tray");

  // The wrong article, in the right order: marked, hinted, and kept until a tile moves.
  const withWrong = g.item.answer.map((t) => (t === g.item.article ? g.item.wrong : t));
  for (const t of withWrong) await tap(t);
  ok((await page.$$(".build-line .build-tile")).length === withWrong.length, "tapped tiles go onto the line");
  ok((await page.$$(".build-tray .build-gap")).length === withWrong.length, "and leave their outline in the tray");
  await page.click("#build-check");
  const marks = await page.$$eval(".build-line .build-tile", (els) => els.map((e) => (e.className.match(/mark-(\w+)/) || [])[1]));
  ok(marks.join(" ") === withWrong.map((t) => (t === g.item.wrong ? "out" : "ok")).join(" "), `the wrong article is marked out, the rest right: ${marks}`);
  ok(await page.$(".build-line .build-tile.miss"), "a wrong Check shakes");
  const hint1 = await page.textContent(".build-hint");
  ok(hint1.includes(g.item.noun) && (await page.isVisible(".build-hint")), `the hint names the word: ${hint1}`);
  ok(await page.$("#build-check[disabled]"), "Check waits until something changes");
  await page.waitForTimeout(600);
  ok(await page.$(".build-line .build-tile.mark-out"), "the marks stay after the shake");
  ok((await game()).misses === 1 && !(await page.$("#build-show")), "one miss, no Show me yet");

  // Swap the article: marks and hint clear; it lands last, so the order is wrong.
  await tap(g.item.wrong, "line");
  ok(!(await page.$(".build-line [class*=mark-]")) && !(await page.isVisible(".build-hint")), "moving a tile clears the marks and the hint");
  await tap(g.item.article);
  await page.click("#build-check");
  const hint2 = await page.textContent(".build-hint");
  ok(/goes first|Start with/.test(hint2), `out of order: ${hint2}`);
  ok(await page.$(".build-line .build-tile.mark-place"), "a right word in the wrong place is marked as such");
  ok(await page.$("#build-show"), "two misses offer Show me");
  await page.click("#build-show");
  await page.waitForSelector(".build-said");
  ok((await page.textContent(".build-said")) === g.item.es, `Show me shows the sentence: ${g.item.es}`);
  ok((await page.textContent(".build-why")).includes(g.item.noun), "having slipped on the article, the reason stays beside the answer");
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
