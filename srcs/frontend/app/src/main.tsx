import * as React from "react";
import * as ReactDOM from "react-dom/client";
//import App from './App.tsx'
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root/root.tsx";
import Homepage from "./routes/Home/Home";
import Auth from "./routes/Auth/Auth";
import RootError from "./routes/root/rootError.tsx";
import AuthError from "./routes/Auth/AuthError.tsx";
import {authLoader} from "./routes/Auth/Auth";
import { ProfileMenuLoader } from './routes/Profile/ProfileMenu.tsx';
import ProfileMenu from './routes/Profile/ProfileMenu.tsx';
import TwoFA from "./routes/TwoFA/TwoFA.tsx";
import LoginPage from "./views/LoginPage/LoginPage.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <RootError />
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
        children : [
            {
                path: "/home/profile/",
                element: <ProfileMenu />,
                loader: ProfileMenuLoader,
            },
        ],
    },
    {
        path: "/auth",
        element: <Auth />,
        loader: authLoader,
        errorElement: <AuthError />
    },
	{
		path: "/2FA",
		element: <TwoFA />
	},
    {
        path: "/test/login",
        element: <LoginPage />
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
