// // Nama cache dan versi
// const CACHE_NAME = 'dede-pwa-v1';
// // const OFFLINE_PAGE = './offline.html';

// // Daftar file yang akan di-cache
// const urlsToCache = [
//   './',
//   'index.html',
//   'about.html',
//   'contact.html',
//   'styles.css',
//   'profile.jpg',
//   'offline.html',
//   'android-chrome-192x192.png',
//   'android-chrome-512x512.png'
// ];

// // Install event – caching aset statis
// self.addEventListener('install', (event) => {
//   console.log('[Service Worker] Installing...');

//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('[Service Worker] Caching files');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// // Activate event – hapus cache lama
// self.addEventListener('activate', (event) => {
//   console.log('[Service Worker] Activating...');

//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((name) => {
//           if (name !== CACHE_NAME) {
//             console.log('[Service Worker] Deleting old cache:', name);
//             return caches.delete(name);
//           }
//         })
//       );
//     })
//   );
// });

// // fetch
// self.addEventListener("fetch", (event) => {
//   if (event.request.mode === "navigate") {
//     // if user minta halaman baru, fallback ke offline.html saat offline
//     event.respondWith(
//       fetch(event.request)
//         .then((response) => response)
//         .catch(() => caches.match("./offline.html"))
//     );
//   } else {
//     // asset load dari cache atau fetch
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         return cachedResponse || fetch(event.request);
//       })
//     );
//   }
// });
