import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../utils/contexts/userContext";
import { SettingsNavLink } from "./SettingsNavLink";

export function UserMenu() {
	const userHook = useContext(UserContext);

	return (
		<div className="flex items-center space-x-4 px-3 py-2 shrink-0">
			<NavLink to="/profile" className="shrink-0 px-3 ">
				<img
					className="h-12 w-12 rounded-full "
					src={userHook.user.image}
					alt="Profile Avatar"
				/>
			</NavLink>
			<div className="flex flex-col">
				<NavLink
					to="/profile"
					className="text-white text-lg font-semibold px-0 rounded-md hover:underline"
				>
					{userHook.user.name}
				</NavLink>
				<NavLink
					to="/leaderboard"
					className="text-gray-400 text-base font-semibold px-0 rounded-md hover:underline"
				>
					rank: {userHook.user.rank}
				</NavLink>
			</div>
			<SettingsNavLink />
		</div>
	);
}
