import { NavLink } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

export function LeaderboardNavLink() {
	let activeClassName = "px-2 lg:px-3 py-2 rounded-md shrink-0";
	let normalClassName =
		"hover:bg-amber-800 px-2 lg:px-3 py-2 rounded-md shrink-0";

	return (
		<NavLink
			to="/leaderboard"
			className={({ isActive }) =>
				isActive ? activeClassName : normalClassName
			}
		>
			{({ isActive }) =>
				isActive ? (
					<FaCrown
						className="h-11 w-11"
						color="#92400e"
						title="HomeActive"
					/>
				) : (
					<FaCrown className="h-11 w-11" title="HomeInactive" />
				)
			}
		</NavLink>
	);
}
