import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export function HomeNavLink() {
	let activeClassName = "px-2 lg:px-3 py-2 rounded-md shrink-0";
	let normalClassName =
		"hover:bg-amber-800 px-2 lg:px-3 py-2 rounded-md shrink-0";

	return (
		<NavLink
			to="/home"
			className={({ isActive }) =>
				isActive ? activeClassName : normalClassName
			}
		>
			{({ isActive }) =>
				isActive ? (
					<AiFillHome
						className="h-11 w-11"
						color="#92400e"
						title="HomeActive"
					/>
				) : (
					<AiFillHome className="h-11 w-11" title="HomeInactive" />
				)
			}
		</NavLink>
	);
}
