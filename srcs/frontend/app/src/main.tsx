import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/Home/Home";
import Auth from "./routes/Auth/Auth";
import RootError from "./routes/root/rootError.tsx";
import AuthError from "./routes/Auth/AuthError.tsx";
import { authLoader } from "./routes/Auth/Auth";
import { ProfileMenuLoader } from "./routes/Profile/ProfileMenu.tsx";
import ProfileMenu from "./routes/Profile/ProfileMenu.tsx";
import TwoFA from "./routes/TwoFA/TwoFA.tsx";
import LoginPage from "./views/LoginPage/LoginPage.tsx";
import TwoFAPage from "./views/OTPPopup/OTPLoginPopup.tsx";
import SettingsPage from "./views/SettingsPage/SettingsPage.tsx";
import HomePage from "./views/HomePage/HomePage.tsx";
import OTPLoginPopup from "./views/OTPPopup/OTPLoginPopup.tsx";
import OTPSettingsPopup from "./views/OTPPopup/OTPSettingsPopup.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
		errorElement: <RootError />
	},
	{
		path: "/home",
		element: <Homepage />, // HomePage != Homepage
		children: [
			{
				path: "/home/profile/",
				element: <ProfileMenu />,
				loader: ProfileMenuLoader
			}
		]
	},
	{
		path: "/test/home",
		element: <HomePage /> // HomePage != Homepage
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
