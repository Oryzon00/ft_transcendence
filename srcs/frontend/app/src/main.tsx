import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
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
import { NavBarLayout } from "./layouts/NavBar/NavBarLayout.tsx";
import { PlayPage } from "./pages/PlayPage/PlayPage.tsx";
import { LeaderboardPage } from "./pages/LeaderboardPage/LeaderboardPage.tsx";
import { ChatPage } from "./pages/ChatPage/ChatPage.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
		errorElement: <NotFoundPage />
	},
	{
		element: <NavBarLayout />,
		children: [
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
			},
			{
				path: "/play",
				element: <PlayPage />
			},
			{
				path: "/leaderboard",
				element: <LeaderboardPage />
			},
			{
				path: "/chat",
				element: <ChatPage />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<ToastContainer />
		<RouterProvider router={router}></RouterProvider>
	</>
);
