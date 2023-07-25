import "./PongLayout.styles.css";
import Pong from "../../components/Play/Pong";
import { cookieProtection } from "../../utils/cookieProtection";
import { ServerPayload } from "../../utils/websockets/ServerPayload";
import { ServerEvents } from "../../utils/websockets/types";

function PongLayout() {
	// cookieProtection();

	return (
		<>
			<h1>In Game</h1>
			<Pong />
		</>
	);
}

export default PongLayout;
