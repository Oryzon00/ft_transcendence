export function cookieProtection() {
    if (!getJwtTokenFromCookie()) {
        document.cookie =`userPath=${self.location.href};Path=/`
        self.location.href = "http://localhost:8000"
    }
}

export function getJwtTokenFromCookie(): string | null {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith("JWT" + "=")) {
			const token = cookie.substring("JWT".length + 1);
			return decodeURIComponent(token);
		}
	}
	return null;
}

export function getUserPathTokenFromCookie(): string | null {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith("userPath" + "=")) {
			const token = cookie.substring("userPath".length + 1);
			return decodeURIComponent(token);
		}
	}
	return null;
}