import { MessagePayload } from "../../../layouts/ChatLayout/chat.d";
import Message from "./Message";

type ConversationType = {
	messages: MessagePayload[];
	blocked: number[];
};

function Conversation({ messages, blocked }: ConversationType) {
	if (blocked === undefined) return;
	return (
		<div className="w-full h-[79%] overflow-y-scroll gap-x-2">
			{messages.map((message: MessagePayload) =>
				blocked.includes(message.authorId) ? null : (
					<Message element={message} />
				)
			)}
		</div>
	);
}

export default Conversation;
