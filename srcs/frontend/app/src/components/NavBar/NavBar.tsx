import { NavLink } from "react-router-dom";
import { UserMenu } from "./UserMenu";

export function NavBar() {
	let activeClassName =
		"text-amber-800 text-lg font-semibold px-3 py-2 rounded-md";
	let normalClassName =
		"text-white text-lg font-semibold hover:bg-amber-800 px-3 py-2 rounded-md";

	return (
		<nav>
			<div className="max-w-6xl mx-auto px-2 ">
				<div className="flex items-center justify-between h-20">
					<div className="flex">
						<NavLink
							to="/home"
							className={({ isActive }) =>
								isActive ? activeClassName : normalClassName
							}
						>
							HOME
						</NavLink>
					</div>
					<div className="flex">
						<NavLink
							to="/play"
							className={({ isActive }) =>
								isActive ? activeClassName : normalClassName
							}
						>
							PLAY
						</NavLink>
						<NavLink
							to="/leaderboard"
							className={({ isActive }) =>
								isActive ? activeClassName : normalClassName
							}
						>
							LEADERBOARD
						</NavLink>
						<NavLink
							to="/chat"
							className={({ isActive }) =>
								isActive ? activeClassName : normalClassName
							}
						>
							CHAT
						</NavLink>
					</div>
					<input
						className="px-3 py-2 rounded-md"
						type="search"
						id="mySearch"
						name="q"
						placeholder="Search for a user..."
					></input>
					<div className="flex">
						<UserMenu />
					</div>
				</div>
			</div>
		</nav>
	);
}
