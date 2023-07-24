import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Socket } from 'socket.io';
import { Channel, Member, Message, Status, User } from "@prisma/client";
import UserDatabase from "./database/user";
import ChannelDatabase from "./database/channel";
import { ChannelBan, ChannelCreation, ChannelInfo, ChannelInvitation, ChannelJoin, ChannelKick, ChannelMute, ChannelNewPassword, ChannelPayload, ListChannel, MessagePayload, MessageWrite } from "./dto/chat";
import { ConnectedSocket } from "@nestjs/websockets";
import { PrismaService } from "src/prisma/prisma.service";
import { ChatGateway } from "./chat.gateway";

@Injectable()
export class ChatService {

    constructor(
        private userdb : UserDatabase,
        private channeldb : ChannelDatabase,
        private chatGateway : ChatGateway,
        private prisma : PrismaService,
    ) {}

    // Get all data of one user on connection
    async getData(user : User) : Promise<ListChannel> {
        const members : Member[] = await this.userdb.getMembers(user.id);
        let res : ListChannel = {};

        if (members != undefined)
        {
            for (let i : number = 0; i < members.length; i++)
                res[members[i].channelId] = await this.getChannel(members[i].channelId);
        }
        return (await res);
    }

    async getChannel(channelId : string) : Promise<ChannelPayload> {
        const channel = await this.channeldb.getChannelInfo(channelId);
        const messages : Message[] = await this.channeldb.getChannelMessage(channelId);
        return (await {
            id: channel.id,
            name: channel.name,
            status: this.channeldb.convertString(channel.status),
            message: messages,
        })
    }
 
    // Creation of a channel
    async createChannel(user : User, channel: ChannelCreation) : Promise<ChannelInfo> {
        const res : Channel = await this.channeldb.createChannel(channel, user.id);
        return ({id: res.id, name: res.name, status: this.channeldb.convertString(res.status)});
    }

    fusionSameName(userId: number, name : string, channel : Channel[], old : ChannelInfo[])
    {
        let res = old;
        for (let i : number = 0; i < channel.length; i++) {
            let member = this.userdb.findMember(userId, channel[i].id);
            if ((name == '' || channel[i].name.startsWith(name))){// && member == undefined){
                res.push({
                    id: channel[i].id,
                    name: channel[i].name,
                    status: this.channeldb.convertString(channel[i].status)
                })
            }
        }
        return (res);
    }

    async message(user : User, message: MessageWrite) {
		const member : Member = await this.prisma.member.findFirst({
			where: { 
				channelId: message.channelId,
				userId: user.id
			 }
		});
		if (member == undefined || member.mute) {
			throw new UnauthorizedException( "You cannot send message in this channel, refresh the page" );
		}
        const msg = await this.channeldb.stockMessages(message);
        this.chatGateway.emitToRoom(msg.channelId, msg, 'onMessage')
    }

    async searchChannel(user : User, body : {name : string}) : Promise<ChannelInfo[]> {
        const publicChannel : Channel[] = await this.channeldb.getPublicChannel();
        const protectChannel : Channel[] =  await this.channeldb.getProtectChannel();
        let res : ChannelInfo[] = [];
        res = this.fusionSameName(user.id, body.name, publicChannel, res);
        res = this.fusionSameName(user.id, body.name, protectChannel, res);
        return (await res);
    }

    async joinChannel(user : User, channel : ChannelJoin) : Promise<ChannelPayload > {
        const searchchannel : Channel = await this.channeldb.getChannelInfo(channel.id);
        if (searchchannel.status == Status.PROTECT && searchchannel.password != channel.password)
            return (null);
        if (this.channeldb.findBanChannel(channel.id, user.id) == undefined)
            throw new UnauthorizedException();
        await this.channeldb.joinChannel(channel.id, user.id);
        this.chatGateway.onJoinChannel(user.name, channel.id);
        return (this.getChannel(channel.id));
    }

    async invite(user : User, channel : ChannelInvitation) {
        if ((await this.userdb.findMember(user.id, channel.id)) == undefined)
            throw new UnauthorizedException();
        if (this.channeldb.findBanChannel(channel.id, channel.invited) == undefined)
            throw new UnauthorizedException();
        this.channeldb.joinChannel(channel.id, channel.invited);
    }

    async deleteMember(channelId: string, userId: number)
    {
        const find : Member = await this.userdb.findMember(userId, channelId);
        if (find == undefined)
            throw new UnauthorizedException();
        this.prisma.member.delete({
            where: { id: find.id }
        })
    }

    async quitChannel(user: User, channelId : {id : string})
    {
        this.deleteMember(channelId.id, user.id);
    }

    // it's just quit with a check if you are a modo
    async kick(user : User, body : ChannelKick) {
        if (!(await this.userdb.isModo(user.id, body.id)))
            throw new UnauthorizedException();
        this.deleteMember(body.id, body.invited);
    }

    async mute(user : User, body : ChannelMute) {
        if (!(await this.userdb.isModo(user.id, body.id)))
            throw new UnauthorizedException();
        const find : Member = await this.userdb.findMember(body.muted, body.id);
        this.prisma.member.update({
            where: {
                id: find.id
            },
            data: {
                mute: true,
                muteEnd: body.until
            }
        })
    }

    async unmute(user : User, body : ChannelMute) {
        if (!(await this.userdb.isModo(user.id, body.id)))
            throw new UnauthorizedException();
        const find : Member = await this.userdb.findMember(body.muted, body.id);
        this.prisma.member.update({
            where: {
                id: find.id
            },
            data: {
                mute: false,
            }
        })
    }

    async ban(user : User, body : ChannelBan) {
        const banned : User = await this.userdb.getUser(body.invited)
        if (!(await this.userdb.isModo(user.id, body.id)))
            throw new UnauthorizedException();
        this.channeldb.banChannel(body.id, body.invited);
        this.deleteMember(body.id, body.invited);
    }

    async unban(user : User, body : ChannelBan) {
        if (!(await this.userdb.isModo(user.id, body.id)))
            throw new UnauthorizedException();
        this.channeldb.unbanChannel(body.id, body.invited);
    }
    
    async password(user : User, body : ChannelNewPassword) {
        if (!(await this.userdb.isModo(user.id, body.id)))
            throw new UnauthorizedException();
        this.prisma.channel.update({
            where: {id: body.id},
            data: {
                password: body.password
            }
        })
    }

    async listUser(user: User, channelId: string) {
        if (this.userdb.isMember(user.id, channelId))
            return (await this.channeldb.getChannelUser(channelId));
        throw new UnauthorizedException();
    }}