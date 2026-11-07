const CACHE_NAME = 'offline-player-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Lokale Assets aus dem Cache laden, falls offline
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});