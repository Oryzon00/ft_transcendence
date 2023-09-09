import { ChannelPayload } from "../../../../layouts/ChatLayout/chat.d";
import apiAddress from "../../../../utils/apiAddress";
import getJwtTokenFromCookie from "../../../../utils/getJWT";
import { notifyError } from "../../../../utils/notify";

type ChannelBoxType = {
	channels: ChannelPayload[];
	channel: ChannelPayload[]
	setChannel: any;
};

type ChannelJoin = {
	id: string;
	password: string;
};

const fetchJoinChannel = (room: ChannelJoin, channel: ChannelPayload[], setChannel: any) => {
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

function ChannelBox({ channels, channel, setChannel }: ChannelBoxType) {
	console.log(channels);
	return (
		<div className="flex flex-row flex-wrap justify-center overflow-y-scroll scrollbar-thick h-full w-full">
			{channels.map((value) => (
				<button className="p-1 w-[195px] h-[150px] m-[10px] leading-[150px]" onClick={() => {fetchJoinChannel({id: value.id, password: ''}, channel, setChannel)}}>
					{value.name}
				</button>
			))}
		</div>
	);
}

export default ChannelBox;
