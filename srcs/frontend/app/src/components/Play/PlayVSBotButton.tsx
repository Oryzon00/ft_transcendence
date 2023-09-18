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
			 <button className="bg-[#242424] hover:bg-[#323232] text-white font-bold py-2 px-4 border-2 border-amber-800" onClick={createPvEGame}>
				<h1>
					NOTS
				</h1>
				<span>
					LERGERGVSF R HHBR GV RTH B AS
				</span>
				<span>
					LERGERGVSF R HHBR GV RTH B AS
				</span>

  			</button>
	);
}

export default PlayVSBotButton;
