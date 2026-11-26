// Ancienne adresse du jeu : ce service worker se désinstalle et laisse passer toutes les requêtes.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', ev => {
  ev.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('mots-magiques')).map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll())
    .then(clients => clients.forEach(c => c.navigate(c.url))));
});
