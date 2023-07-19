import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';
import { Channel, Member, Message, Status, User } from "@prisma/client";
import UserDatabase from "./database/user";
import ChannelDatabase from "./database/channel";
import AdminDatabase from "./database/admin";
import { ChannelCreation, ChannelInvitation, ChannelJoin, ChannelPayload, MessagePayload } from "./dto/chat";
import { ConnectedSocket } from "@nestjs/websockets";

@Injectable()
export class ChatService {
    constructor(
        private userdb : UserDatabase,
        private channeldb : ChannelDatabase,
        private admindb : AdminDatabase,
    ) {}

    // Get all data of one user on connection
    async getData(user : User) : Promise<{[key: number]: ChannelPayload}> {
        const members : Member[] = await this.userdb.getMembers(user.id);
        let res : {[key: number]: ChannelPayload} = {};

        for (let i : number = 0; members != undefined && i < members.length; i++)
            res[members[i].channelId] = await this.getChannel(members[i].channelId);
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
 
    // Creation of a channel
    async createChannel(user : User, channel: ChannelCreation) : Promise<ChannelPayload> {
        const res : Channel = await this.channeldb.createChannel(channel, user.id);
        return ({id: res.id, name: res.name, message: []});
    }

    async searchChannel() : Promise<Channel[]> {
        return (this.channeldb.getPublicChannel())
    }


    //async inviteChannel(user : User, channelId : number, inviteId : number) : Promise<>
    /*
    invite
    ban
    kick
    mute
    */
    async joinChannel(user : User, channel : any) : Promise<ChannelPayload > {
        const searchchannel : Channel = await this.channeldb.getChannelInfo(channel.id);
        if (searchchannel.status == Status.PROTECT && searchchannel.password != channel.password)
            return (null);
        await this.channeldb.joinChannel(channel.id, user.id);
        return (this.getChannel(channel.id));
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