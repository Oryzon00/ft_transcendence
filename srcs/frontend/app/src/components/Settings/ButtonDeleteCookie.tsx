import { useNavigate } from "react-router";

export function LogOutButton () {
	const navigate = useNavigate();

	function deleteCookie() {
		document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "userPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		navigate("/");
	}

	return <button onClick={deleteCookie}>Log Out</button>
}
