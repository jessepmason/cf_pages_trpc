import * as TrpcClient from '@trpc/client';
import type { AppRouter } from "../../cf/src/trpc_router"

// const trpc = TrpcClient.createTRPCClient<AppRouter>({});

const trpc = TrpcClient.createTRPCClient<AppRouter>({
    links: [],
  });

async function test(){
    const todos = await trpc.gettodos.query();
}




// export const Cp = () => {
//     const fetchUser = async () => {
//       const user = await trpcClient.
  
//       console.log(user);
//     };
  
//     React.useEffect(() => {
//       fetchUser();
//     }, []);
  
//     return <></>;
//   };
  
