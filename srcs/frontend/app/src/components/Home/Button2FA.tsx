import { useNavigate } from "react-router-dom";

function ButtonSettings() {
	const navigate = useNavigate();
	function goTo2FA() {
		navigate("/settings");
	}
	return (
		<div>
			<button onClick={goTo2FA}> Go to Settings </button>
		</div>
	);
}

export default ButtonSettings;
