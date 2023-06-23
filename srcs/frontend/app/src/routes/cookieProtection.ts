function isEmptyString(str: string) {
    return str === null || str === undefined || str.trim().length === 0;
}
export function cookieProtection() {
    if (isEmptyString(document.cookie))
        self.location.href = "http://localhost:8000"
}

export function authProtection() {
    if (!isEmptyString(document.cookie))
        self.location.href = "http://localhost:8000/home"
}