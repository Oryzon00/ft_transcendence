import { Link } from "react-router-dom";

export function NavBar() {
	return (
		<nav classname="navbar navbar-expand-lg">
			<Link to="/home">HOME</Link>
			<ul>
				<Link to="/home">HOME</Link>
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
				<button>SEARCHBAR</button>
				<button>USER PROFILE</button>
			</ul>
			<button>SEARCHBAR</button>
			<button>USER PROFILE</button>
		</nav>
	);
}
