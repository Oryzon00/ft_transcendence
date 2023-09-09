import { useEffect, useState } from "react";
import { ChannelPayload } from "../../../layouts/ChatLayout/chat.d";
import apiAddress from "../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../utils/getJWT";
import { notifyError } from "../../../utils/notify";

// Images
import Header from "./Header/Header";
import Content from "./Content/Content";

type CommunityType = {
	togglemodal: any;
	channel: ChannelPayload[];
	setChannel: any;
};

function Community({ togglemodal, channel, setChannel }: CommunityType) {
	const [publicChannel, setPublic] = useState([]);
	const [protectedChannel, setProtected] = useState([]);

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

	useEffect(() => {
		ListPublicChannel();
		ListProtectedChannel();
	}, []);

	return (
		<div className="flex flex-col bg-white h-[550px] w-[650px] rounded-md ">
			<Header
				togglemodal={togglemodal}
				refresh={() => {
					ListPublicChannel();
					ListProtectedChannel();
				}}
			/>
			<Content channels={publicChannel.concat(protectedChannel)} channel={channel} setChannel={setChannel} />
		</div>
	);
}

export default Community;
