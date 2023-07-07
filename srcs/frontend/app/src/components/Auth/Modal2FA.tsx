import { useState } from "react";
import apiAddress from "../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import { goToLastPath } from "../../utils/cookieProtection.ts";
import Popup from "reactjs-popup";
import OtpInput from "react-otp-input";

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

export default Modal2FA;