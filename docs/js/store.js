// Persistence. Ported from Xerra and simplified for a one-language course.
//
// Metadata (custom phrases, attempts, progress, settings) lives in
// localStorage as JSON. Audio blobs live in IndexedDB, the only place iOS
// Safari will hold binary data of any size.
//
// Course phrases are NOT stored here — they live in content.js as code, with
// stable ids that attempts reference. Only Deb's own added phrases and her
// results are data. That removes Xerra's whole seeding/versioning machinery.
//
// iOS can evict a web app's storage after long disuse. Anything you'd be sad
// to lose should be exported from Settings.

import { COURSE_LANGUAGE, COURSE_PHRASES } from "./content.js";

const KEYS = {
  phrases: "debolingo.phrases",
  attempts: "debolingo.attempts",
  progress: "debolingo.progress",
  settings: "debolingo.settings",
};

const DB_NAME = "debolingo";
const DB_VERSION = 1;
const STORE_MODEL = "modelAudio";
const STORE_RECORDINGS = "recordings";

// ---------------------------------------------------------------- IndexedDB

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_MODEL)) db.createObjectStore(STORE_MODEL);
      if (!db.objectStoreNames.contains(STORE_RECORDINGS)) db.createObjectStore(STORE_RECORDINGS);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

async function idbPut(store, key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(value, key);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function idbGet(store, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const request = tx.objectStore(store).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function idbDelete(store, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).delete(key);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function idbClear(store) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).clear();
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

export const audioStore = {
  putModel: (key, blob) => idbPut(STORE_MODEL, key, blob),
  getModel: (key) => idbGet(STORE_MODEL, key),
  putRecording: (key, blob) => idbPut(STORE_RECORDINGS, key, blob),
  getRecording: (key) => idbGet(STORE_RECORDINGS, key),
  deleteRecording: (key) => idbDelete(STORE_RECORDINGS, key),
  clearModelCache: () => idbClear(STORE_MODEL),

  async usage() {
    if (!navigator.storage?.estimate) return null;
    const { usage, quota } = await navigator.storage.estimate();
    return { usage, quota };
  },
};

// ------------------------------------------------------------------ helpers

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Storage write failed", error);
  }
}

export function uid() {
  return (crypto.randomUUID?.() ?? String(Date.now() + Math.random())).toString();
}

/** Local calendar day as YYYY-MM-DD — streaks care about Deb's days, not UTC's. */
function localDay(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ------------------------------------------------------------------ library
//
// Custom phrases + attempts. Course phrases come in via content.js but share
// the same attempt history, keyed by phrase id.

export const library = {
  customPhrases: [],
  attempts: [],

  load() {
    this.customPhrases = readJSON(KEYS.phrases, []);
    this.attempts = readJSON(KEYS.attempts, []);
  },

  saveCustom() {
    writeJSON(KEYS.phrases, this.customPhrases);
  },
  saveAttempts() {
    writeJSON(KEYS.attempts, this.attempts);
  },

  /** Every drillable phrase — course first, then Deb's own. */
  allPhrases() {
    return [...COURSE_PHRASES, ...this.customPhrases];
  },

  phraseById(id) {
    return this.allPhrases().find((p) => p.id === id) ?? null;
  },

  addCustom(phrase) {
    this.customPhrases.push({
      id: uid(),
      language: COURSE_LANGUAGE,
      createdAt: new Date().toISOString(),
      ...phrase,
    });
    this.saveCustom();
  },

  updateCustom(phrase) {
    const index = this.customPhrases.findIndex((p) => p.id === phrase.id);
    if (index === -1) return;
    this.customPhrases[index] = phrase;
    this.saveCustom();
  },

  async removeCustom(phraseID) {
    for (const attempt of this.attemptsFor(phraseID)) {
      await audioStore.deleteRecording(attempt.id);
    }
    this.attempts = this.attempts.filter((a) => a.phraseID !== phraseID);
    this.customPhrases = this.customPhrases.filter((p) => p.id !== phraseID);
    this.saveCustom();
    this.saveAttempts();
  },

  attemptsFor(phraseID) {
    return this.attempts
      .filter((a) => a.phraseID === phraseID)
      .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));
  },

  bestScore(phraseID) {
    const scores = this.attemptsFor(phraseID)
      .map((a) => a.overall)
      .filter((s) => typeof s === "number");
    return scores.length ? Math.max(...scores) : null;
  },

  recordAttempt(attempt) {
    this.attempts.push(attempt);
    this.saveAttempts();
  },

  updateAttempt(attempt) {
    const index = this.attempts.findIndex((a) => a.id === attempt.id);
    if (index === -1) return;
    this.attempts[index] = attempt;
    this.saveAttempts();
  },

  async removeAttempt(attemptID) {
    await audioStore.deleteRecording(attemptID);
    this.attempts = this.attempts.filter((a) => a.id !== attemptID);
    this.saveAttempts();
  },

  exportJSON() {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        customPhrases: this.customPhrases,
        attempts: this.attempts,
        progress: { lessons: progress.lessons, streak: progress.streak },
      },
      null,
      2
    );
  },

  importJSON(text) {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed.customPhrases) && !Array.isArray(parsed.attempts)) {
      throw new Error("That doesn't look like a Deb-o-lingo backup.");
    }
    this.customPhrases = Array.isArray(parsed.customPhrases) ? parsed.customPhrases : [];
    this.attempts = Array.isArray(parsed.attempts) ? parsed.attempts : [];
    this.saveCustom();
    this.saveAttempts();
    if (parsed.progress) {
      progress.lessons = parsed.progress.lessons ?? {};
      progress.streak = parsed.progress.streak ?? { count: 0, lastDay: null };
      progress.save();
    }
  },
};

