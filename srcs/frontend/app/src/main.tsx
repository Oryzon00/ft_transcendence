import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
//import App from './App.tsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import  Root from "./routes/root/root.tsx"
import  Homepage from "./routes/Home/Home"
import  Auth from "./routes/Auth/Auth"
import  RootError from "./routes/root/rootError.tsx";
import { Chat } from "./chat/chat";
import AuthError from "./routes/Auth/AuthError.tsx";
import {authLoader} from "./routes/Auth/Auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <RootError />,
        /*loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
            },
        ],*/
    },
    {
        path: "/home",
        element: <Homepage />,
    },
    {
        path: "/auth",
        element: <Auth />,
        loader: authLoader,
        errorElement: <AuthError />
    },
    {
        path: "/chat",
        element: <Chat />,
        loader: authLoader,
        errorElement: <AuthError />
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
