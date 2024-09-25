import { publicProcedure,router } from "./trpc_server";

const appRouter = router({
    list: publicProcedure.query(async () => {
        // Retrieve users from a datasource, this is an imaginary database
        const users = [1,2,3]
        return users;
      }),
});
  
export type AppRouter2 = typeof appRouter;