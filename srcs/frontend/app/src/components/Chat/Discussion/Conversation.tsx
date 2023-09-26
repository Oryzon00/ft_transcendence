import { MessagePayload } from "../../../layouts/ChatLayout/chat.d";

type ConversationType = {
	message: MessagePayload[];
};

function Conversation({ message }: ConversationType) {
	return (
		<div className="w-full h-[79%] overflow-y-scroll gap-x-2">
			{message.map((e) => (
				<div className="flex gap-x-1 hover:bg-[#23262A] w-full">
					<a href={"/profile/" + e.username}>
						<img
							src={e.avatar}
							alt=""
							className="h-12 w-12 rounded-full mb-2 cursor-pointer"
						/>
					</a>
					<div>
						<a href={"/profile/" + e.username}>
							<p className="text-base font-bold hover:underline cursor-pointer">
								{e.username}
							</p>
						</a>
						{!(
							e.link == undefined ||
							e.link == null ||
							e.link == ""
						) ? (
							<a href={e.link}>{e.content}</a>
						) : (
							<p>{e.content}</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default Conversation;
