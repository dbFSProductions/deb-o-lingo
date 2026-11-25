// France: the strip on home, the page of phrases, and what a tap asks for.
// Azure is the fake SDK from lib.js with a synthesiser that writes down the
// voice and text it was asked for (then fails, so nothing is cached and the
// app falls through to the browser voice). So this proves a French voice was
// asked for French text — not that anything was heard. Nothing is written to
// attempts, the streak or Review.
const { open, fakeAzure, tally, STORE } = require("./lib.js");
const { ok, done } = tally("france");

const recordingAzure = `(${fakeAzure})();
  window.SpeechSDK.SpeechSynthesizer = function (config) {
    this.close = () => {};
    this.speakTextAsync = (t, good, bad) => {
      (window.__sdk.synth ||= []).push({ text: String(t), voice: config.speechSynthesisVoiceName });
      bad("no synthesis in the checks");
    };
  };
  window.__spoken = [];
  const real = window.speechSynthesis && window.speechSynthesis.speak.bind(window.speechSynthesis);
  if (real) window.speechSynthesis.speak = (u) => { window.__spoken.push({ text: u.text, lang: u.lang }); real(u); };`;

(async () => {

  // With an Azure key.
  let { browser, page, errors } = await open({ settings: { azureKey: "k" }, init: recordingAzure });
  await page.waitForSelector("[data-open-france]");
  ok(/French/.test(await page.textContent("[data-open-france]")), "home has the French strip");
  ok(await page.$$eval(".tiles .tile", (t) => t.length) === 8, "the eight squares are untouched");
  await page.click("[data-open-france]");
  await page.waitForSelector("[data-french]");
  const rows = await page.$$eval("[data-french]", (els) => els.map((e) => e.querySelector("[lang]")?.getAttribute("lang")));
  ok(rows.length >= 10, `a dozen-ish phrases (${rows.length})`);
  ok(rows.every((l) => l === "fr-FR"), "every phrase is marked fr-FR");
  ok(/Bonjour/.test(await page.textContent("#view")) && /café/.test(await page.textContent("#view")), "Bonjour and the coffee are there");

  // Opening the page tries to save every clip for offline, in the French voice.
  await page.waitForFunction(() => (window.__sdk.synth || []).length >= 3);
  let synth = await page.evaluate(() => window.__sdk.synth);
  ok(synth.every((s) => /^fr-FR-/.test(s.voice)), `saving uses a French voice (${synth[0].voice})`);
  await page.waitForFunction(() => /Couldn't save/.test(document.getElementById("france-offline")?.textContent || ""));
  ok(true, "a failed save says so, and to try again on wifi");

  // A tap asks Azure for that phrase in French, then falls back to the browser voice.
  await page.evaluate(() => { window.__sdk.synth = []; window.__spoken = []; });
  const coffee = await page.$('[data-french]:has-text("Un café, s")');
  await coffee.click();
  await page.waitForFunction(() => (window.__sdk.synth || []).length > 0);
  synth = await page.evaluate(() => window.__sdk.synth);
  ok(synth[0].text === "Un café, s'il vous plaît" && /^fr-FR-/.test(synth[0].voice), "tapping the coffee asks for it in French");
  const spoken = await page.evaluate(() => window.__spoken);
  ok(spoken.length === 0 || spoken[0].lang === "fr-FR", "the browser fallback, if used, is fr-FR");

  // Nothing about French reaches the saved data.
  const keys = await page.evaluate((p) => Object.keys(localStorage).filter((k) => k.startsWith(p)).map((k) => localStorage.getItem(k)).join(" "), STORE);
  ok(!/café|Bonjour|fr-FR/.test(keys), "nothing French is written to storage");

  await page.click("[data-go-home]");
  await page.waitForSelector("[data-open-france]");
  ok(true, "home link goes back");
  await browser.close();
  ok(errors.length === 0, `no console errors with Azure: ${errors.join(" | ")}`);

  // Azure succeeds: every clip is saved, and a tap afterwards is served from
  // the cache (no new synthesis) — the property the trip depends on.
  const savingAzure = recordingAzure.replaceAll('bad("no synthesis in the checks");', 'good({ reason: 9, audioData: new Uint8Array(64).buffer });');
  ({ browser, page, errors } = await open({ settings: { azureKey: "k" }, init: savingAzure }));
  await page.click("[data-open-france]");
  await page.waitForFunction(() => /All saved/.test(document.getElementById("france-offline")?.textContent || ""), null, { timeout: 15000 });
  ok(true, "with Azure answering, the page reaches All saved");
  await page.evaluate(() => { window.__sdk.synth = []; });
  await page.click('[data-french]:has-text("Merci beaucoup")');
  await page.waitForTimeout(400);
  ok((await page.evaluate(() => window.__sdk.synth.length)) === 0, "after saving, a tap is served from the cache");
  await browser.close();
  ok(errors.filter((e) => !/play|decode|NotSupported|media/i.test(e)).length === 0, `no console errors when saving: ${errors.join(" | ")}`);

  // No key: no saving line, the phone's voice.
  ({ browser, page, errors } = await open({ init: recordingAzure }));
  await page.click("[data-open-france]");
  await page.waitForSelector("[data-french]");
  ok(/phone's own French voice/.test(await page.textContent("#france-offline")), "without a key it says it uses the phone's voice");
  await page.click("[data-french]");
  await page.waitForTimeout(200);
  ok((await page.evaluate(() => (window.__sdk.synth || []).length)) === 0, "without a key Azure is never asked");
  await done(browser, errors);
})();
