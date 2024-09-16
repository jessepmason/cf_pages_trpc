

import {fetchRequestHandler} from "@trpc/server/adapters/fetch"
import { appRouter } from "./trpc_router";

export default {
    async fetch(request :Request, env, ctx) {
        const url = new URL(request.url);

        if(url.pathname == "/"){

            return new Response('Hello FHome');

        }else if (url.pathname.startsWith("/public")){
                
            return await ctx.env.ASSETS.fetch(ctx.req.raw);

        }else if (url.pathname == "/react"){
            const html =  `<!DOCTYPE html>
                        <html>
                        <body>

                        <h1>My First Heading</h1>
                        <p>My first paragraph.</p>

                        </body>
                    </html>`
            return new Response(html, {
                headers: {
                    "content-type": "text/html;charset=UTF-8",
                },
            });
        }

        const trpcResults = await fetchRequestHandler({
            endpoint:"/api",
            req:request,
            router:appRouter,
            createContext: ()=>({

            })
        })

        if(trpcResults.ok){
            return trpcResults
        }else{
            return new Response("Not found")
        }

    },
}