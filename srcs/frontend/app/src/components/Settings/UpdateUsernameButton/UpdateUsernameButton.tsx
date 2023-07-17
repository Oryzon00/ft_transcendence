import { useContext, useState } from "react";
import { UserContext } from "../../../utils/contexts/userContext.tsx";
import apiAddress from "../../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../../utils/getJWT.ts";
import { notifyError, notifyInfo } from "../../../utils/notify.ts";
import { throwErrorMessage } from "../../../utils/throwErrorMessage.ts";

function UpdateUsernameButton() {
	const userHook = useContext(UserContext);
	if (!userHook) return null;

	const [message, setMessage] = useState("");
	const handleChange = (event: any) => {
		setMessage(event.target.value);
	};

	function lol(mymessage: string) {
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
				if (!response.ok) throwErrorMessage(response);
				return response.json();
			})
			.then(function (data) {
				userHook.setUser({
					...userHook.user,
					name: data.name
				});
				notifyInfo(`Your username has been changed to ${data.name}`);
			})
			.catch(function () {
				notifyError(`Username ${mymessage} is already taken`);
			});
	}
	const handleClick = (event: any) => {
		if (event.key == "Enter") {
			lol(message);
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
