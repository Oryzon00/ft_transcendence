import { useState } from "react";
import { Socket } from "socket.io-client";
import apiAddress from "../../utils/apiAddress";
import getJwtTokenFromCookie from "../../utils/getJWT";
import { notifyError } from "../../utils/notify";

import Send from "../../assets/chat/send.png";

type MessageEntryType = {
	current: string;
	sockets: Socket;
};
function MessageEntry({ current }: MessageEntryType) {
	const [value, setValue] = useState("");

	const sendMessage = () => {
		if (current != "") {
			fetch(apiAddress + "/chat/message", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + getJwtTokenFromCookie(),
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					authorId: 0,
					channelId: current,
					content: value
				})
			})
				.then(function (res: Response) {
					if (!res.ok) {
						throw new Error(
							"Request failed with status " + res.status
						);
					}
				})
				.catch(function (error) {
					notifyError(error.message);
				});
			setValue("");
		}
	};

	return (
		<div className="flex flex-row space-x-1 flex-none w-[98%] rounded-3xl justify-center bg-[#424549] mx-auto">
			<input
				type="text"
				value={value}
				className="rounded-3xl w-[90%] px-4 mx-4 bg-[#424549] outline-none"
				placeholder=" Send a message..."
				onChange={(e) => setValue(e.target.value)}
				maxLength={2000}
				onKeyDown={(event: any) => {
					if (event.key == "Enter") sendMessage();
				}}
			/>
			<button onClick={sendMessage} className="bg-[#424549] rounded-3xl">
				<img src={Send}/>
			</button>
		</div>
	);
}

export default MessageEntry;
