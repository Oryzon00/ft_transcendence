import { useContext, useState } from "react";
import UserContext from "../../../utils/contexts/userContext.ts";
import apiAddress from "../../../utils/apiAddress.ts";
import getJwtTokenFromCookie from "../../../utils/getJWT.ts";

function UpdateUsernameButton () {
	const userHook = useContext(UserContext);
	if (!userHook) return null;

	const [message, setMessage] = useState("");
	const handleChange = (event:any) => {
		setMessage(event.target.value);
	};

	function lol (mymessage:string) {
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
				.then(function(response) {
					console.log(`response status = ${response.status}`);
					if (!response.ok)
						throw new Error(
							"Request failed with status " + response.status
						);
					return response.json();
				})
				.then(function(data) {
					console.log("in response ok");
						userHook.setUser({
							...userHook.user,
							name: data.name
						});
				})
				.catch(function(error) {
					console.log(error);
				});
	}
	const handleClick = (event:any) => {
		if (event.key == 'Enter') {
			console.log(`message = ${message}`);
			lol(message);
	
		}
	}

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