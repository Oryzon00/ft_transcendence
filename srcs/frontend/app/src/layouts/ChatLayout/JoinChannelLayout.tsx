import { useState } from "react";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import NameInput from "../../components/Chat/CreateChannel/NameInput";
import PasswordInput from "../../components/Chat/CreateChannel/PasswordInput";
import HeaderCreateChannel from "../../components/Chat/CreateChannel/HeaderCreateChannel";

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
		<div id="create-channel" className="flex flex-col">
			<HeaderCreateChannel onClose={onClose} />
			<NameInput name={name} setName={setName} />
			<PasswordInput password={password} setPassword={setPassword} />
			<button onClick={joinChannel} id="create-channel-button ">
				Join Channel
			</button>
		</div>
	);
}

export default JoinChannelLayout;
