import { useContext, useState } from "react";
import { UserContext } from "../../../utils/contexts/userContext.tsx";
import apiAddress from "../../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../../utils/getJWT.ts";
import { notifyError } from "../../../utils/notify.ts";

function UpdateUsernameButton() {
	const userHook = useContext(UserContext);
	if (!userHook.user) return null;

	const [message, setMessage] = useState("");
	const handleChange = (event: any) => {
		setMessage(event.target.value);
	};

	function sendToBack(mymessage: string) {
		const url = apiAddress + "/user/update/name";
		fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: mymessage
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
				userHook.setUser({
					...userHook.user,
					name: data.name
				});
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	}
	const handleClick = (event: any) => {
		if (event.key == "Enter") {
			sendToBack(message);
		}
	};

	return (
		<div>
			Username : {userHook.user.name}
			<div>
				<input
					onChange={handleChange}
					value={message}
					onKeyDown={handleClick}
				/>
			</div>
		</div>
	);
}

export default UpdateUsernameButton;
