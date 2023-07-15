import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import { notifyError } from "../../utils/notify.ts";

export function ProfileLayoutLoader() {
	const url = "http://localhost:3000/user/me";
	const data = fetch(url, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie()
		}
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					"Request failed with status " + response.status
				);
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			notifyError(error.message);
		});
	return data;
}
