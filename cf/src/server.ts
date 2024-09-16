

import {fetchRequestHandler} from "@trpc/server/adapters/fetch"
import { appRouter } from "./trpc_router";
export default {
    async fetch(request, env, context) {
        const url = new URL(request.url);
        if(request.path == "/"){
            return new Response('Hello FHome');
        }
        const trpcResults = await fetchRequestHandler({
            endpoint:"/api",
            req:context.request,
            router:appRouter,
            createContext: ()=>({})
        })
        if(trpcResults.ok){
            return new Response('Hello TRPC');

        }else{
            return new Response("Not found")
        }
        //  Otherwise, serve the static assets.
        // Without this, the Worker will error andno assets will be served.
        // return env.ASSETS.fetch(request);
    },
}