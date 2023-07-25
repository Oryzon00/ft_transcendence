import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import { notifyError } from "../../utils/notify.ts";
import { throwErrorMessage } from "../../utils/throwErrorMessage.ts";

export function ProfileLayoutLoader() {
	const url = `http://${window.location.hostname}:3000/user/me`;
	const data = fetch(url, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie()
		}
	})
		.then((response) => {
			if (!response.ok) throwErrorMessage(response);
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
