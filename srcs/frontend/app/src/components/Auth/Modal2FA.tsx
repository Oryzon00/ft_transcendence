import { useState } from "react";
import apiAddress from "../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../utils/getJWT.ts";
import Popup from "reactjs-popup";
import OtpInput from "react-otp-input";
import { notifyError } from "../../utils/notify.ts";
import { Modal2FAProps } from "./TModal2FA";
import { throwErrorMessage } from "../../utils/throwErrorMessage.ts";
import { useNavigate } from "react-router";

function Modal2FA({ user }: Modal2FAProps) {
	const [OTP, setOTP] = useState("");
	const navigate = useNavigate();
	
	if (OTP.length == 6) {
		verifyOTPBack();
		clearModal();
	}

	function clearModal() {
		setOTP("");
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
				if (!response.ok) throwErrorMessage(response);
				return response.json();
			})
			.then(function (data) {
				document.cookie = `JWT=${data.access_token};Path=/`;
				navigate("/home", { replace: true });
			})
			.catch(function () {
				notifyError("Incorrect OTP");
			});
	}

	return (
		<>
			<div>Auth loading</div>
			<Popup modal nested open={true} onClose={clearModal}>
				<div className="modal">
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
