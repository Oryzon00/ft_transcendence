import getJwtTokenFromCookie from "../../utils/getJWT";
import { useState } from "react";
import { useNavigate } from "react-router";
import apiAddress from "../../utils/apiAddress";

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
function ButtonTurnOn() {
	const [showForm, setShowForm] = useState(false);
	const [TOTP, setTOTP] = useState([]);

	function FormTOTP() {
		function handleChange(event: any) {
			setTOTP(event.target.value);
		}
		return (
			<div>
				<input
					type="number"
					value={TOTP.join(", ")}
					onChange={handleChange}
				></input>
			</div>
		);
	}

	function turnOn2FA() {
		const url = apiAddress + apiAddress;
		fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				TOTP: TOTP
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
				//handle data
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function ShowFormTOTP() {
		if (showForm) {
			return <FormTOTP />;
		} else return null;
	}

	return (
		<div>
			<button onClick={() => setShowForm(!showForm)}>
				{" "}
				Turn on 2FA{" "}
			</button>
			<ShowFormTOTP />
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
		</>
	);
}

export default TwoFA;
