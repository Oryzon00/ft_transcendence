import { authProtection } from "../cookieProtection.ts";
import { useLoaderData } from "react-router-dom";
import { api_adress } from "../../api_adress.ts";

export async function authLoader() {
	const params = new URLSearchParams(window.location.search);

	if (params.get("error")) throw new Response("Auth Error", { status: 401 });
	else if (params.get("code")) {
		const url = api_adress + "/auth";
		const body = JSON.stringify({
			code: params.get("code")
		});
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: body
		});
		if (!res.ok) throw new Response("Auth Error", { status: 401 });
		else {
			await res.json().then(function (token) {
				document.cookie = `JWT=${token.access_token};path=/`;
			});
		}
	} else throw new Response("Auth Error", { status: 401 });
	return null;
}
function Auth() {
	authProtection();
	return (
		<>
			<div>Loading</div>
		</>
	);
}

export default Auth;
