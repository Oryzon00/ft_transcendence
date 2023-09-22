function usernameProtection (username : string) {
	const regex = new RegExp('^[a-zA-Z0-9-_]{1,15}$')
	return (regex.test(username));
}

export default usernameProtection;