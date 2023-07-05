function ButtonDeleteCookie () {
	function deleteCookie() {
		document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "userPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		self.location.href = "http://localhost:8000";
	}

	return <button onClick={deleteCookie}>Delete Cookie</button>
}

export default ButtonDeleteCookie;