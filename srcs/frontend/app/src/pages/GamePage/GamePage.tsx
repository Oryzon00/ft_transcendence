import { useContext, useEffect, useState } from "react";
import GameLayout from "../../layouts/GameLayout/GameLayout";
import SocketWrapper, {
	SocketWrapperContext,
	SocketWrapperProvider
} from "../../utils/websockets/SocketWrapper";
import { UserProvider } from "../../utils/contexts/userContext";
import PongLayout from "../../layouts/PongLayout/PongLayout";
import { Listener, ServerEvents } from "../../utils/websockets/types";
import { ServerPayload } from "../../utils/websockets/ServerPayload";
import { notifyInfo } from "../../utils/notify";

function GamePage() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);
	const [inLobby, setInLobby] = useState(Boolean(false));

	useEffect(() => {
		const onGameMessage: Listener<
			ServerPayload[ServerEvents.GameMessage]
		> = ({ message }) => {
			if (message === "Game is Starting") {
				notifyInfo("Game found !");
				setInLobby(true);
			}
			if (message === "Game is Finished") {
				notifyInfo("Game ended, rank updating...");
				setInLobby(false);
			}
			console.log(message);
		};

		console.log("adding listeners");
		sm.addListener(ServerEvents.GameMessage, onGameMessage);

		return () => {
			console.log("removing listeners");
			sm.removeListener(ServerEvents.GameMessage, onGameMessage);
		};
	}, []);

	if (inLobby) {
		return (
			<UserProvider>
				<SocketWrapperProvider value={sm}>
					<PongLayout />
				</SocketWrapperProvider>
			</UserProvider>
		);
	} else {
		return (
			<UserProvider>
				<SocketWrapperProvider value={sm}>
					<GameLayout />
				</SocketWrapperProvider>
			</UserProvider>
		);
	}
}

export default GamePage;
