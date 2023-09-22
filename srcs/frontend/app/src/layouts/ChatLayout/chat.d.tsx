export type MessagePayload = {
	id: string;
	createdAt: Date;
	updateAt: Date;
	channelId: string;
	authorId: number;
	content: string;
	username: string;
	avatar: string;
};

export type ChannelPayload = {
	id: string;
	name: string;
	description: string;
	status: string;
	message: MessagePayload[];
};

export type ChannelId = {
	id: string;
	name: string;
};

export type ChannelUser = {
	user: {
		id: number;
		name: string;
	};
};

export type ChannelCreation = {
	name: string;
	status: string;
	password: string;
};

export type ChannelInfo = {
	id: string;
	name: string;
	status: string;
};

export type ListChannel = { [key: string]: ChannelPayload };

export type ChannelJoin = {
	id: string;
	password: string;
};

export type ChannelAllInfo = {
	id: string;
	createdAt: Date;
	updateAt: Date;
	name: string;
	avatar: string | null;
	description: string;
	status: string;
	ownerId: number;
	messagesId: number[];
};

export type Friends = {
	id: number;
    image: string;
    name: string;
}