const CACHE = 'tasjeel-test-v21-assist-20261024-1';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil((async () => { for(const key of await caches.keys()) if(key.startsWith('tasjeel-test-') && key !== CACHE) await caches.delete(key); await self.clients.claim(); })()); });
self.addEventListener('message', e => { if(e.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => { const u = new URL(e.request.url); if(e.request.method !== 'GET' || u.origin !== self.location.origin || !u.pathname.startsWith(new URL(self.registration.scope).pathname)) return; if(e.request.mode === 'navigate') { e.respondWith(fetch(e.request, {cache:'no-store'}).catch(() => caches.match('./index.html'))); return; } e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request))); });
