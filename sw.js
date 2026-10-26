const CACHE_NAME = 'mic-campus-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/variables.css',
  '/css/style.css',
  '/css/map.css',
  '/css/modals.css',
  '/css/responsive.css',
  '/js/api.js',
  '/js/mapEngine.js',
  '/js/navigation.js',
  '/js/voiceService.js',
  '/js/qrService.js',
  '/js/googleMaps.js',
  '/js/accessibility.js',
  '/js/adminService.js',
  '/js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
