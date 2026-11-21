// Review, ported from Xerra's v131 and v133. The ladder (library.reviewOf):
// a good day climbs a rung, a miss day steps back two rather than to the
// bottom, three miss days running rest a card a week. The session: the ten
// most overdue, shuffled. The tasks: a due card is asked as its level has it,
// by ear ("echo") or from one of its replies ("answer"), with Math.random
// steered so each can be asked for. Azure is the fake; the microphone is
// Chromium's. Set SHOTS to a folder to keep screenshots of the two new cards.
const { open, stubWorker, fakeAzure, tally, STORE } = require("./lib.js");
const { ok, done } = tally("review");

(async () => {
  const { browser, page, errors } = await open({
    settings: { azureKey: "k" },
    init: fakeAzure,
    args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"],
  });
  await stubWorker(page);
  const shot = async (name) => { if (process.env.SHOTS) await page.screenshot({ path: `${process.env.SHOTS}/${name}.png` }); };
  const attempts = () => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || "[]"), `${STORE}.attempts`);
  await page.waitForSelector(".tile");

  // ---------------------------------------------------------- the ladder
  /* One history for one made-up id, read back. Each entry is [days ago,
     score]; null is an unscored go, which counts as good. At noon, so no
     day boundary is near. */
  const review = (history) => page.evaluate(async (history) => {
    const { library } = await import("/js/store.js");
    const noon = new Date();
    noon.setHours(12, 0, 0, 0);
    const day = 86400000;
    const saved = library.attempts;
    library.attempts = history.map(([ago, score], i) => ({
      id: `ladder-${i}`, phraseID: "ladder", recordedAt: new Date(noon.getTime() - ago * day + i).toISOString(),
      duration: 1, mode: "listen", overall: score, words: [], engine: "Fake",
    }));
    const r = library.reviewOf("ladder");
    library.attempts = saved;
    return { streak: r.streak, interval: r.interval, resting: r.resting };
  }, history);
  const good = (n) => Array.from({ length: n }, (_, i) => [n + 10 - i, 90]);

  let r = await review(good(5));
  ok(r.interval === 16, `five good days: sixteen days out (got ${r.interval})`);
  r = await review([...good(5), [1, 40]]);
  ok(r.interval === 4, `then one miss: back to four days, not one (got ${r.interval})`);
  r = await review([...good(5), [1, 40], [1, 40], [1, 95]]);
  ok(r.interval === 4, `three goes on that day, one bad: one miss day (got ${r.interval})`);
  r = await review([...good(5), [2, 40], [1, 90]]);
  ok(r.interval === 8, `a good day after it climbs again (got ${r.interval})`);
  r = await review([[3, 90], [2, 40]]);
  ok(r.interval === 1, `a miss near the bottom stops at tomorrow (got ${r.interval})`);
  r = await review([[4, 40], [3, 40], [2, 40]]);
  ok(r.resting && r.interval === 7, `three miss days running: rested a week (got ${r.interval})`);
  r = await review([[5, 40], [4, 40], [3, 90], [2, 40]]);
  ok(!r.resting && r.interval === 1, `a good day breaks the run (got ${r.interval})`);
  r = await review(Array.from({ length: 12 }, (_, i) => [20 - i, 90]).concat([[1, 40]]));
  ok(r.interval === 16, `a long run is capped, so a miss still drops it (got ${r.interval})`);
  r = await review([[3, null], [2, null]]);
  ok(r.interval === 2, `unscored goes count as good (got ${r.interval})`);

  /* Due by calendar day. One good go at 06:40 yesterday is due today from
     midnight, so a session at 06:30 finds it; one at 06:40 today is not due
     until tomorrow. */
  const morning = await page.evaluate(async () => {
    const { library } = await import("/js/store.js");
    library.aside = {};
    const phrase = library.drillable()[0];
    const at = (daysAgo, h, m) => { const d = new Date(); d.setDate(d.getDate() - daysAgo); d.setHours(h, m, 0, 0); return d; };
    const saved = library.attempts;
    const plant = (when) => {
      library.attempts = [{ id: "m", phraseID: phrase.id, recordedAt: when.toISOString(), duration: 1, mode: "listen", overall: 90, words: [], engine: "Fake" }];
    };
    plant(at(1, 6, 40));
    const yesterday = library.due(at(0, 6, 30).getTime()).some((p) => p.id === phrase.id);
    const dueAt = new Date(library.reviewOf(phrase.id).dueAt);
    plant(at(0, 6, 40));
    const today = library.due(at(0, 23, 59).getTime()).some((p) => p.id === phrase.id);
    library.attempts = saved;
    return { yesterday, today, midnight: dueAt.getHours() === 0 && dueAt.getMinutes() === 0 };
  });
  ok(morning.yesterday, "said at 06:40 yesterday: due at 06:30 today");
  ok(morning.midnight, "and due from midnight");
  ok(!morning.today, "said at 06:40 today: not due again today");

  // --------------------------------------------------------- the session
  const sessions = await page.evaluate(async () => {
    const { library } = await import("/js/store.js");
    const { startReview } = await import("/js/drill.js");
    const { state, stopEverything } = await import("/js/core.js");
    const phrases = library.drillable().slice(0, 12);
    const day = 86400000;
    const saved = library.attempts;
    library.attempts = phrases.map((p, i) => ({
      id: `due-${i}`, phraseID: p.id, recordedAt: new Date(Date.now() - (30 - i) * day).toISOString(),
      duration: 1, mode: "listen", overall: 90, words: [], engine: "Fake",
    }));
    const runs = [];
    for (let n = 0; n < 6; n += 1) {
      library.aside = {}; // starting a session puts its first card aside
      startReview();
      runs.push(state.lesson.queue.map((p) => p.id));
    }
    stopEverything();
    library.attempts = saved;
    return { runs, chosen: phrases.slice(0, 10).map((p) => p.id) };
  });
  ok(sessions.runs.every((ids) => ids.length === 10 && ids.every((id) => sessions.chosen.includes(id))),
    "a session is the ten most overdue");
  ok(new Set(sessions.runs.map((ids) => ids.join())).size > 1, "and their order changes between sessions");

  // ----------------------------------------------------------- the tasks
  const steer = (...values) => page.evaluate((v) => {
    const real = (window.__realRandom ||= Math.random.bind(Math));
    const queue = [...v];
    Math.random = () => (queue.length ? queue.shift() : real());
  }, values);
  const record = async () => {
    await page.waitForTimeout(1200); // the model audio settles and re-renders
    const before = (await attempts()).length;
    await page.click("#record");
    await page.waitForSelector("#record.recording");
    await page.waitForTimeout(700);
    await page.click("#record");
    await page.waitForFunction(([k, n]) => JSON.parse(localStorage.getItem(k) || "[]").length > n, [`${STORE}.attempts`, before]);
    await page.waitForSelector(".dial-value");
    await page.waitForTimeout(300);
    while (await page.$("#prize-continue")) { await page.click("#prize-continue"); await page.waitForTimeout(150); }
  };

  // Three cards due, oldest first; the first of them has a reply.
  const cards = await page.evaluate(async ([store]) => {
    const { library, aspectOf } = await import("/js/store.js");
    const three = library.drillable().filter((p) => p.translation && !aspectOf(p)).slice(0, 3);
    localStorage.setItem(`${store}.replies`, JSON.stringify({ [three[0].id]: [{ text: "Igualmente.", translation: "Likewise." }] }));
    // Every other card is put aside, so the session is these three and
    // nothing tops it up: the steering below counts on three.
    const later = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    localStorage.setItem(`${store}.reviewAside`, JSON.stringify(Object.fromEntries(
      library.drillable().filter((p) => !three.some((t) => t.id === p.id)).map((p) => [p.id, later]))));
    const day = 86400000;
    localStorage.setItem(`${store}.attempts`, JSON.stringify(three.map((p, i) => ({
      id: `seed-${i}`, phraseID: p.id, recordedAt: new Date(Date.now() - (9 - i) * day).toISOString(),
      duration: 1, mode: "listen", overall: null, words: [], engine: "Not scored",
    }))));
    return three.map((p) => ({ id: p.id, text: p.text, translation: p.translation }));
  }, [STORE]);
  await page.reload();
  await page.waitForSelector("[data-review]");
  ok(/3 cards to review today/.test(await page.textContent("[data-review]")), "three cards are due");
  /* The third card will be shown and not said, which puts it aside; this
     takes it back out and repaints home, so it can be asked again. */
  const unaside = () => page.evaluate(async (id) => {
    const { library } = await import("/js/store.js");
    delete library.aside[id];
    library.saveAside();
    (await import("/js/app.js")).render();
  }, cards[2].id);

  // Two 0.99s leave the shuffled session where it was; then 0.99 of three
  // ways is the answer, and 0 picks the one reply.
  await steer(0.99, 0.99, 0.99, 0);
  await page.click("[data-review]");
  await page.waitForSelector(".level-badge");
  ok(/what did you say/.test(await page.textContent(".level-badge")), "answer: the badge says which task");
  ok(/Igualmente/.test(await page.textContent(".task-reply")), "answer: the reply is the question");
  ok(!(await page.textContent("#view")).includes(cards[0].text), "answer: the Spanish is withheld");
  ok(!(await page.textContent(".drill-card")).includes(cards[0].translation), "answer: so is its English, until asked for");
  ok(!(await page.$("#listen")) && (await page.$("#show-me")), "answer: no Listen, and Show me stands");
  ok(!(await page.$("#drill-chat")) && !(await page.$(".drill-replies")), "answer: no ask box and no replies under it");
  await page.click("#task-reply-say");
  await page.click("#task-hint");
  ok((await page.textContent(".task-hint")).includes(cards[0].translation), "answer: the hint is the English");
  await shot("review-answer");
  await record();
  ok((await page.textContent(".drill-text")).includes(cards[0].text), "answer: recording reveals the Spanish");
  ok((await attempts()).at(-1).mode === "recall", "answer: filed as a recall attempt");

  // Card two, by ear: the last way is left out, so 0.99 of [as-is, echo] is echo.
  await steer(0.99);
  await page.click("#banner-continue");
  await page.waitForSelector("#echo-show");
  ok(/by ear/.test(await page.textContent(".level-badge")), "echo: the badge says which task");
  ok(!(await page.textContent("#view")).includes(cards[1].text), "echo: the Spanish is withheld");
  ok(!(await page.textContent("#view")).includes(cards[1].translation), "echo: and its English");
  ok((await page.$("#listen")) && (await page.$("#slow")) && !(await page.$("#show-me")), "echo: Listen and Slow stay");
  ok(!(await page.$("#drill-chat")), "echo: no ask box while the question stands");
  await shot("review-echo");
  await record();
  ok((await page.textContent(".drill-text")).includes(cards[1].text), "echo: recording reveals the Spanish");
  ok((await attempts()).at(-1).mode === "listen", "echo: filed as a listen attempt");

  // Card three: no replies and echo was last, so it is asked as its level has it.
  await page.click("#banner-continue");
  await page.waitForFunction((t) => document.querySelector(".drill-text:not(.recall-prompt)")?.textContent.includes(t), cards[2].text);
  ok(!(await page.$(".level-badge")), "the third card is read as usual");
  ok((await attempts()).length === 5, "two attempts were added to the three seeded");

  // Show the words, and quiet mode taking a task off.
  await page.click("#quit");
  await page.waitForSelector("[data-review]");
  ok(/Nothing due today/.test(await page.textContent("[data-review]")), "shown and not said, the third card is put aside: nothing is due");
  await unaside();
  await page.waitForSelector("[data-review]");
  await steer(0.5);
  await page.click("[data-review]");
  await page.waitForSelector("#echo-show");
  await page.click("#echo-show");
  ok((await page.$(".drill-text:not(.recall-prompt)")) && (await page.$("#record")), "echo: Show the words turns it into a card to read");
  // One card is left due and it has no replies, so the ways alternate.
  await page.click("#quit");
  await page.waitForSelector("[data-review]");
  await unaside();
  await page.waitForSelector("[data-review]");
  await page.click("[data-review]");
  await page.waitForSelector(".drill-text:not(.recall-prompt)");
  ok(!(await page.$(".level-badge")), "the same way is not asked twice running");
  await page.click("#quit");
  await page.waitForSelector("[data-review]");
  await unaside();
  await page.waitForSelector("[data-review]");
  await page.click("[data-review]");
  await page.waitForSelector("#echo-show");
  await page.click("#quiet-toggle");
  await page.waitForSelector("#quiet-input");
  ok(!(await page.$(".level-badge")) && !(await page.$("#echo-show")), "quiet mode takes the task off the card");
  await page.click("#quiet-toggle");
  await page.waitForSelector("#record");
  ok(!(await page.$(".level-badge")), "and leaving it does not put the task back");

  // A lesson is never given a task, whatever the dice say.
  await page.click("#quit");
  await page.waitForSelector(".tile");
  await steer(0.99, 0, 0.99, 0);
  await page.click('[data-section="practice"]');
  await page.waitForSelector("[data-lesson]");
  await page.click("[data-lesson]");
  await page.waitForSelector(".drill-text, .aspect-gate, [data-aspect]");
  ok(!(await page.$(".level-badge")) && !(await page.$(".task-reply")), "a lesson is never given a task");

  await done(browser, errors);
})().catch((error) => { console.log("review: crashed —", error.message.split("\n").slice(0, 3).join(" ")); process.exit(1); });
