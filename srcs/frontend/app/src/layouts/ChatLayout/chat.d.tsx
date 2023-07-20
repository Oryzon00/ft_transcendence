export type MessagePayload = {
	channelId: string;
	authorId: number;
	content: string;
};

export type ChannelPayload = {
	id: string;
	name: string;
	message: MessagePayload[];
}

export type ChannelCreation = {
    name: string;
    status: string;
    password: string;
}

export type ListChannel = {[key: string]: ChannelPayload}