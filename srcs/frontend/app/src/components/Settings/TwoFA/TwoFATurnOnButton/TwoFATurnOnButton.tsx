import { useContext, useState } from "react";
import apiAddress from "../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../utils/getJWT";
import OtpInput from "react-otp-input";
import Popup from "reactjs-popup";
import "./TwoFATurnOnButton.styles.css";
import { UserContext } from "../../../../utils/contexts/userContext";
import { notifyError } from "../../../../utils/notify";

function TwoFATurnOnButton() {
	const [open, setOpen] = useState(false);
	const [OTP, setOTP] = useState("");
	const userHook = useContext(UserContext);

	function openModal() {
		setOpen(true);
	}
	function closeModal() {
		setOpen(false);
		setOTP("");
	}

	function turnOn2FA(otp: string) {
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
			.then(function (response: Response) {
				if (!response.ok)
					throw new Error(
						"Request failed with status " + response.status
					);
				return response.json();
			})
			.then(function (data) {
				if (data.status === true) {
					userHook.setUser({
						...userHook.user,
						is2FAOn: true
					});
				}
			})
			.catch(function (error: Error) {
				notifyError(error.message);
			});
	}

	if (OTP.length == 6) {
		turnOn2FA(OTP);
		closeModal();
	}

	return (
		<div>
			<button onClick={openModal}>Turn on 2FA</button>
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
		</div>
	);
}

export default TwoFATurnOnButton;
