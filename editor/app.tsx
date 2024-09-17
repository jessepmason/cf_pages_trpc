import React from "react"
import ReactDOM from "react-dom/client"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import { Timers } from "./pages/Counter";


const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="timer">Timer</Link>
        </div>
      ),
    },
    {
      path: "timer",
      element: <Timers></Timers>,
    },
  ]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);
  