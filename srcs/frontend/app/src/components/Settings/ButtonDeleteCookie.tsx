import { useNavigate } from "react-router";

export function LogOutButton() {
	const navigate = useNavigate();

	function deleteCookie() {
		document.cookie =
			"JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie =
			"userPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		navigate("/");
		location.reload();
	}

	return (
		<button
			className="mx-2 px-2 py-1 rounded-md hover:bg-red-800 text-white font-semibold border-4 bg-zinc-500"
			onClick={deleteCookie}
		>
			Log Out
		</button>
	);
}
