import { NavLink } from "react-router-dom";
import homeLogo from "./../../assets/homeLogo.png";
import homeLogoActive from "./../../assets/homeLogo-active.png";

export function HomeNavLink() {
	let activeClassName = "px-5 py-2 rounded-md";
	let normalClassName = "hover:bg-amber-800 px-5 py-2 rounded-md";
	return (
		<NavLink
			to="/home"
			className={({ isActive }) =>
				isActive ? activeClassName : normalClassName
			}
		>
			{({ isActive }) =>
				isActive ? (
					<img className="h-9 w-9" src={homeLogoActive} alt="Home" />
				) : (
					<img className="h-9 w-9" src={homeLogo} alt="HomeActive" />
				)
			}
		</NavLink>
	);
}
