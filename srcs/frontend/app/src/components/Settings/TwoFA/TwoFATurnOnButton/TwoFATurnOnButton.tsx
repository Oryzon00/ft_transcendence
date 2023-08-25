import { useContext, useState } from "react";
import apiAddress from "../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../utils/getJWT";
import OtpInput from "react-otp-input";
import Popup from "reactjs-popup";
import "./TwoFATurnOnButton.styles.css";
import { UserContext } from "../../../../utils/contexts/userContext";
import { notifyError, notifyInfo } from "../../../../utils/notify";
import { throwErrorMessage } from "../../../../utils/throwErrorMessage";

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
				if (!response.ok) throwErrorMessage(response);
				return response.json();
			})
			.then(function () {
				closeModal();
				userHook.setUser({
					...userHook.user,
					is2FAOn: true
				});
				notifyInfo("2FA has been turned on");
			})
			.catch(function () {
				notifyError("Incorrect OTP");
			});
	}

	if (OTP.length == 6) {
		turnOn2FA(OTP);
		setOTP("");
	}

	return (
		<div className="py-10">
			<button
				className="mx-2 px-2 py-1 rounded-md hover:bg-amber-800 text-white font-semibold border-4 bg-zinc-500"
				onClick={openModal}
			>
				Turn on 2FA
			</button>
			<Popup modal nested open={open} onClose={closeModal}>
				<div className="flex flex-col bg-zinc-800 rounded-md text-white items-center">
					<h2 className="px-5 py-5 text-white text-lg font-bold">
						Enter your One Time Password
					</h2>
					<div className="py-10 px-5 ">
						<OtpInput
							value={OTP}
							onChange={setOTP}
							numInputs={6}
							renderSeparator={
								<span className="px-2 py-2 text-white text-xl font-bold">
									-
								</span>
							}
							renderInput={(props) => (
								<input
									{...props}
									className="h-12 bg-gray-500 rounded-md text-2xl text-center"
								/>
							)}
							inputStyle={{ width: "3rem" }}
						/>
					</div>

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

export default TwoFATurnOnButton;
