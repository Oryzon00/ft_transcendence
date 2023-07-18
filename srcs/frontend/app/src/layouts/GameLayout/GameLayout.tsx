import PlayPvPButton from "../../components/Play/PlayPvPButton";
import PlayVSBotButton from "../../components/Play/PlayVSBotButton";
import { cookieProtection } from "../../utils/cookieProtection";

function GameLayout() {
	cookieProtection();

	return (
		<>
			<h1>Game Menu</h1>
			<PlayVSBotButton />
			<PlayPvPButton />
		</>
	);
}

export default GameLayout;