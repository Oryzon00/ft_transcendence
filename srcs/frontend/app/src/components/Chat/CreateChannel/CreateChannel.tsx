import { useEffect, useState } from "react";

// Images
import Cross from "../../../assets/common/cross.png";

// Components
import Password from "./Password/Password";
import Status from "./Status/Status";
import Customize from "./Customize/Customize";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";
import { ListChannel } from "../../../layouts/ChatLayout/chat.d";

type CreateChannelType = {
	togglemodal: any;
	channel: ListChannel;
	setChannel: any;
};

type JoinChannel = {
	name: string;
	status: string;
	password: string;
};

const fetchCreateChannel = (newChannel: JoinChannel, setChannel: any) => {
	fetch(apiAddress + "/chat/channel/create", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie(),
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newChannel)
	})
		.then(function (res: Response) {
			if (!res.ok) {
				throw new Error("Request failed with status " + res.status);
			}
			return res.json();
		})
		.then(function (e) {
			setChannel(e);
		})
		.catch(function (error) {
			notifyError(error.message);
		});
};

function CreateChannel({ togglemodal, setChannel }: CreateChannelType) {
	const [position, setPosition] = useState(0);

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("PUBLIC");

	useEffect(() => {
		if (position == 3) {
			if (!password) setStatus("PROTECTED");
			fetchCreateChannel({ name, password, status }, setChannel);
			togglemodal();
		}
	});

	return (
		<div
			id="create-channel"
			className="flex flex-col bg-white w-[440px] h-[550px] relative rounded"
		>
			<button
				className="bg-white absolute top-3 right-1"
				onClick={togglemodal}
			>
				<img src={Cross} alt="" />
			</button>
			{position == 0 ? (
				<Status setPosition={setPosition} setStatus={setStatus} />
			) : position == 1 ? (
				<Password
					setPosition={setPosition}
					setPassword={setPassword}
					password={password}
				/>
			) : position == 2 ? (
				<Customize
					setPosition={setPosition}
					previous={status == "PUBLIC" ? 1 : 0}
					result={name}
					setResult={setName}
				/>
			) : null}
		</div>
	);
}

export default CreateChannel;
