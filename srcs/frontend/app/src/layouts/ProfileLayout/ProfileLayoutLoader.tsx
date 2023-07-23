import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import { notifyError } from "../../utils/notify.ts";
import { throwErrorMessage } from "../../utils/throwErrorMessage.ts";

export function ProfileLayoutLoader({ params }:any) {
	let url;
	if (params.username === undefined)
		url = "http://localhost:3000/user/me";
	else
		url = "http://localhost:3000/user/find?username=" + params.username;

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
			return null;
		});
	return data;
}
