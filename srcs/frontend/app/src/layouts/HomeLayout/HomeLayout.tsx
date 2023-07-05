import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cookieProtection } from "../../routes/cookieProtection.ts";
import Button2FA from "../../components/Home/Button2FA.tsx";
import User from "../../components/Home/User.tsx";
import ButtonDeleteCookie from "../../components/Home/ButtonDeleteCookie.tsx";
import ProfileButton from "../../components/Home/ProfileButton.tsx";
import './HomeLayout.styles.css'

function HomeLayout() {
	cookieProtection();
	const [count, setCount] = useState(0);

	return (
		<div className="home-root">
			<div className="profile-button">
				<ProfileButton />
			</div>
			<Outlet />
			<div className="main-site">
				<div className="card">
					<button onClick={() => setCount((count) => count + 1)}>
						truc {count}
					</button>
				</div>
				<div>Welcome home !</div>
				<User></User>
				<Button2FA></Button2FA>
				<ButtonDeleteCookie />
			</div>
			<div />
		</div>
	);
}

export default HomeLayout;