// ----------------------------------------------------------------- progress
//
// Which lessons are done, and the daily streak. A lesson counts as completed
// the moment its last phrase is passed; repeating a lesson keeps the best
// average score. The streak counts consecutive local days with at least one
// completed lesson.

export const progress = {
  lessons: {},
  streak: { count: 0, lastDay: null },

  load() {
    const stored = readJSON(KEYS.progress, {});
    this.lessons = stored.lessons ?? {};
    this.streak = stored.streak ?? { count: 0, lastDay: null };
  },

  save() {
    writeJSON(KEYS.progress, { lessons: this.lessons, streak: this.streak });
  },

  isDone(lessonId) {
    return Boolean(this.lessons[lessonId]);
  },

  /**
   * Record a finished lesson. Returns { streakGrew } so the completion
   * screen knows whether to celebrate the flame.
   */
  completeLesson(lessonId, averageScore) {
    const entry = this.lessons[lessonId] ?? { completedAt: null, best: null, times: 0 };
    entry.completedAt = new Date().toISOString();
    entry.times += 1;
    if (averageScore != null && (entry.best == null || averageScore > entry.best)) {
      entry.best = Math.round(averageScore);
    }
    this.lessons[lessonId] = entry;

    const today = localDay();
    const yesterday = localDay(new Date(Date.now() - 86400000));
    let streakGrew = false;
    if (this.streak.lastDay !== today) {
      this.streak.count = this.streak.lastDay === yesterday ? this.streak.count + 1 : 1;
      this.streak.lastDay = today;
      streakGrew = true;
    }

    this.save();
    return { streakGrew };
  },

  /** The live streak — zero if the chain is already broken. */
  currentStreak() {
    const today = localDay();
    const yesterday = localDay(new Date(Date.now() - 86400000));
    if (this.streak.lastDay === today || this.streak.lastDay === yesterday) {
      return this.streak.count;
    }
    return 0;
  },

  /** True if today's lesson is still owed — drives the home-screen nudge. */
  owedToday() {
    return this.streak.lastDay !== localDay();
  },
};

// ----------------------------------------------------------------- settings

const DEFAULT_SETTINGS = {
  azureKey: "",
  azureRegion: "northeurope",
  azureVoice: "es-ES-ElviraNeural",
  slowRate: 0.65,
  showTranslationUpFront: true,
  unlockAll: false,
};

export const settings = {
  ...DEFAULT_SETTINGS,

  load() {
    Object.assign(this, DEFAULT_SETTINGS, readJSON(KEYS.settings, {}));
    // A saved voice that's no longer offered (the retired es-MX experiments)
    // falls back to the default rather than lingering invisibly.
    if (!VOICES.some((v) => v.id === this.azureVoice)) {
      this.azureVoice = DEFAULT_SETTINGS.azureVoice;
    }
  },

  save() {
    const { load, save, hasAzure, ...data } = this;
    writeJSON(KEYS.settings, data);
  },

  get hasAzure() {
    return Boolean(this.azureKey?.trim() && this.azureRegion?.trim());
  },
};

// Course voices — Castilian only, to match the focusNotes (Spain 'th',
// soft d's, vosotros-free politeness). If Deb's target ever shifts to Latin
// American Spanish, the content needs rewriting first; add voices then.
export const VOICES = [
  { id: "es-ES-ElviraNeural", name: "Elvira", detail: "Spain · Female" },
  { id: "es-ES-AlvaroNeural", name: "Álvaro", detail: "Spain · Male" },
];
