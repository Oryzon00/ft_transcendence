import api42Address from "../../utils/api42Address";
import "./LoginButton.styles.css";
import getJwtTokenFromCookie from "../../utils/getJWT.ts";

function LoginButton() {
	function goToApi42() {
		self.location.href = api42Address;
	}
	 if (getJwtTokenFromCookie())
		self.location.href = "http://localhost:8000/home";
	return (
		<button className="signin-button" onClick={goToApi42}>
			<span className="text-2">Sign in with 42</span>
		</button>
	);
}

export default LoginButton;
