import api42Address from "../../utils/api42Address";
import "./LoginButton.styles.css";
import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function LoginButton() {
	const navigate = useNavigate();

	function goToApi42() {
		self.location.href = api42Address;
	}

	useEffect(() => {
		if (getJwtTokenFromCookie()) {
			setTimeout(navigate, 500, "/home");
		}
	});

	return (
		<button className="signin-button" onClick={goToApi42}>
			<span className="text-2">Sign in with 42</span>
		</button>
	);
}

export default LoginButton;
