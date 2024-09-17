

import {fetchRequestHandler} from "@trpc/server/adapters/fetch"
import { appRouter } from "./trpc_router";

export default {
    async fetch(request :Request, env : Env) {
        const url = new URL(request.url);
        if(url.pathname == "/" || url.pathname == "/timer"){

            const html =  `<!DOCTYPE html>
                        <html>
                        <body>
                        <div id="app"></div>                            
                        </body>

                        <script src="public/app.js"></script>

                    </html>`
            return new Response(html, {
                headers: {
                    "content-type": "text/html;charset=UTF-8",
                },
            });
            
        }else if (url.pathname.startsWith("/public")){
                
            return await env.ASSETS.fetch(request);

        }else if (url.pathname == "/other"){
            return new Response('Hello Other');
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