export type MessagePayload = {
	id: number;
    createdAt: Date;
    updateAt: Date;
    channelId: number;
    authorId: number;
    content: string;
};

export enum status {
    PUBLIC,
    PRIVATE,
    PROTECT
}

export type ChannelCreation = {
    name: string;
    status: status;
    password: string;
    userId: number;
}

export type ChannelPayload = {
	id: number;
	name: string;
	ownerId: number;
	message: MessagePayload[];
}