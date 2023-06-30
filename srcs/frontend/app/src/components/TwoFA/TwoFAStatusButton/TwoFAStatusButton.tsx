import { useState } from "react";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";

function TwoFAStatusButton() {
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

export default TwoFAStatusButton;
