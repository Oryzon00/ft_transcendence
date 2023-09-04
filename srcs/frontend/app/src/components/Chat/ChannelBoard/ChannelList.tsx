import { ChannelId } from "../../../layouts/ChatLayout/chat.d";
type ChannelListType = {
	filtredItems: ChannelId[];
	changeCurrent: any;
	current: string;
};

function ChannelList({
	filtredItems,
	changeCurrent,
	current
}: ChannelListType) {
	const not_clicked: string =
		"bg-[#1e2124] hover:bg-[#23262A] hover:border-[#23262a] cursor-pointer";
	const clicked: string = "bg-[#282b30] cursor-default";
	const both: string =
		"w-full h-24 border-0 border-b-2 border-[#282b30] rounded-none text-center flex items-center justify-center ";

	return (
		<div className="h-[86%] overflow-y-scroll no-scrollbar ">
			<ul className="w-full overflow-y-scroll scrollbar-thick flex flex-col items-center scrollbar-track-blue-100">
				{filtredItems.map((value) => (
					<li
						className={
							both + (current != value.id ? not_clicked : clicked)
						}
						onClick={() => {
							changeCurrent(value.id);
						}}
					>
						{value.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default ChannelList;
