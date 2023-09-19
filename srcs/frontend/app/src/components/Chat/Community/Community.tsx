import { useEffect, useState } from "react";
import {
	ChannelJoin,
	ChannelPayload
} from "../../../layouts/ChatLayout/chat.d";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";

// Images
import Header from "./Header/Header";
import Content from "./Content/Content";
import ProtectedChannel from "./ProtectedPassword/ProtectedPassword";

type CommunityType = {
	togglemodal: any;
	channel: ChannelPayload[];
	setChannel: any;
};

const fetchJoinChannel = (room: ChannelJoin, setChannel: any) => {
	fetch(apiAddress + "/chat/channel/join", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + getJwtTokenFromCookie(),
			"Content-Type": "application/json"
		},
		body: JSON.stringify(room)
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

function Community({ togglemodal, channel, setChannel }: CommunityType) {
	const [publicChannel, setPublic] = useState([]);
	const [protectedChannel, setProtected] = useState([]);

	const [current, setCurrent] = useState<ChannelPayload>({
		id: "",
		name: "",
		description: "",
		status: "",
		message: []
	});
	const [isClickProtected, setClickProtected] = useState(false);

	const ListPublicChannel = () => {
		fetch(apiAddress + "/chat/channel/public", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			}
		})
			.then(function (res: Response) {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (data) {
				setPublic(data);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	const ListProtectedChannel = () => {
		fetch(apiAddress + "/chat/channel/protected", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + getJwtTokenFromCookie(),
				"Content-Type": "application/json"
			}
		})
			.then(function (res: Response): Promise<ChannelPayload[]> {
				if (!res.ok) {
					throw new Error("Request failed with status " + res.status);
				}
				return res.json();
			})
			.then(function (data) {
				setProtected(data);
			})
			.catch(function (error) {
				notifyError(error.message);
			});
	};

	const refresh = () => {
		ListPublicChannel();
		ListProtectedChannel();
	};

	useEffect(() => {
		refresh();
	}, []);

	return (
		<div className="flex flex-col bg-white h-[550px] w-[650px] rounded-md ">
			<Header togglemodal={togglemodal} refresh={refresh} />
			{isClickProtected ? (
				<ProtectedChannel
					current={current}
					backButton={() => {
						setClickProtected(!isClickProtected);
						setCurrent({
							id: "",
							name: "",
							description: "",
							status: "",
							message: []
						});
					}}
					joinButton={(e: string) => {
						fetchJoinChannel(
							{ id: current.id, password: e },
							setChannel
						);
						setCurrent({
							id: "",
							name: "",
							description: "",
							status: "",
							message: []
						});
						setClickProtected(!isClickProtected);
						refresh();
					}}
				/>
			) : (
				<Content
					channels={publicChannel.concat(protectedChannel)}
					clickedChannel={(e: ChannelPayload) => {
						if (e.status == "PROTECT") {
							setCurrent(e);
							setClickProtected(!isClickProtected);
						} else {
							fetchJoinChannel(
								{ id: e.id, password: "" },
								setChannel
							);
							refresh();
						}
					}}
				/>
			)}
		</div>
	);
}

export default Community;
