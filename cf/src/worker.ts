export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        return new Response('Hello From Dist TS');
        //  Otherwise, serve the static assets.
        // Without this, the Worker will error andno assets will be served.
        // return env.ASSETS.fetch(request);
    },
}