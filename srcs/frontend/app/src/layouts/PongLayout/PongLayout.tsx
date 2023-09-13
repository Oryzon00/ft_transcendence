import "./PongLayout.styles.css";
import Pong from "../../components/Play/Pong";
import { cookieProtection } from "../../utils/cookieProtection";


function PongLayout() {
	cookieProtection();

	return (
		<div className="PongLayout">
			<Pong />
		</div>
	);
}

export default PongLayout;
