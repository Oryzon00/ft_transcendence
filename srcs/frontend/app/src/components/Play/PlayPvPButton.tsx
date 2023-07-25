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
			<button onClick={searchPvPGame}> Ranked PvP </button>
		</div>
	);
}

export default PlayPvPButton;
