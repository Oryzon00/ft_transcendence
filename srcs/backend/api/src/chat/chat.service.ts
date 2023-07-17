import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';
import { Channel, Member, Message, User } from "@prisma/client";
import UserDatabase from "./database/user";
import ChannelDatabase from "./database/channel";
import AdminDatabase from "./database/admin";
import { ChannelCreation, ChannelPayload, MessagePayload } from "./chat";
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
        let channel : Channel, messages : Message[];

        for (let i : number = 0; i < members.members.length; i++)
        {
            channel = await this.channeldb.getChannelInfo(members.members[i].channelId);
            messages = await this.channeldb.getChannelMessage(members.members[i].channelId);
            res[members.members[i].channelId] = {id: channel.id, name: channel.name, ownerId: channel.ownerId, message: messages};
        }
        return (res);
    }

    async createChannel(@ConnectedSocket() socket : Socket, channel: ChannelCreation) : Promise<Channel>{
        socket.join()
    }
}