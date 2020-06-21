// A part of https://sgeo.github.io/bitmagic-ruffle/ support.
// TODO: Make this more general to find a way for paths to support independent service workers?

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener("fetch", function(event) {
    if(new URL(event.request.url).pathname.startsWith("/bmcontrol/")) {
        let channel = new BroadcastChannel("bmcontrol");
        channel.postMessage(new URL(event.request.url).pathname);
        event.respondWith(Promise.resolve(new Response(null, {status: 204})));
    }
});
