import { Link } from "react-router-dom";

export function NavBar() {
	return (
		<nav>
			<a href="/">HOME</a>
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
			</ul>
			<div>SEARCHBAR</div>
			<div>USER PROFILE</div>
		</nav>
	);
}
