import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import { notifyError } from "../../utils/notify.ts";

export async function ProfileLayoutLoader({ params }:any) {
	let url;
	if (params.username === undefined)
		url = `http://${window.location.hostname}:3000/user/me`;
	else
		url = `http://${window.location.hostname}:3000/user/find?username=` + params.username;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie()
		}
	});
	if (!response.ok) {
		notifyError("User " + response.statusText);
		throw new Response("User " + response.statusText, { status: response.status });
	}
	const data = await response.json()
		.then((data) => {
			return data;
		})
		.catch((error) => {
			notifyError(error.message);
		});
	return data;
}
