import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthError from "./views/AuthPage/AuthError.tsx";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage.tsx";
import SettingsPage from "./views/SettingsPage/SettingsPage.tsx";
import HomePage from "./views/HomePage/HomePage.tsx";
import { ProfileLayoutLoader } from "./layouts/ProfileLayout/ProfileLayoutLoader.tsx";
import ProfileLayout from "./layouts/ProfileLayout/ProfileLayout.tsx";
import OTPLoginPopup from "./views/OTPPopup/OTPLoginPopup.tsx";
import LoginPage from "./views/LoginPage/LoginPage.tsx";
import AuthPage from "./views/AuthPage/AuthPage.tsx";
import { authLoader } from "./layouts/AuthLayout/AuthLoader.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
		errorElement: <NotFoundPage />
	},
	{
		path: "/home",
		element: <HomePage />, // HomePage != Homepage
		children: [
			{
				path: "/home/profile/",
				element: <ProfileLayout />,
				loader: ProfileLayoutLoader
			}
		]
	},
	{
		path: "/auth",
		element: <AuthPage />,
		loader: authLoader,
		errorElement: <AuthError />
	},
	{
		path: "/settings",
		element: <SettingsPage />
	},
	{
		path: "/test/settingsCSS",
		element: <OTPLoginPopup />
	}
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<>
		<ToastContainer />
		<RouterProvider router={router} />
	</>
	// </React.StrictMode>
);
