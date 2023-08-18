import { Outlet } from "react-router-dom";
// import ButtonSettings from "../../components/Home/Button2FA.tsx";
// import User from "../../components/Home/User.tsx";
// import ProfileButton from "../../components/Home/ProfileButton.tsx";
import "./HomeLayout.styles.css";
import { GameNavLink } from "../../components/Home/GameNavLink";

function HomeLayout() {
	return (
		//Pourquoi outlet ?
		<div className="home-root">
			<Outlet /> 
			
			<div className="main-site">
				{/* <div>Welcome home !</div> */}
				
				{/* <User></User>
				<ButtonSettings />
				<ProfileButton /> */}

				<GameNavLink />
			</div>
		</div>
	);
}

export default HomeLayout;
