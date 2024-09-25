import type { AppRouter } from "../../cf/src/trpc_router"
import { createTRPCReact } from '@trpc/react-query';
 
export const trpc = createTRPCReact<AppRouter>();