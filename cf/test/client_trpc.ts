/**
 * This is the client-side code that uses the inferred types from the server
 */
import {createTRPCClient} from '@trpc/client';
  /**
   * We only import the `AppRouter` type from the server - this is not available at runtime
   */
  import type { AppRouter } from './server_trpc_router'
  
  // Initialize the tRPC client
  const trpc = createTRPCClient<AppRouter>({
    links: [

    ],
  });

  const todo = await trpc.user.gettodo.query();