import { publicProcedure,router } from "./trpc_server";
import { z } from 'zod';


export const appRouter = router({
    gettodos:publicProcedure.query(async () =>{
        return [10,20,30]
    }),
    gettodo:publicProcedure.query(async () =>{
        return 10
    }),
    userById: publicProcedure.input(z.string()).query(async (opts) => {
        const { input } = opts;
        return {test:true}
    }),
})

export type AppRouter = typeof appRouter;