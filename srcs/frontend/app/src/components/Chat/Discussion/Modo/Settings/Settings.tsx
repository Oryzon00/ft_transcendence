import { useEffect, useState } from "react";
import Upload from "./upload-images";
import Name from "./name";
import Description from "./Description";
import Delete from "./Delete";
import apiAddress from "../../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../../utils/getJWT";
import { notifyError } from "../../../../../utils/notify";
import { ChannelAllInfo } from "../../../../../layouts/ChatLayout/chat.d";
import Status from "./Status";
import Save from "./Save";

type SettingsType = {
	id: string;
};

export default function Settings({ id }: SettingsType) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("");
	const [password, setPassword] = useState("");

	const InfoChannel = () => {
		fetch(apiAddress + "/chat/channel/get", {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: id })
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (e: ChannelAllInfo) {
				setName(e.name);
				setStatus(e.status.toLowerCase());
				setDescription(e.description);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	useEffect(() => {
		InfoChannel();
	}, []);

	return (
		<div className="w-full h-[calc(100%-8.5rem)]">
			<div className="flex w-full">
				<Name name={name} setName={setName} />
				<Delete />
			</div>
			<Status
				setStatus={setStatus}
				status={status}
				password={password}
				setPassword={setPassword}
			/>
			<button
				onClick={() => {
					InfoChannel();
				}}
			>
				RESET
			</button>
			<Save
				id={id}
				name={name}
				description={description}
				status={status}
				password={password}
			/>
		</div>
	);
}
