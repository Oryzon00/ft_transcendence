import { api_adress } from "../../api_adress.ts";
import { getUserPathTokenFromCookie } from "../cookieProtection";


function paramsToJSON(iterator: IterableIterator<[string, string]>) {
	const result: Record<string, string> = {};
	for (const [key, value] of iterator) {
		result[key] = value;
	}
	return JSON.stringify(result);
}

export async function authLoader() {
	const urlParams = new URLSearchParams(window.location.search);
	const url = api_adress + "/auth";
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: paramsToJSON(urlParams.entries())
	});
	if (!res.ok) throw new Response("Auth Error", { status: 401 });
	else {
		await res.json().then(function (token) {
			document.cookie = `JWT=${token.access_token};Path=/`;
			let tmp :string | null = getUserPathTokenFromCookie();
			if (tmp)
			{
				self.location.href = tmp;
				document.cookie = "userPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			}
			else
				self.location.href = "http://localhost:8000/home"
		});
	}
	return null;
}

function Auth() {
	return (
		<>
			<div>Auth loading</div>
		</>
	);
}

export default Auth;

