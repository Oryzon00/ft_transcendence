import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
	},
	{
		path: "/auth",
		element: <AuthPage />,
		loader: authLoader,
		errorElement: <NotFoundPage />
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
		path: "/profile/:username?",
		element: <ProfileLayout />,
		loader: ProfileLayoutLoader,
		errorElement: <NotFoundPage />
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
