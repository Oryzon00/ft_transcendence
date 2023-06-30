import getJwtTokenFromCookie from "../../utils/getJWT";
import { useState } from "react";
import { useNavigate } from "react-router";
import apiAddress from "../../utils/apiAddress";
import OtpInput from "react-otp-input";

function ButtonRegister() {
	const [qrCode, setQrCode] = useState("");
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

function ButtonHome() {
	const navigate = useNavigate();
	function goToHome() {
		navigate("/home");
	}
	return (
		<div>
			<button onClick={goToHome}> Go to home </button>
		</div>
	);
}

function ButtonTurnOff() {
	function turnOff2FA() {
		const url = apiAddress + "/auth/2FA/turn-off";
		fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
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
				console.log(data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<div>
			<button onClick={turnOff2FA}> Turn off 2FA </button>
		</div>
	);
}

// type OtpInputProps = {
// 	value: string;
// 	onChange: (value: string) => void;
//   };

//   const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 	  onChange(e.target.value);
// 	};

// 	return (
// 	  <div>
// 		{[1, 2, 3, 4, 5, 6].map((digit, idx) => (
// 		  <input
// 			key={idx}
// 			type="text"
// 			inputMode="numeric"
// 			autoComplete="one-time-code"
// 			pattern="\d{1}"
// 			maxLength={1}
// 			value={value[idx] || ''}
// 			onChange={handleInputChange}
// 		  />
// 		))}
// 	  </div>
// 	);
//   };

// type OTPInputProps = {
// 	value: string;
// 	valueLength: number;
// 	onChange: (value: string) => void;
// };

// function OTPInput({ value, valueLength, onChange }: OTPInputProps) {
// 	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
// 		onChange(event.target.value);
// 	}

// 	return (
// 		<div>
// 			{[1, 2, 3, 4, 5, 6].map((digit, idx) => (
// 				<input
// 					key={idx}
// 					type="text"
// 					inputMode="numeric"
// 					autoComplete="one-time-code"
// 					pattern="\d{1}"
// 					maxLength={valueLength}
// 					className="otp-input"
// 					value={digit}
// 				/>
// 			))}
// 		</div>
// 	);
// }

function turnOn2FA(otp: string) {
	console.log("in fuction 1")
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

function ButtonTurnOn() {
	const [showInput, setShowInput] = useState(false);
	const [OTP, setOTP] = useState("");
	let inputOTP;


	function handleClick() {
		setShowInput(!showInput);
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

function Status2FA() {
	const [twoFAStatus, setTwoFAStatus] = useState("No info on 2fa");
	function getTwoFAStatus() {
		const url = apiAddress + "/user/me";
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie()
			}
		})
			.then(function (response) {
				if (!response.ok) {
					throw new Error(
						"Request failed with status " + response.status
					);
				}
				return response.json();
			})
			.then(function (data) {
				if (data.twoFA === true) setTwoFAStatus("On");
				else setTwoFAStatus("Off");
			})
			.catch(function (error) {
				if (error instanceof Error) {
					const message: string = error.message;
					setTwoFAStatus(message);
				}
			});
	}
	return (
		<div>
			<button onClick={getTwoFAStatus}>get 2FA status </button>
			<div> 2fa status : {twoFAStatus} </div>
		</div>
	);
}

function TwoFA() {
	return (
		<>
			<ButtonHome />
			<span> Welcome to 2FA settings </span>
			<Status2FA />
			<ButtonRegister />
			<ButtonTurnOn />
			<ButtonTurnOff />
		</>
	);
}

export default TwoFA;
