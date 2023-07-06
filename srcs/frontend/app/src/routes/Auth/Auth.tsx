import { getUserPathTokenFromCookie } from "../cookieProtection";
import apiAddress from "../../utils/apiAddress";
import { useState } from "react";
import Popup from "reactjs-popup";
import OtpInput from "react-otp-input";
import { useLoaderData } from "react-router";
import getJwtTokenFromCookie from "../../utils/getJWT";

function paramsToJSON(iterator: IterableIterator<[string, string]>) {
	const result: Record<string, string> = {};
	for (const [key, value] of iterator) {
		result[key] = value;
	}
	return JSON.stringify(result);
}

// export async function authLoader() {
// 	console.log("in auth loader");
// 	const urlParams = new URLSearchParams(window.location.search);
// 	const url = apiAddress + "/auth";
// 	const res = await fetch(url, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json"
// 		},
// 		body: paramsToJSON(urlParams.entries())
// 	});
// 	if (!res.ok) {
// 		throw new Response("Auth Error", { status: 401 });
// 	}

// 	const data = await res.json().then(function (data) {
// 		if (data.twoFA) {
// 			console.log(`data.twoFA=${data.twoFA}`);
// 			return data;
// 		}
// 		document.cookie = `JWT=${data.access_token};Path=/`;
// 		let tmp: string | null = getUserPathTokenFromCookie();
// 		if (tmp) {
// 			self.location.href = tmp;
// 			document.cookie =
// 				"userPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// 		} else self.location.href = "http://localhost:8000/home";
// 	});

// 	return data;
// }

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
			if (data.twoFA) {
				return data;
			}
			document.cookie = `JWT=${data.access_token};Path=/`;
			self.location.href = "http://localhost:8000/home"; // navigute?
		})
		.catch(function (error) {
			throw new Error(error.message);
		});


	return data;
}

/*--------------------------------------------------------------------------------------------*/

function Modal2FA(data: any) {
	console.log("in modal2fa");
	// console.log(`data.data.user.name=${data.data.user.name}`);

	const [open, setOpen] = useState(true);
	const [OTP, setOTP] = useState("");

	function closeModal() {
		setOpen(false);
		setOTP("");
	}

	function verifyOTP() {
		const url = apiAddress + "/auth/2FA/verify";
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user: data.data.user, // a modifier
				OTP: OTP
			})
		})
			.then(function (response) {
				if (!response.ok)
					throw new Error(
						"Request failed with status " + response.status
					);
				return response.json();
			})
			.then(function (data) {
				// console.log("in data fetch auth");
				document.cookie = `JWT=${data.access_token};Path=/`;
				self.location.href = "http://localhost:8000/home";
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	if (OTP.length == 6) {
		verifyOTP();
		closeModal();
		// appel deux fois, pourquoi?
	}

	return (
		<>
			<div>Auth loading</div>
			<Popup modal nested open={open} onClose={closeModal}>
				<div className="modal">
					<button className="close" onClick={closeModal}>
						&times;
					</button>
					<h2>Enter your OTP</h2>
					<OtpInput
						value={OTP}
						onChange={setOTP}
						numInputs={6}
						renderSeparator={<span></span>}
						renderInput={(props) => <input {...props} />}
					/>
				</div>
			</Popup>
		</>
	);
}

function Auth() {
	const data: any = useLoaderData();
	console.log("in auth");

	if (data) {
		return <Modal2FA data={data} />;
	} else {
		return <div>Auth loading no data.twoFA</div>;
	}
}

export default Auth;
