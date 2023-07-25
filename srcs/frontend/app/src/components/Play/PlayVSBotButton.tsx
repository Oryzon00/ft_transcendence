import { useContext } from "react";
import SocketWrapper, {
	SocketWrapperContext
} from "../../utils/websockets/SocketWrapper";
import { ClientEvents } from "../../utils/websockets/types";

function PlayVSBotButton() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);

	function createPvEGame() {
		sm.emit({
			event: ClientEvents.LobbyCreate,
			data: {
				mode: "PvE"
			}
		});
	}

	return (
		<div>
			<button onClick={createPvEGame}> Train against bot </button>
		</div>
	);
}

export default PlayVSBotButton;
