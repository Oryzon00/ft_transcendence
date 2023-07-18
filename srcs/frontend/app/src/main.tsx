import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthError from "./pages/AuthPage/AuthError.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import { ProfileLayoutLoader } from "./layouts/ProfileLayout/ProfileLayoutLoader.tsx";
import ProfileLayout from "./layouts/ProfileLayout/ProfileLayout.tsx";
import OTPLoginPopup from "./pages/OTPPopup/OTPLoginPopup.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
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
		element: <HomePage />,
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
