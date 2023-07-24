import { Link } from "react-router-dom";

export function NavBar() {
	return (
		<nav>
			<div className="max-w-6xl mx-auto px-2">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-start">
						<Link
							to="/home"
							className="text-white text-lg font-bold hover:bg-amber-800 px-3 py-2 rounded-md"
						>
							HOME
						</Link>
					</div>
					<div className="flex">
						<Link
							to="/play"
							className="text-white text-lg font-semibold hover:bg-amber-800 px-3 py-2 rounded-md"
						>
							PLAY
						</Link>
						<Link
							to="/leaderboard"
							className="text-white text-lg font-semibold hover:bg-amber-800 px-3 py-2 rounded-md"
						>
							LEADERBOARD
						</Link>
						<Link
							to="/chat"
							className="text-white text-lg font-semibold hover:bg-amber-800 px-3 py-2 rounded-md"
						>
							CHAT
						</Link>
						<input
							className="px-3 py-2 rounded-md"
							type="search"
							id="mySearch"
							name="q"
							placeholder="Search for a user..."
						></input>
					</div>
					<div className="flex items-end">
						<Link
							to="/profile"
							className="text-white text-lg font-bold"
						>
							USER PROFILE
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
