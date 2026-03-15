const CACHE_NAME = 'ciakkaliau-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Bangers&display=swap',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
];

// Install Service Worker & Simpan Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
});

// Ambil data dari Cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Bagian Notifikasi (Tetap saya masukkan kode kamu yang tadi)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'Treasury Update', body: 'Cek saldo kamu sekarang!' };
  const options = {
    body: data.body,
    icon: 'https://via.placeholder.com/192x192.png?text=CIAK',
    badge: 'https://via.placeholder.com/192x192.png?text=CIAK'
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('./'));
});
