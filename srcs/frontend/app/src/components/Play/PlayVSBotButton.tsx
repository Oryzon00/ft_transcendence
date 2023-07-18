import { useContext } from "react";
import SocketWrapper, { SocketWrapperContext } from "../../routes/Play/SocketWrapper";
import { ClientEvents } from "../../routes/Play/types";

function PlayVSBotButton() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);

	function createPvEGame() {
		sm.emit({
			event: ClientEvents.LobbyCreate,
			data: {
			  mode: "PvE",
		  },
	  });
	}

return (
	<div>
		<button onClick={createPvEGame}> Train against bot </button>
	</div>
);
}

export default PlayVSBotButton;