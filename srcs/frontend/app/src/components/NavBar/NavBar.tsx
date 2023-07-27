import { NavLink } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { SearchUserInput } from "./SearchUserInput";
import homeLogo from "./../../assets/homeLogo.png";
import homeLogoActive from "./../../assets/homeLogo-active.png";

export function NavBar() {
	let activeClassName =
		"text-amber-800 text-xl font-bold px-5 py-2 rounded-md";
	let normalClassName =
		"text-white text-xl font-bold hover:bg-amber-800 px-5 py-2 rounded-md";

	return (
		<nav className="">
			<div className="max-w-full  mx-auto px-4">
				<div className="flex items-center justify-between h-20 ">
					<div className="flex">
						<NavLink
							to="/home"
							className={({ isActive }) =>
								isActive ? activeClassName : normalClassName
							}
						>
							{({ isActive }) =>
								isActive ? (
									<img
										className="h-9 w-9"
										src={homeLogoActive}
										alt="Home"
									/>
								) : (
									<img
										className="h-9 w-9"
										src={homeLogo}
										alt="HomeActive"
									/>
								)
							}
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

					<SearchUserInput />
					<UserMenu />
				</div>
			</div>
		</nav>
	);
}
