import { Link } from "react-router-dom";

export function NavBar() {
	return (
		<nav>
			<Link to="/home">HOME</Link>
			<ul>
				<li>
					<Link to="/play">PLAY</Link>
				</li>
				<li>
					<Link to="/leaderboard">LEADERBOARD</Link>
				</li>
				<li>
					<Link to="/chat">CHAT</Link>
				</li>
				<li>
					<Link to="/settings">SETTINGS</Link>
				</li>
				<input
					type="search"
					id="mySearch"
					name="q"
					placeholder="Search for a user..."
				></input>
			</ul>
		</nav>
	);
}
