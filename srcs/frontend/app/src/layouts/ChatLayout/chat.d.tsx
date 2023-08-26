export type MessagePayload = {
	id: string;
    createdAt: Date;
    updateAt: Date;
    channelId: string;
    authorId: number;
    content: string;
};


export type ChannelPayload = {
	id: string;
	name: string;
    description: string;
	status: string;
	message: MessagePayload[];
}

export type ChannelId = {
	id: string;
	name: string;
}

export type ChannelCreation = {
    name: string;
    status: string;
    password: string;
}

export type ChannelInfo = {
    id: string;
    name: string;
    status: string;
}

export type ListChannel = {[key: string]: ChannelPayload}