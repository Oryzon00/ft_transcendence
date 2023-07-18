export type MessagePayload = {
	id: number;
    createdAt: Date;
    updateAt: Date;
    channelId: number;
    authorId: number;
    content: string;
};

export type ChannelCreation = {
    name: string;
    status: status;
    password: string;
}

export type ChannelPayload = {
	id: number;
	name: string;
	message: MessagePayload[];
}

export type ChannelInvitation = {
    id: number;
    invited: number[];
}

export type ChannelJoin = {
    id: number;
    password: string;
}