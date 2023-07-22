export type MessagePayload = {
	id: string;
    createdAt: Date;
    updateAt: Date;
    channelId: string;
    authorId: number;
    content: string;
};

export type ChannelCreation = {
    name: string;
    status: status;
    password: string;
}

export type ChannelNewPassword = {
    id: string;
    password: string;
}

export type ChannelPayload = {
	id: string;
	name: string;
    status: string;
	message: MessagePayload[];
}

export type ChannelInvitation = {
    id: string;
    invited: number;
}

export type ChannelQuit = ChannelInvitation;
export type ChannelKick = ChannelInvitation;
export type ChannelBan = ChannelInvitation;
export type ChannelMute = {
    id: string;
    muted: number;
    until: Date;
}

export type ChannelJoin = {
    id: string;
    password: string;
}

export type ChannelInfo = {
    id: string;
    name: string;
    status: string;
}


export type ListChannel = {[key: string]: ChannelPayload}