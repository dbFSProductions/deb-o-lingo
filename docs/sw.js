// Service worker: makes Deb-o-lingo work with no signal once installed, and
// — just as important — makes sure Deb is never stuck on an old build.
//
// The rule that matters: **the network wins whenever there is a network.**
// The cache is a safety net for the Underground, not the source of truth. An
// earlier version served the cache first, which meant a shipped change could
// sit on GitHub Pages for days while the phone happily showed last week's app.
//
// App shell is precached. The Azure SDK is cached on first use rather than up
// front, so the initial load stays light. Azure API calls are never cached —
// they're POSTs and must always go to the network.

const VERSION = "debolingo-v3";

const SHELL = [
  "./",
  "./index.html",
  "./app.css",
  "./manifest.webmanifest",
  "./js/app.js",
  "./js/store.js",
  "./js/audio.js",
  "./js/speech.js",
  "./js/content.js",
  "./vendor/fonts/nunito-latin.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

// Fonts, icons and the vendored SDK never change without a new filename, so
// they can come straight from the cache. Everything else is app code.
const IMMUTABLE = /\/(vendor|icons)\//;

// How long we wait for the network before falling back to the cache.
const NETWORK_TIMEOUT = 3500;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      // `cache: "reload"` skips the browser's own HTTP cache — without it a
      // fresh service worker can precache the very files it was meant to
      // replace. Individual failures shouldn't abort the whole install.
      .then((cache) =>
        Promise.allSettled(SHELL.map((url) => cache.add(new Request(url, { cache: "reload" }))))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const stale = keys.filter((key) => key !== VERSION);
      await Promise.all(stale.map((key) => caches.delete(key)));
      await self.clients.claim();
      if (!stale.length) return false;

      // A stale cache means an older build was running here, so whatever is
      // on screen is out of date. Windows running the current app answer this
      // message and reload themselves — politely, never mid-recording.
      const windows = await self.clients.matchAll({ type: "window" });
      for (const client of windows) client.postMessage({ type: "updated", version: VERSION });
      return windows.length > 0;
    })().then((needsRescue) => {
      if (needsRescue) rescueStaleWindows();
    })
  );
});

/**
 * Windows running an *older* build have no listener for that message — which
 * is exactly the trap Deb was in — so after a grace period we navigate them
 * ourselves.
 *
 * Deliberately fire-and-forget rather than awaited by `activate`: a navigation
 * needs fetches, and fetches stay queued until activation finishes. Awaiting
 * it there deadlocks the worker against its own page — which looks, from the
 * sofa, exactly like an app that has hung.
 */
function rescueStaleWindows() {
  setTimeout(async () => {
    const windows = await self.clients.matchAll({ type: "window" });
    for (const client of windows) {
      if (acknowledged.has(client.id)) continue;
      try {
        await client.navigate(client.url);
      } catch {
        /* Safari can refuse to navigate a client; the next launch picks it up. */
      }
    }
    acknowledged.clear();
  }, 1500);
}

// Client ids that answered the "updated" message and are handling it themselves.
const acknowledged = new Set();

self.addEventListener("message", (event) => {
  const data = event.data;
  if (data?.type === "update-ack" && event.source) acknowledged.add(event.source.id);
  if (data?.type === "skip-waiting") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== location.origin) return; // Azure et al go straight out

  if (IMMUTABLE.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  event.respondWith(networkFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(VERSION);
    cache.put(request, response.clone());
  }
  return response;
}

/**
 * Newest version if the network answers in time, last known good copy if it
 * doesn't. Offline the timeout barely matters — a failed fetch rejects long
 * before it expires.
 */
async function networkFirst(request) {
  const cache = await caches.open(VERSION);

  try {
    const response = await withTimeout(fetch(request), NETWORK_TIMEOUT);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    // A navigation with nothing cached for it still deserves the app shell.
    if (request.mode === "navigate") {
      const shell = await caches.match("./index.html", { ignoreSearch: true });
      if (shell) return shell;
    }
    throw new Error("offline and uncached");
  }
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("network timeout")), ms)),
  ]);
}
