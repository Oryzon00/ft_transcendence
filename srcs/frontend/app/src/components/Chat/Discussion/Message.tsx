import { MessagePayload } from "../../../layouts/ChatLayout/chat.d";

type MessageType = {
	element: MessagePayload;
};

function Message({ element }: MessageType) {
	return (
		<div className="flex gap-x-1 hover:bg-[#23262A] w-full">
			<a href={"/profile/" + element.username}>
				<img
					src={element.avatar}
					alt=""
					className="h-12 w-12 rounded-full mb-2 cursor-pointer"
				/>
			</a>
			<div>
				<a href={"/profile/" + element.username}>
					<p className="text-base font-bold hover:underline cursor-pointer">
						{element.username}
					</p>
				</a>
				{!(
					element.link == undefined ||
					element.link == null ||
					element.link == ""
				) ? (
					<a
						href={element.link}
						className=" hover:underline text-blue-400"
					>
						{element.content}
					</a>
				) : (
					<p>{element.content}</p>
				)}
			</div>
		</div>
	);
}

export default Message;
