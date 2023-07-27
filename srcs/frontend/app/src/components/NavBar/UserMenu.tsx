import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/contexts/userContext";

export function UserMenu() {
	const userHook = useContext(UserContext);
	return (
		<>
			<div className="flex items-center space-x-4">
				<Link to="/profile">
					<img
						className="h-12 w-12 rounded-full"
						src={userHook.user.image}
						alt="Rounded avatar"
					/>
				</Link>
				<div className="flex flex-col">
					<Link
						to="/profile"
						className="text-white text-md font-semibold px-3 rounded-md"
					>
						{userHook.user.name}
					</Link>
					<Link
						to="/leaderboard"
						className="text-gray-400 text-md font-semibold px-3 rounded-md"
					>
						rank: {userHook.user.rank}
					</Link>
				</div>
				<Link
					to="/settings"
					className="text-white text-lg font-semibold hover:bg-amber-800 px-3 py-2 rounded-md"
				>
					SETTINGS
				</Link>
			</div>
		</>
	);
}
