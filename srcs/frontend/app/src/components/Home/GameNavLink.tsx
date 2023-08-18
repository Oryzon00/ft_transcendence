import { NavLink } from "react-router-dom";
import { RiPingPongFill } from "react-icons/ri";

export function GameNavLink() {
	return (
		<NavLink
			to="/play"
			className="text-white text-xl font-bold border-4 bg-zinc-700 hover:bg-amber-800 lg:px-5 px-2 py-2 rounded-md"
		>
			<div className="flex flex-row justify-center items-center">
				<RiPingPongFill
					className="h-20 w-20 mr-4"
					title="GameNavLink"
				/>
				<h2 className="text-4xl"> PLAY </h2>
			</div>
		</NavLink>
	);
}
