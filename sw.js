const cacheName = 'our-private-chat-v1';
const assetsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Install Event: Saves the app files to the phone's memory
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Caching app shell');
      return cache.addAll(assetsToCache);
    })
  );
});

// 2. Activate Event: Cleans up old versions of the app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event: Serves the app from memory when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached file if we have it, otherwise go to the internet
      return cachedResponse || fetch(event.request);
    })
  );
});
