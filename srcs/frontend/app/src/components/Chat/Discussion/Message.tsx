import { MessagePayload } from "../../../layouts/ChatLayout/chat.d";

type MessageType = {
	element: MessagePayload;
};

function Message({ element }: MessageType) {
	return (
		<div className="flex gap-x-1 hover:bg-[#23262A]">
			<a className="shrink-0" href={"/profile/" + element.username}>
				<img
					src={element.avatar}
					alt=""
					className="h-12 w-12 rounded-full mb-2 cursor-pointer"
				/>
			</a>
			<div>
				<a className="shrink-0" href={"/profile/" + element.username}>
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
						className=" hover:underline text-blue-400 shrink-0"
					>
						{element.content}
					</a>
				) : (
					<p style={{wordBreak: 'break-word'}}>{element.content}</p>
				)}
			</div>
		</div>
	);
}

export default Message;
