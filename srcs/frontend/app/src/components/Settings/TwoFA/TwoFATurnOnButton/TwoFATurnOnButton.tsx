import { useState } from "react";
import apiAddress from "../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../utils/getJWT";
import OtpInput from "react-otp-input";

function TwoFATurnOnButton() {
	const [showInput, setShowInput] = useState(false);
	const [OTP, setOTP] = useState("");
	let inputOTP;

	function handleClick() {
		setShowInput(!showInput);
	}

	function turnOn2FA(otp: string) {
		console.log("in fuction 1");
		const url = apiAddress + "/auth/2FA/turn-on";
		fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				TOTP: otp
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
				console.log(data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	if (showInput)
		inputOTP = (
			<OtpInput
				value={OTP}
				onChange={setOTP}
				numInputs={6}
				renderSeparator={<span></span>}
				renderInput={(props) => <input {...props} />}
			/>
		);
	else inputOTP = null;
	if (OTP.length == 6) {
		turnOn2FA(OTP);
		setOTP("");
		// appel deux fois, pourquoi?
	}

	return (
		<div>
			<button onClick={handleClick}>Turn on 2FA</button>
			{inputOTP}
		</div>
	);
}

export default TwoFATurnOnButton;
