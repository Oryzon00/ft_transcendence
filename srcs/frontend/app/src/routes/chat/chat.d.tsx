export type MessagePayload = {
	channelId: number;
	authorId: number;
	content: string;
};

export type sendMessage = {

}

export type userData = {
	
}

export type ChannelPayload = {
	name: string;
	userId: number;
	message: MessagePayload[];
}