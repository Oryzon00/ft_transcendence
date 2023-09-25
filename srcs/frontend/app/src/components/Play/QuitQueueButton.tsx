import { useContext } from "react";
import SocketWrapper, {
	SocketWrapperContext
} from "../../utils/websockets/SocketWrapper";
import { ClientEvents } from "../../utils/websockets/types";

export function QuitQueueButton() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);

	function QuitQueue() {
		console.log("emitting");
		sm.emit({
			event: ClientEvents.LobbyLeave,
		});
	}

	return (
			 <button className="bg-[#1a1a1a] hover:bg-[#323232] text-white font-bold py-2 px-4 border-2 border-amber-800" onClick={QuitQueue}>
				<div className="PVE-button">
					<h1>
						Quit Queue
					</h1>
				</div>
  			</button>
	);
}

export default QuitQueueButton;
