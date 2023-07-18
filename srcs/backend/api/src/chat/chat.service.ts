import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';
import { Channel, Member, Message, Status, User } from "@prisma/client";
import UserDatabase from "./database/user";
import ChannelDatabase from "./database/channel";
import AdminDatabase from "./database/admin";
import { ChannelCreation, ChannelInvitation, ChannelJoin, ChannelPayload, MessagePayload } from "./chat";
import { ConnectedSocket } from "@nestjs/websockets";

@Injectable()
export class ChatService {
    constructor(
        private userdb : UserDatabase,
        private channeldb : ChannelDatabase,
        private admindb : AdminDatabase
    ) {}

    // return struct with all the messages and channel the user is in
    async getData(user : User) : Promise<{[key: number]: ChannelPayload}> {
        const members : any = (this.userdb.getMembers(user.id));
        let res : {[key: number]: ChannelPayload};

        for (let i : number = 0; i < members.members.length; i++)
        {
            res[members.members[i].channelId] = await this.getChannel(members.members[i].channeldb);
        }
        return (res);
    }

    async getChannel(channelId : number) : Promise<ChannelPayload> {
        const channel = await this.channeldb.getChannelInfo(channelId);
        const messages = await this.channeldb.getChannelMessage(channelId);
        return ({
            id: channel.id,
            name: channel.name,
            message: messages,
        })
    }
 
    async createChannel(user : User, @ConnectedSocket() socket : Socket, channel: ChannelCreation) : Promise<Channel> {
        const res : Channel = await this.channeldb.createChannel(channel, user.id);
        socket.join(String(res.id));
        return (res);
    }

    async joinChannel(user : User, @ConnectedSocket() socket : Socket, channel : ChannelJoin) : Promise<Channel> | null {
        const searchchannel : Channel = await this.channeldb.getChannelInfo(channel.id);
        if (searchchannel.status == Status.PROTECT && searchchannel.password != channel.password)
            return (null);
        await this.channeldb.joinChannel(channel.id, user.id);
    }

    /*
    async inviteChannel(user : User, @ConnectedSocket() socket : Socket, channel : ChannelInvitation) {
        let res : Channel
        for (let i = 0; i < channel.invited.length; i++)
        {

        }
    }
    */
}