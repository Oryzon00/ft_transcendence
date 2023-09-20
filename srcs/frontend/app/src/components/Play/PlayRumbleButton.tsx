import { useContext } from "react";
import SocketWrapper, {
	SocketWrapperContext
} from "../../utils/websockets/SocketWrapper";
import { ClientEvents } from "../../utils/websockets/types";

export function PlayRumbleButton() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);

	function searchRumbleGame() {
		sm.emit({
			event: ClientEvents.LobbyCreate,
			data: {
				mode: "Rumble"
			}
		});
	}

	return (
		<div>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={searchRumbleGame}>
    			Play Rumble PvP
  			</button>
		</div>
	);
}