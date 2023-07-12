import { useState } from "react";
import apiAddress from "../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import Popup from "reactjs-popup";
import OtpInput from "react-otp-input";
import { notifyError } from "../../utils/notify.ts";
import { Modal2FAProps } from "./TModal2FA";

function Modal2FA({ user }: Modal2FAProps) {
	const [open, setOpen] = useState(true);
	const [OTP, setOTP] = useState("");
	if (OTP.length == 6) {
		setTimeout(verifyOTPBack, 300);
		setTimeout(clearModal, 300);
	}

	function clearModal() {
		setOTP("");
		console.log("in clear modal");
	}

	function verifyOTPBack() {
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
				document.cookie = `JWT=${data.access_token};Path=/`;
				self.location.href = "home";
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	}

	return (
		<>
			<div>Auth loading</div>
			<Popup modal nested open={open} onClose={clearModal}>
				<div className="modal">
					<button className="close" onClick={clearModal}>
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
