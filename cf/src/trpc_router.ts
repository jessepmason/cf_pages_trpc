import { publicProcedure,router } from "./trpc_server";

export const appRouter = router({
    gettodos:publicProcedure.query(async () =>{
        return [10,20,30]
    })
})

export type AppRouter = typeof appRouter;