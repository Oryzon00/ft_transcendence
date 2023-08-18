import { NavLink } from "react-router-dom";
import { RiPingPongFill } from "react-icons/ri";

export function GameNavLink() {
	return (
		<NavLink
			to="/play"
			className="text-white text-xl font-bold bg-amber-800 lg:px-5 px-2 py-2 rounded-md"
		>
			<div className="flex flex-row justify-center items-center">
				<RiPingPongFill className="h-20 w-20" title="GameNavLink" />
				<p> Play !</p>
			</div>
		</NavLink>
	);
}
