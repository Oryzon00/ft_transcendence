export type MessagePayload = {
	id: number;
    createdAt: Date;
    updateAt: Date;
    channelId: number;
    authorId: number;
    content: string;
};

export type ChannelPayload = {
	id: number;
	name: string;
	ownerId: number;
	message: MessagePayload[];
}