import { useContext } from "react";
import SocketWrapper, { SocketWrapperContext } from "../../routes/Play/SocketWrapper";
import { ClientEvents } from "../../routes/Play/types";

function PlayPvPButton() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);

	function searchPvPGame() {
		sm.emit({
			event: ClientEvents.LobbyCreate,
			data: {
			  mode: "PvP",
		  },
	  });
	}

return (
	<div>
		<button onClick={searchPvPGame}> Ranked PvP </button>
	</div>
);
}

export default PlayPvPButton;