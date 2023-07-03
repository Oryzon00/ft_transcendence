import { useState } from "react";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import apiAddress from "../../../utils/apiAddress";


function TwoFARegisterButton() {
	const [qrCode, setQrCode] = useState("");
	function register2FA() {
		const url = apiAddress + "/auth/2FA/generate";
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({})
		})
			.then(function (response) {
				if (!response.ok)
					throw new Error(
						"Request failed with status " + response.status
					);
				return response.json();
			})
			.then(function (data) {
				setQrCode(data.qrCodeUrl);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	return (
		<div>
			<button onClick={register2FA}> Register to 2FA </button>
			<div>
				<img src={qrCode}></img>
			</div>
		</div>
	);
}

export default TwoFARegisterButton;
