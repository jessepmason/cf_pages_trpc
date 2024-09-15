import {fetchRequestHandler} from "@trpc/server/adapters/fetch"
import { appRouter } from "../../src/trpc_router";


// const handler = (req:Request) =>{
//     fetchRequestHandler({
//         endpoint:"/api",
//         req,
//         router:appRouter,
//         createContext: ()=>({})
//     })
// }
export const onRequest: PagesFunction<Env> = async (context) => {
    const trpcResults = fetchRequestHandler({
        endpoint:"/api",
        req:context.request,
        router:appRouter,
        createContext: ()=>({})
    })
    console.log("trpc results",trpcResults)
    return trpcResults
    // return new Response("Hello from api");
}