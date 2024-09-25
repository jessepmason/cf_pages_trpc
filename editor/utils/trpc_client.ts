import {createTRPCClient,httpBatchLink} from '@trpc/client';
import type { AppRouter } from '../../cf/test/server_trpc_router'
  
  
export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: '/api',
            // You can pass any HTTP headers you wish here
          }),
    ],
});

