import { useContext } from "react";
import apiAddress from "../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../utils/getJWT";
import { UserContext } from "../../../../utils/contexts/userContext/userContext";

function TwoFATurnOffButton() {
	const userHook = useContext(UserContext);

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
				if (data.status === false) {
					userHook.setUser({
						...userHook.user,
						is2FAOn: false
					});
				}
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	return (
		<div>
			<button onClick={turnOff2FA}> Turn off 2FA </button>
		</div>
	);
}

export default TwoFATurnOffButton;
