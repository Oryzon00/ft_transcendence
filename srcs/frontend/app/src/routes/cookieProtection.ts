import getJwtTokenFromCookie from "../utils/getJWT";

export function cookieProtection() {
    if (!getJwtTokenFromCookie()) {
        document.cookie =`userPath=${self.location.href};Path=/`
        self.location.href = "http://localhost:8000"
    }
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
