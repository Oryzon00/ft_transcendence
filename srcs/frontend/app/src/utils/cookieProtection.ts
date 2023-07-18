import getJwtTokenFromCookie from "./getJWT.ts";

export function cookieProtection() {
    if (!getJwtTokenFromCookie()) {
        self.location.href = "/";
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
