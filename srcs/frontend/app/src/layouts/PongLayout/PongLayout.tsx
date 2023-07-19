import './PongLayout.styles.css'
import Pong from "../../components/Play/Pong";
import { cookieProtection } from "../../utils/cookieProtection";
import { ServerPayload } from '../../routes/Play/ServerPayload';
import { ServerEvents } from '../../routes/Play/types';

function PongLayout() {
	cookieProtection();

	return (
		<>
			<h1>In Game</h1>
			<Pong />
		</>
	);
}

export default PongLayout;
