import { useState } from "react";
import { UserHook } from "../../utils/hooks/TuseUser";
import useUser from "../../utils/hooks/useUser";

function MessageEntry (socket: any, current: number) {
	const [value, setValue] = useState('');
	const user : UserHook = useUser();

	const sendMessage = () => {
		let sendMessages = {authorId: user.user.id, channelId: current, content: value};
		socket.emit('newMessage', sendMessages) ;
		setValue('');
	};

    return (
				<div id="message">
					<p>Message</p>
					<input type="text" value={value} placeholder="Taper un message" onChange={(e) => setValue(e.target.value)} maxLength={2000} />
					<button onClick={sendMessage}>
						Send
					</button>
				</div>
    );
}

export default MessageEntry;