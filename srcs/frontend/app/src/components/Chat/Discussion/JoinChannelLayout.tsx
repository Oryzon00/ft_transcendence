import { useState } from "react";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import NameInput from "../CreateChannel/NameInput";
import PasswordInput from "../CreateChannel/PasswordInput";
import HeaderCreateChannel from "../CreateChannel/HeaderCreateChannel";

import PublicButton from "../CreateChannel/Status/PublicButton";
import PrivateButton from "../CreateChannel/Status/PrivateButton";

function JoinChannelLayout({ open, onClose, newChannel }) {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	//const [status, setStatus] = useState('public');

	function joinChannel() {
		const url = apiAddress + "/chat/channel/join";
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: name,
				password: password
			})
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (data) {
				newChannel({
					id: data.id,
					name: data.name,
					status: data.status,
					message: []
				});
			});
	}

	if (!open) return null;
	return (
	);
	/*
	return (
		<div id="create-channel" className="flex flex-col h-full">
			<HeaderCreateChannel onClose={onClose} />
			<div
				id="status"
				className="flex flex-col space-y-2 items-center h-full justify-center"
			>
				<PublicButton />
				<PrivateButton />
			</div>
		</div>
	);
	return (
		<div id="create-channel" className="flex flex-col">
			<NameInput name={name} setName={setName} />
			<PasswordInput password={password} setPassword={setPassword} />
			<button onClick={joinChannel} id="create-channel-button ">
				Join Channel
			</button>
		</div>
	);
	*/
}

export default JoinChannelLayout;
