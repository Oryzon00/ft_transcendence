import { NavBar } from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { UserStatus } from "../../components/UserStatus/UserStatus";

export function NavBarLayout() {
	return (
		<>
			<header>
				<NavBar />
				<UserStatus />
			</header>
			<Outlet />
		</>
	)
}
