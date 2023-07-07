import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./routes/Auth/Auth";
import AuthError from "./routes/Auth/AuthError.tsx";
import { authLoader } from "./routes/Auth/Auth";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage.tsx";
import SettingsPage from "./views/SettingsPage/SettingsPage.tsx";
import HomePage from "./views/HomePage/HomePage.tsx";
import { ProfileLayoutLoader } from "./layouts/ProfileLayout/ProfileLayoutLoader.tsx";
import ProfileLayout from "./layouts/ProfileLayout/ProfileLayout.tsx";
import OTPLoginPopup from "./views/OTPPopup/OTPLoginPopup.tsx";
import LoginPage from "./views/LoginPage/LoginPage.tsx";

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
		element: <Auth />,
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
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
