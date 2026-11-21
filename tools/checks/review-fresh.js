// Review never deals the same ten twice running (from Xerra's v135). A card
// shown in Review and not said (typed in quiet mode, or passed with Next) is
// put aside for three days; saying it takes it back out. A session short of
// ten is topped up with cards already met, then new ones.
const { open, stubWorker, fakeAzure, tally } = require("./lib.js");
const { ok, done } = tally("review-fresh");

(async () => {
  const { browser, page, errors } = await open({
    settings: { azureKey: "k" },
    init: fakeAzure,
    args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"],
  });
  await stubWorker(page);

  /* Plant attempts: `due` cards due (good once, days ago), `met` cards said
     well three days running up to yesterday (met, not due), the rest never
     tried. Shape-gated cards are left out so every card opens straight on
     the drill. */
  const plant = (due, met) => page.evaluate(async ([due, met]) => {
    const { library, aspectOf } = await import("/js/store.js");
    const cards = library.drillable().filter((p) => !aspectOf(p));
    const day = 86400000;
    const attempt = (p, ago, i) => ({ id: `p-${p.id}-${i}`, phraseID: p.id, recordedAt: new Date(Date.now() - ago * day).toISOString(), duration: 1, mode: "listen", overall: 90, words: [], engine: "Fake" });
    const dueCards = cards.slice(0, due);
    const metCards = cards.slice(due, due + met);
    library.attempts = [
      ...dueCards.map((p, i) => attempt(p, 20 - i, i)),
      ...metCards.flatMap((p, i) => [attempt(p, 3, `${i}a`), attempt(p, 2, `${i}b`), attempt(p, 1, `${i}c`)]),
    ];
    library.saveAttempts();
    // Gated cards are put aside so a top-up never deals one.
    const later = new Date(Date.now() + 30 * day).toISOString().slice(0, 10);
    library.loadAside(Object.fromEntries(library.drillable().filter((p) => aspectOf(p)).map((p) => [p.id, later])));
    (await import("/js/app.js")).render();
    return { due: dueCards.map((p) => p.id), met: metCards.map((p) => p.id) };
  }, [due, met]);
  const queue = () => page.evaluate(async () => (await import("/js/core.js")).state.lesson.queue.map((p) => p.id));
  const current = () => page.evaluate(async () => { const { state } = await import("/js/core.js"); return state.lesson.queue[state.lesson.index].id; });
  const dueNow = (daysAhead = 0) => page.evaluate(async (n) => {
    const { library } = await import("/js/store.js");
    return library.due(Date.now() + n * 86400000).map((p) => p.id);
  }, daysAhead);
  const tile = async () => (await page.textContent("[data-review]")).replace(/\s+/g, " ");

  await page.waitForSelector(".tile");

  // 1. Twelve due. A session typed and skipped through does not come back.
  let g = await plant(12, 0);
  ok(/10 cards to review today · 2 more waiting/.test(await tile()), "twelve due: ten in the session, two waiting");
  await page.click("[data-review]");
  await page.waitForSelector("#next");
  const first = [];
  for (let i = 0; i < 10; i += 1) {
    await page.waitForSelector("#next");
    first.push(await current());
    if (i % 2 === 0) {
      await page.click("#quiet-toggle");
      await page.waitForSelector("#quiet-input");
      await page.fill("#quiet-input", "hola");
      await page.click("#quiet-check");
      await page.click("#quiet-toggle");
    }
    await page.click("#next");
  }
  await page.waitForSelector("#complete-continue");
  await page.click("#complete-continue");
  await page.waitForSelector("[data-review]");
  ok(first.length === 10 && new Set(first).size === 10, "the session was ten cards");
  const still = await dueNow();
  ok(first.every((id) => !still.includes(id)), "none of the ten typed or skipped is still due");
  ok((await dueNow(3)).filter((id) => first.includes(id)).length === 10, "they are back in three days");
  ok(/2 due today \+ 8 fresh/.test(await tile()), "the tile: the two waiting, topped up with eight fresh");
  await page.click("[data-review]");
  await page.waitForSelector("#next");
  const second = await queue();
  ok(second.length === 10 && second.every((id) => !first.includes(id)), "the next session is ten different cards");
  ok(g.due.slice(10).every((id) => second.includes(id)), "and the two still due are in it");

  // 2. A card said in Review is taken back out of the pile put aside.
  await page.click("#quit");
  await page.waitForSelector(".tile");
  g = await plant(3, 0);
  await page.click("[data-review]");
  await page.waitForSelector("#next");
  await page.waitForTimeout(1200);
  const said = await current();
  const isAside = (id) => page.evaluate(async (id) => (await import("/js/store.js")).library.isAside(id), id);
  ok(await isAside(said), "a card is put aside when it is shown");
  if (await page.$("#echo-show")) await page.click("#echo-show");
  await page.click("#record");
  await page.waitForSelector("#record.recording");
  await page.waitForTimeout(500);
  await page.click("#record");
  await page.waitForSelector(".dial-value");
  ok(!(await isAside(said)), "and taken back out when it is said");
  ok(!(await dueNow()).includes(said), "said today, it is not due again today");
  await page.waitForTimeout(300);
  while (await page.$("#prize-continue")) { await page.click("#prize-continue"); await page.waitForTimeout(150); }
  await page.click("#quit");
  await page.waitForSelector(".tile");

  // 3. The top-up: met cards first, then new ones.
  g = await plant(3, 5);
  const top = await page.evaluate(async () => (await import("/js/store.js")).library.reviewSession(10).map((p) => p.id));
  ok(top.length === 10, "three due make a session of ten");
  ok(g.due.every((id) => top.slice(0, 3).includes(id)), "the due cards come first");
  ok(g.met.every((id) => top.slice(3, 8).includes(id)), "then the five already met");
  ok(top.slice(8).every((id) => !g.due.includes(id) && !g.met.includes(id)), "then two never tried");

  // 4. Nothing due: the tile says so; the top-up does not invent a session.
  await plant(0, 4);
  ok(/Nothing due today/.test(await tile()), "nothing due: the tile says so");

  // 5. What is put aside rides in a backup.
  const round = await page.evaluate(async () => {
    const { library } = await import("/js/store.js");
    library.setAside(["x-card"]);
    const text = library.exportJSON();
    library.loadAside({});
    library.importJSON(text);
    return library.isAside("x-card");
  });
  ok(round, "put-aside cards survive export and import");

  await done(browser, errors);
})().catch((error) => { console.log("review-fresh: crashed —", error.message.split("\n").slice(0, 3).join(" ")); process.exit(1); });
