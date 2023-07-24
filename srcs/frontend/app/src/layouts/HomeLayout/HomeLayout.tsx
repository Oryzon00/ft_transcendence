import { Outlet } from "react-router-dom";
import ButtonSettings from "../../components/Home/Button2FA.tsx";
import User from "../../components/Home/User.tsx";
import ProfileButton from "../../components/Home/ProfileButton.tsx";
import "./HomeLayout.styles.css";

function HomeLayout() {

	return (
		<div className="home-root">
			<div className="profile-button">
				<ProfileButton />
			</div>
			<Outlet />
			<div className="main-site">
				<div>Welcome home !</div>
				<User></User>
				<ButtonSettings />
			</div>
			<div />
		</div>
	);
}

export default HomeLayout;
