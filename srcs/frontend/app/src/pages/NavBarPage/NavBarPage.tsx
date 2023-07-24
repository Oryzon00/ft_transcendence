import { NavBarLayout } from "../../layouts/NavBar/NavBarLayout";
import { cookieProtection } from "../../utils/cookieProtection";

export function NavBarPage() {
	cookieProtection();
	return <NavBarLayout />;
}
