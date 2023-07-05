import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./routes/Auth/Auth";
import AuthError from "./routes/Auth/AuthError.tsx";
import { authLoader } from "./routes/Auth/Auth";
import TwoFA from "./routes/TwoFA/TwoFA.tsx";
import LoginPage from "./views/LoginPage/LoginPage.tsx";
import TwoFAPage from "./views/OTPPopup/OTPLoginPopup.tsx";
import SettingsPage from "./views/SettingsPage/SettingsPage.tsx";
import HomePage from "./views/HomePage/HomePage.tsx";
import OTPLoginPopup from "./views/OTPPopup/OTPLoginPopup.tsx";
import OTPSettingsPopup from "./views/OTPPopup/OTPSettingsPopup.tsx";
import { ProfileLayoutLoader } from "./layouts/ProfileLayout/ProfileLayoutLoader.tsx";
import ProfileLayout from "./layouts/ProfileLayout/ProfileLayout.tsx";
import LoginPageError from "./views/LoginPage/LoginErrorPage.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
		errorElement: <LoginPageError />
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
		path: "/2FA",
		element: <TwoFA />
	},
	{
		path: "/test/TwoFA",
		element: <TwoFAPage />
	},
	{
		path: "/settings",
		element: <SettingsPage />
	},
	{
		path: "/test/popup/login",
		element: <OTPLoginPopup />
	},
	{
		path: "/test/popup/settings",
		element: <OTPSettingsPopup />
	}
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
