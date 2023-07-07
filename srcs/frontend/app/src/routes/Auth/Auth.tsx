import apiAddress from "../../utils/apiAddress";
import { useState } from "react";
import Popup from "reactjs-popup";
import OtpInput from "react-otp-input";
import { useLoaderData } from "react-router";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { goToLastPath } from "../../utils/cookieProtection.ts";

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
				goToLastPath();
			}
			throw new Error("Unexpected error has occured");
		})
		.catch(function (error) {
			throw new Error(error.message);
		});

	return data;
}

/*--------------------------------------------------------------------------------------------*/

function Modal2FA({ user }: any) {

	const [open, setOpen] = useState(true);
	const [OTP, setOTP] = useState("");
	if (OTP.length == 6) {
		verifyOTP();
		closeModal();
		// appel deux fois, pourquoi?
	}

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
				user: user,
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
				// use naviguate ?
				document.cookie = `JWT=${data.access_token};Path=/`;
				goToLastPath();
			})
			.catch(function (error) {
				console.log(error);
			});
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
	const user: any = useLoaderData();

	if (user) {
		return <Modal2FA user={user} />;
	} else {
		return <div>Auth loading</div>;
	}
}

export default Auth;
