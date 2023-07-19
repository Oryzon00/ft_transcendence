export type MessagePayload = {
	channelId: number;
	authorId: number;
	content: string;
};

export type ChannelPayload = {
	id: number;
	name: string;
	message: MessagePayload[];
}

export type ChannelCreation = {
    name: string;
    status: string;
    password: string;
}