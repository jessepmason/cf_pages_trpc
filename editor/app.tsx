import React from "react"
import ReactDOM from "react-dom/client"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import { Timers } from "./pages/Counter";
import { Page } from "./pages/ReactQuery";
import * as ReactQuery2 from "./pages/React_Query_Trpc";
// import * as TRPC from '@trpc/react-';
import type { AppRouter } from '../cf/src/trpc_router';
import {trpc} from "./utils/trpc_client"

// const trpc = TRPC.createTRPCProxyClient<AppRouter>({

// });
const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div style={{display:"flex",gap:"10px"}}>
          <Link to="timer">Timer</Link>
          <Link to="reactquery">React Query</Link>
          <Link to="reactquery2">React Query 2</Link>
        </div>
      ),
    },
    {
      path: "timer",
      element: <Timers></Timers>,
    },
    {
      path: "reactquery",
      element: <Page></Page>,
    },
    {
      path: "reactquery2",
      element: <ReactQuery2.Page></ReactQuery2.Page>,
    },
  ]);
async function test(){
  const result = await trpc.user.gettodo.query();
  console.log("rtrpc esults",result)
}
test();

console.log(window.location.hostname)
ReactDOM.createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);
  