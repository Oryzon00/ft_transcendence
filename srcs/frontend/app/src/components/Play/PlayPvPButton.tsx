import { useContext } from "react";
import SocketWrapper, {
	SocketWrapperContext
} from "../../utils/websockets/SocketWrapper";
import { ClientEvents } from "../../utils/websockets/types";

function PlayPvPButton() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);

	function searchPvPGame() {
		sm.emit({
			event: ClientEvents.LobbyCreate,
			data: {
				mode: "PvP"
			}
		});
	}

	return (
		<div>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={searchPvPGame}>
    			Play Ranked PvP
  			</button>
		</div>
	);
}


 

export default PlayPvPButton;
