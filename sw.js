/* Service worker: permite instalar como app e abrir mesmo sem internet.
   Ao publicar uma nova versão, mude o número abaixo para atualizar o cache. */
const CACHE = "xopapada-v2";
const ARQUIVOS = [
  "./", "./index.html", "./css/style.css", "./js/data.js", "./js/app.js",
  "./assets/logo.webp", "./assets/expert.jpg", "./assets/icons/icon-192.png", "./assets/icons/icon-512.png",
  "./manifest.webmanifest",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

/* Rede primeiro (conteúdo sempre atualizado); cache se estiver offline */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then((r) => { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return r; })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
