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
		<div className="py-5 ">
			<button
				className="mx-2 px-2 py-1 rounded-md hover:bg-amber-800 text-white font-semibold border-4 bg-zinc-500"
				onClick={register2FA}
			>
				Register via Google Authenticator
			</button>
			<Popup modal nested open={open} onClose={closeModal}>
				<div className="flex flex-col bg-zinc-800 rounded-md text-white items-center">
					<h2 className="px-2 py-2 text-white text-lg font-bold">
						Scan the QR Code using Google Authenticator
					</h2>
					<img className="h-48 w-48 my-5" src={qrCode}></img>
					<button
						className="px-2 pt-0 pb-1 absolute -top-3 -right-3 rounded-full bg-zinc-500 hover:bg-amber-800 text-xl font-bold"
						onClick={closeModal}
					>
						&times;
					</button>
				</div>
			</Popup>
		</div>
	);
}

export default TwoFARegisterButton;
