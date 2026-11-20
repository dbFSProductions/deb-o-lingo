// Match's two harder settings: more pairs a round, and Listen, where the
// Spanish cards are speakers until matched. Azure is the fake SDK from lib.js
// with a synthesiser that writes down what it was asked to say (then fails,
// so the app falls through to the browser voice) — so this proves the right
// card was asked for, not that anything was heard.
const path = require("path");
const fs = require("fs");
const { open, fakeAzure, tally, STORE } = require("./lib.js");
const { ok, done } = tally("match");

const recordingAzure = `(${fakeAzure})();
  window.SpeechSDK.SpeechSynthesizer = function () {
    this.close = () => {};
    const said = (t, bad) => { (window.__sdk.said ||= []).push(String(t)); bad("no synthesis in the checks"); };
    this.speakTextAsync = (t, ok, bad) => said(t, bad);
    this.speakSsmlAsync = (t, ok, bad) => said(t, bad);
  };`;

(async () => {
  let { browser, page, errors } = await open({ settings: { azureKey: "k" }, init: recordingAzure });
  const stored = (key) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || "null"), `${STORE}.${key}`);
  const esCards = () => page.$$eval('.match-card[data-side="es"]', (els) => els.map((e) => ({ id: e.dataset.id, text: e.textContent.trim(), listen: e.classList.contains("match-listen") })));

  await page.waitForSelector("[data-open-match]");
  await page.click("[data-open-match]");
  await page.waitForSelector(".match-card");
  ok((await esCards()).length === 6, "a round is six pairs by default");
  ok(await page.$('.match-option[data-match-listen="0"][aria-pressed="true"]'), "Read is the default");

  // Read: picking a Spanish card says it, and so does matching it.
  const { COURSE_PHRASES: course } = await import(path.resolve(__dirname, "../../docs/js/content.js"));
  const saidCount = () => page.evaluate(() => (window.__sdk.said || []).length);
  const readCard = (await esCards())[0];
  await page.click(`.match-card[data-side="es"][data-id="${readCard.id}"]`);
  await page.waitForFunction(() => (window.__sdk.said || []).length > 0);
  ok((await page.evaluate(() => window.__sdk.said.join("|"))).includes(course.find((p) => p.id === readCard.id).text),
    "Read: picking a Spanish card says it");
  await page.waitForFunction((id) => document.querySelector(`.match-card[data-side="es"][data-id="${id}"]`).dataset.busy !== "1", readCard.id);
  const before = await saidCount();
  await page.click(`.match-card[data-side="en"][data-id="${readCard.id}"]`);
  await page.waitForFunction((n) => (window.__sdk.said || []).length > n, before);
  ok(true, "Read: matching it says it again");
  // English first, then the Spanish: said once on the pick (the match leaves it talking).
  const second = (await esCards())[1];
  await page.click(`.match-card[data-side="en"][data-id="${second.id}"]`);
  const b2 = await saidCount();
  await page.click(`.match-card[data-side="es"][data-id="${second.id}"]`);
  await page.waitForFunction((n) => (window.__sdk.said || []).length > n, b2);
  ok(await page.$(`.match-card.matched[data-side="es"][data-id="${second.id}"]`), "English then Spanish matches and is said");
  await page.evaluate(() => { window.__sdk.said = []; });

  await page.click('.match-option[data-match-pairs="10"]');
  await page.waitForFunction(() => document.querySelectorAll('.match-card[data-side="es"]').length === 10);
  ok((await stored("settings")).matchPairs === 10, "ten pairs is remembered");

  await page.click('.match-option[data-match-listen="1"]');
  await page.waitForSelector(".match-card.match-listen");
  ok((await stored("settings")).matchListen === true, "Listen is remembered");
  let cards = await esCards();
  ok(cards.length === 10 && cards.every((c) => c.listen && c.text === "🔊"), "every Spanish card is a speaker with no writing");

  // The Spanish each card stands for, read from the course for comparison.
  const { COURSE_PHRASES } = await import(path.resolve(__dirname, "../../docs/js/content.js"));
  const textOf = (id) => COURSE_PHRASES.find((p) => p.id === id)?.text;

  const first = cards[0];
  await page.click(`.match-card[data-side="es"][data-id="${first.id}"]`);
  await page.waitForFunction(() => (window.__sdk.said || []).length > 0);
  const said = await page.evaluate(() => window.__sdk.said.join(" | "));
  ok(said.includes(textOf(first.id)), `tapping a speaker asks Azure for that card: ${said.slice(0, 80)}`);
  ok(await page.$(`.match-card[data-side="es"][data-id="${first.id}"].picked`), "and picks it");
  await page.waitForFunction((id) => !document.querySelector(`.match-card[data-side="es"][data-id="${id}"]`).classList.contains("busy"), first.id);
  await page.click(`.match-card[data-side="es"][data-id="${first.id}"]`);
  ok(await page.$(`.match-card[data-side="es"][data-id="${first.id}"].picked`), "a second tap says it again and keeps it picked");

  // A wrong English first, then the right one.
  const wrong = cards[1].id;
  await page.click(`.match-card[data-side="en"][data-id="${wrong}"]`);
  ok(!(await page.$(".match-card.matched")), "a wrong English is a miss");
  for (const c of cards) {
    await page.click(`.match-card[data-side="es"][data-id="${c.id}"]`);
    await page.click(`.match-card[data-side="en"][data-id="${c.id}"]`);
  }
  cards = await esCards();
  ok(cards.every((c) => !c.listen && c.text === textOf(c.id)), "a matched card shows its Spanish");
  await page.waitForSelector("#match-again");
  const awards = (await stored("awards")).match;
  ok(awards.total === 12 && awards.rounds === 1, `two read pairs, ten listened, one round and one round counted: ${awards.total}, ${awards.rounds}`);
  ok(awards.bests?.["listen-10"] == null && awards.bestTime == null, "a round with a miss sets no best");
  ok(/10-pair listening round|Done/.test(await page.textContent("#match-done")), "the result names the round");

  // A clean listening round sets its own best and leaves the six-pair one alone.
  await page.click("#match-again");
  await page.waitForSelector(".match-card.match-listen");
  for (const c of await esCards()) {
    await page.click(`.match-card[data-side="es"][data-id="${c.id}"]`);
    await page.click(`.match-card[data-side="en"][data-id="${c.id}"]`);
  }
  await page.waitForSelector("#match-again");
  const after = (await stored("awards")).match;
  ok(typeof after.bests?.["listen-10"] === "number" && after.bestTime == null, "a clean round keeps a best for its own kind");
  ok((await page.textContent("#match-done")).includes("10-pair listening round"), "and says which kind it was");
  // Start a fresh round to screenshot it.
  await page.click("#match-again");
  await page.waitForSelector(".match-card.match-listen");
  const shots = process.env.SHOTS;
  if (shots) await page.screenshot({ path: `${shots}/match-listen.png`, fullPage: true });
  await done(null, errors);
  await browser.close();

  // Without an Azure key, Listen is offered but can't be chosen, and a saved
  // Listen falls back to reading.
  ({ browser, page, errors } = await open({ settings: { azureKey: "", matchListen: true, matchPairs: 8 } }));
  await page.waitForSelector("[data-open-match]");
  await page.click("[data-open-match]");
  await page.waitForSelector(".match-card");
  const plain = await page.$$eval('.match-card[data-side="es"]', (els) => els.map((e) => e.classList.contains("match-listen")));
  const t2 = tally("match (no Azure)");
  t2.ok(plain.length === 8 && plain.every((x) => !x), "no key: eight pairs, read, not listened");
  t2.ok(await page.$('.match-option[data-match-listen="1"]:disabled'), "Listen is disabled without the key");
  await t2.done(browser, errors);
})();
