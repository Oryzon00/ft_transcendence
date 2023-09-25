import "./PongLayout.styles.css";
import Pong from "../../components/Play/Pong";
import { cookieProtection } from "../../utils/cookieProtection";
import { UserHook } from "../../utils/hooks/TuseUser";
import SocketWrapper, {
	SocketWrapperContext
} from "../../utils/websockets/SocketWrapper";
import { useContext, useEffect, useState } from "react";
import {
	ClientEvents,
	Listener,
	ServerEvents
} from "../../utils/websockets/types";
import { ServerPayload } from "../../utils/websockets/ServerPayload";
import { notifyInfo } from "../../utils/notify";
import { PlayRumbleButton } from "../../components/Play/PlayRumbleButton";
import PlayPvPButton from "../../components/Play/PlayPvPButton";
import PlayVSBotButton from "../../components/Play/PlayVSBotButton";
import { UserContext } from "../../utils/contexts/userContext";
import { QuitQueueButton } from "../../components/Play/QuitQueueButton";

function PongLayout() {
	cookieProtection();
	let userHook: UserHook = useContext(UserContext);
	const sm: SocketWrapper = useContext(SocketWrapperContext);
	const [inLobby, setInLobby] = useState("");
	const [inQueue, setInQueue] = useState(false);

	useEffect(() => {
		const onGameMessage: Listener<
			ServerPayload[ServerEvents.GameMessage]
		> = ({ message, mode, lobbyId, player1MMR, player2MMR }) => {
			if (message === "Game is Starting") {
				setInLobby(lobbyId);
			}
			if (message === "Game is Finished") {
				setInLobby("");
				if (mode === "PvP") {
					userHook.setUser({
						...userHook.user,
						mmr:
							Number(player1MMR.split(" ")[0]) ===
							userHook.user.id
								? Number(player1MMR.split(" ")[1])
								: Number(player2MMR.split(" ")[1])
					});
					notifyInfo("Game ended, rank updated.");
				}
			}
			console.log(message);
		};

		const onQueueJoined: Listener<ServerPayload[ServerEvents.QueueJoined]>
		 = () => {console.log("queue joined "); setInQueue(true)};

		const onQueueLeft: Listener<ServerPayload[ServerEvents.QueueLeft]>
		 = () => {console.log("queue left "); setInQueue(false)};


		console.log("adding listeners");
		sm.addListener(ServerEvents.GameMessage, onGameMessage);
		sm.addListener(ServerEvents.QueueJoined, onQueueJoined);
		sm.addListener(ServerEvents.QueueLeft, onQueueLeft);

		return () => {
			console.log("removing listeners");
			sm.removeListener(ServerEvents.GameMessage, onGameMessage);
			sm.removeListener(ServerEvents.QueueJoined, onQueueJoined);
			sm.removeListener(ServerEvents.QueueLeft, onQueueLeft);
			sm.emit({event: ClientEvents.LobbyLeave});
		};
	}, [userHook.user.mmr]);

	return (
		<>
			{(inLobby.length > 0 && (
				<div className="PongLayout">
					<Pong />
				</div>
			)) || (
				<>
					<div className="play-page">
						<PlayVSBotButton />
						<PlayPvPButton />
						<PlayRumbleButton />
					</div>
					<div className="flex flex-row justify-center items-center">
						<QuitQueueButton show={inQueue} />
					</div>
				</>
			)}
		</>
	);
}

export default PongLayout;
