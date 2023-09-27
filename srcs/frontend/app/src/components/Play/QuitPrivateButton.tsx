import { useContext } from "react";
import SocketWrapper, {
	SocketWrapperContext
} from "../../utils/websockets/SocketWrapper";
import { ClientEvents } from "../../utils/websockets/types";

export function QuitPrivateButton({ show }: { show: boolean }) {
	const sm: SocketWrapper = useContext(SocketWrapperContext);

	function QuitPrivate() {
		console.log("emitting");
		sm.emit({
			event: ClientEvents.PrivateLeave,
		});
	}

	if (!show) {
		return null;
	} else {
		return (
			<button
				className=" my-2 px-5 py-3 rounded-md hover:bg-red-800 text-white text border-white text-4xl font-semibold border-4 bg-zinc-500"
				onClick={QuitPrivate}
			>
				Quit Private
			</button>
		);
	}
}

export default QuitPrivateButton;