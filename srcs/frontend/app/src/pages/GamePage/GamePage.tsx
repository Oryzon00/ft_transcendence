import { useContext, useState } from "react";
import GameLayout from "../../layouts/GameLayout/GameLayout";
import SocketWrapper, { SocketWrapperContext, SocketWrapperProvider } from "../../routes/Play/SocketWrapper";
import { UserProvider } from "../../utils/contexts/userContext";
import PongLayout from "../../layouts/PongLayout/PongLayout";

function GamePage() {
	const sm: SocketWrapper = useContext(SocketWrapperContext);
	const [inLobby, setInLobby] = useState(Boolean(false));

// transferer listeners et ajouter PongProps.

	if (inLobby) {
		return (
			<UserProvider>
				<SocketWrapperProvider value={sm}>
					<PongLayout />
				</SocketWrapperProvider>
			</UserProvider>
		)
	}
	else {
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