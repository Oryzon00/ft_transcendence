import { useNavigate } from "react-router-dom";

function ButtonToLogin () {
	const navigate = useNavigate();
	function goToLogin() {
		navigate("/");
	}

	return <button onClick={goToLogin}>Go to Login Page</button>
}

export default ButtonToLogin;