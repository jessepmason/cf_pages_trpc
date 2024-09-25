import { trpc } from '../utils/react_query_trpc_client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';


function MyComponent(){
  const userQuery = trpc.gettodos.useQuery();

  return (
    <div>     
      <p>{userQuery.data ? useState.data : "Loading"}</p>

      {/* <button onClick={() => userCreator.mutate({ name: 'Frodo' })}>
        Create Frodo
      </button> */}
    </div>
  );
}
export function Page() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api',
          // You can pass any HTTP headers you wish here
        }),
      ],
    }),
  );
  

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MyComponent></MyComponent>
      </QueryClientProvider>
    </trpc.Provider>
  );
}