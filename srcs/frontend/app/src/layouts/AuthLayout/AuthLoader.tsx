import apiAddress from "../../utils/apiAddress.ts";
import { notifyError } from "../../utils/notify.ts";

function paramsToJSON(iterator: IterableIterator<[string, string]>) {
	const result: Record<string, string> = {};
	for (const [key, value] of iterator) {
		result[key] = value;
	}
	return JSON.stringify(result);
}

export async function authLoader() {
	const urlParams = new URLSearchParams(window.location.search);
	const url = apiAddress + "/auth";

	const data = fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: paramsToJSON(urlParams.entries())
	})
		.then(function (response) {
			if (!response.ok)
				throw new Error(
					"Request failed with status " + response.status
				);
			return response.json();
		})
		.then(function (data) {
			if (data.is2FAOn === true) {
				return data;
			}
			if (data.access_token) {
				document.cookie = `JWT=${data.access_token};Path=/`;
				self.location.href = "home";
			}
			throw new Error("Unexpected error has occured");
		})
		.catch(function (error) {
			notifyError(error.message);
		});

	return data;
}
