 



const CACHE_NAME = "portfolio-guilherme-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./manifest.json",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"
];

// Instala a nova versão e prepara o cache
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );


});

// Ativa a nova versão e remove caches antigos
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((name) =>
                        name.startsWith("portfolio-guilherme-") &&
                        name !== CACHE_NAME
                    )
                    .map((name) => caches.delete(name))
            )
        )
    );

    self.clients.claim();
});

// Busca arquivos atualizados na rede
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response.ok) {
                    const responseCopy = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseCopy);
                    });
                }

                return response;
            })
            .catch(async () => {
                const cachedResponse = await caches.match(event.request);

                if (cachedResponse) return cachedResponse;

                return new Response("Você está offline e este conteúdo não está disponível.", {
                    status: 503,
                    headers: { "Content-Type": "text/plain; charset=utf-8" }
                });
            })
    );
});
// Recebe o comando do botão "Atualizar agora"
self.addEventListener("message", (event) => {
    if (event.data && event.data.action === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
