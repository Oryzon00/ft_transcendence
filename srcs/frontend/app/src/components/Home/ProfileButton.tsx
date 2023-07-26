import { useNavigate } from "react-router-dom";

function ProfileButton () {
	const navigate = useNavigate();
	function goTo() {
		if (self.location.href === `http://${window.location.hostname}:8000/home`)
			navigate("/profile")
		else
			navigate("/home")
	}
	return <button onClick={goTo}>Profile</button>
}

export default ProfileButton;
