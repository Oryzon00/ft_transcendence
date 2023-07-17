import { useState } from "react";
import getJwtTokenFromCookie from "../../../../utils/getJWT";
import apiAddress from "../../../../utils/apiAddress";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./TwoFARegisterButton.styles.css";
import { notifyError } from "../../../../utils/notify";
import { throwErrorMessage } from "../../../../utils/throwErrorMessage";

function TwoFARegisterButton() {
	const [qrCode, setQrCode] = useState("");
	const [open, setOpen] = useState(false);
	function register2FA() {
		const url = apiAddress + "/auth/2FA/generate";
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({})
		})
			.then(function (response) {
				if (!response.ok) throwErrorMessage(response);
				return response.json();
			})
			.then(function (data) {
				setQrCode(data.qrCodeUrl);
				setOpen(true);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	}
	function closeModal() {
		setOpen(false);
	}
	return (
		<div>
			<button onClick={register2FA}> Register to Google Authenticator </button>
			<Popup modal nested open={open} onClose={closeModal}>
				<div className="modal">
					<button className="close" onClick={closeModal}>
						&times;
					</button>
					<h2>Scan the QRCode using Google Authenticator</h2>
					<img src={qrCode}></img>
				</div>
			</Popup>
		</div>
	);
}

export default TwoFARegisterButton;
