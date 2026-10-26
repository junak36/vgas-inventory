// V-GAS: пренасочване на стария адрес към новата Google бланка.
const GOOGLE_APP_URL = 'https://script.google.com/macros/s/AKfycbybWeO3vbo1RZ228C89-geR17go7-IiInowoLwKU5GtnzwlzqE_wxLY5ZerlXqmn00T/exec';

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    // Това е името на кеша от предишния service-worker.js.
    await caches.delete('vgas-inventory-v2');
    await self.clients.claim();
  }()));
});

self.addEventListener('fetch', function (event) {
  // Пренасочва отварянето на бланката. Останалите заявки
  // се обработват нормално от браузъра.
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate') return;
  if (!event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith(Promise.resolve(Response.redirect(GOOGLE_APP_URL, 302)));
});
