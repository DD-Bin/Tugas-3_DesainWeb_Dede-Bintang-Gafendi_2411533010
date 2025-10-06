// Nama cache dan versi
const CACHE_NAME = 'dede-pwa-v1';
const OFFLINE_PAGE = './offline.html';

// Daftar file yang akan di-cache
const urlsToCache = [
  './',
  'index.html',
  'about.html',
  'contact.html',
  'styles.css',
  'profile.jpg',
  'offline.html',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png'
];

// Install event – caching aset statis
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event – hapus cache lama
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event – strategi Cache First dengan fallback offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika ada di cache, tampilkan
        if (response) return response;

        // Jika tidak ada, ambil dari jaringan
        return fetch(event.request)
          .catch(() => caches.match(OFFLINE_PAGE)); // fallback offline
      })
  );
});
