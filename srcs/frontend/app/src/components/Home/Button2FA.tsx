import { useNavigate } from "react-router-dom";

function Button2FA() {
	const navigate = useNavigate();
	function goTo2FA() {
		navigate("/settings");
	}
	return (
		<div>
			<button onClick={goTo2FA}> Go to 2FA </button>
		</div>
	);
}

export default Button2FA;