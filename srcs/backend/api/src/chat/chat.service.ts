import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Block, Channel, Member, Message, Status, User } from "@prisma/client";
import UserDatabase from "./database/user";
import ChannelDatabase from "./database/channel";
import {
	ChannelBan,
	ChannelChangement,
	ChannelCreation,
	ChannelInfo,
	ChannelInvitation,
	ChannelJoin,
	ChannelKick,
	ChannelMute,
	ChannelNewPassword,
	ChannelPayload,
	ListChannel,
	ListName,
	MessagePayload,
	MessageWrite
} from "./dto/chat";
import { PrismaService } from "src/prisma/prisma.service";
import { ChatGateway } from "./chat.gateway";

@Injectable()
export class ChatService {
	constructor(
		private userdb: UserDatabase,
		private channeldb: ChannelDatabase,
		private chatGateway: ChatGateway,
		private prisma: PrismaService
	) {}

	listBlocked(blocked: Block[]): number[] {
		if (blocked == undefined) return [];
		let res: number[] = [];
		for (let i = 0; i < blocked.length; i++) res.push(blocked[i].isBlockId);
		return res;
	}

	// Get all data of one user on connection
	async getData(user: User): Promise<ListChannel> {
		const members: Member[] = await this.userdb.getMembers(user.id);
		const blocked: number[] = this.listBlocked(
			await this.userdb.listBlockedUser(user.id)
		);
		let res: ListChannel = {};

		if (members != undefined) {
			for (let i: number = 0; i < members.length; i++)
				res[members[i].channelId] = await this.getChannel(
					members[i].channelId,
					blocked
				);
		}
		return res;
	}

	async getChannel(
		channelId: string,
		blocked: number[]
	): Promise<ChannelPayload> {
		const channel = await this.channeldb.getChannelInfoId(channelId);
		const messages: Message[] = await this.channeldb.getChannelMessage(
			channelId,
			blocked
		);
		return await {
			id: channel.id,
			name: channel.name,
			status: this.channeldb.convertString(channel.status),
			message: messages
		};
	}

	// Creation of a channel
	async createChannel(
		user: User,
		channel: ChannelCreation
	): Promise<ChannelPayload> {
		if (channel.name.length == 0) return null;
		const res: Channel = await this.channeldb.createChannel(
			channel,
			user.id
		);
		this.chatGateway.onJoinChannel(user.id, res.id);
		return {
			id: res.id,
			name: res.name,
			status: this.channeldb.convertString(res.status),
			message: []
		};
	}

	fusionSameName(
		userId: number,
		name: string,
		channel: Channel[],
		old: ChannelInfo[]
	) {
		let res = old;
		for (let i: number = 0; i < channel.length; i++) {
			let member = this.userdb.findMember(userId, channel[i].id);
			if (name == "" || channel[i].name.startsWith(name)) {
				// && member == undefined){
				res.push({
					id: channel[i].id,
					name: channel[i].name,
					status: this.channeldb.convertString(channel[i].status)
				});
			}
		}
		return res;
	}

	async message(user: User, message: MessageWrite) {
		const member: Member = await this.prisma.member.findFirst({
			where: {
				channelId: message.channelId,
				userId: user.id
			}
		});
		if (member == undefined || member.mute) {
			throw new UnauthorizedException(
				"You cannot send message in this channel, refresh the page"
			);
		}
		const msg: Message = await this.channeldb.stockMessages(message);
		await this.chatGateway.emitToRoom(msg.channelId, msg, "onMessage");
	}

	// Give all the public channel the user is not in
	async publicChannel(user: User) {
		const channels: Channel[] = await this.channeldb.getPublicChannel();
		console.log(channels);
		if (channels == undefined) return [];
		for (let i = 0; i < channels.length; i++) {
			delete channels[i]["password"];
			delete channels[i]["ownerId"];
			delete channels[i]["messagesId"];
			/*
			if (this.userdb.isMember(user.id, channels[i].id) || this.userdb.isBan(user.id, channels[i].id))
				channels.splice(i, 1);
			*/
		}
		console.log(channels);
		return channels;
	}

	// Give all the protected channel the user is not in
	async protectedChannel(user: User) {
		const channels: Channel[] = await this.channeldb.getProtectChannel();
		if (channels == undefined) return [];
		for (let i = 0; i < channels.length; i++) {
			delete channels[i]["password"];
			delete channels[i]["ownerId"];
			delete channels[i]["messagesId"];
			/*
			if (this.userdb.isMember(user.id, channels[i].id) || this.userdb.isBan(user.id, channels[i].id))
				channels.splice(i, 1);
			*/
		}
		return channels;
	}

	/*
	async allChannel(user: User) {
		const publicChannel: Channel[] = await this.publicChannel(user);
		const privateChannel: Channel[] = await this.protectedChannel(user);
		return publicChannel.concat(privateChannel);
	}
	*/

	async searchChannel(
		user: User,
		body: { name: string }
	): Promise<ChannelInfo[]> {
		const publicChannel: Channel[] =
			await this.channeldb.getPublicChannel();
		const protectChannel: Channel[] =
			await this.channeldb.getProtectChannel();
		let res: ChannelInfo[] = [];
		res = this.fusionSameName(user.id, body.name, publicChannel, res);
		res = this.fusionSameName(user.id, body.name, protectChannel, res);
		return await res;
	}

	async getBlocked(user: User): Promise<string[]> {
		const listblocked: number[] = this.listBlocked(
			await this.userdb.listBlockedUser(user.id)
		);
		if (listblocked == undefined || listblocked.length == 0) return [];
		return await this.userdb.getUserFromId(listblocked);
	}

	async block(user: User, body: ListName) {
		this.userdb.addBlock(user.id, body.name);
	}

	async unblock(user: User, body: ListName) {
		this.userdb.unBlock(user.id, body.name);
	}

	/*
	async joinChannel(
		user: User,
		channel: ChannelJoin
	): Promise<ChannelPayload> {
		const searchChannel: Channel = await this.channeldb.getChannelInfoName(
			channel.name
		);
		console.log(searchChannel);
		if (searchChannel == null)
			return await this.createChannel(user, channel.name);
		if (
			searchChannel.status == Status.PROTECT &&
			searchChannel.password != channel.password
		)
			throw new UnauthorizedException();
		if (this.channeldb.findBanChannel(channel.name, user.id) == undefined)
			throw new UnauthorizedException();
		await this.channeldb.joinChannel(searchChannel.id, user.id);
		this.chatGateway.onJoinChannel(user.id, searchChannel.id);
		return this.getChannel(
			searchChannel.id,
			this.listBlocked(await this.userdb.listBlockedUser(user.id))
		);
	}
	*/

	async invite(user: User, channel: ChannelInvitation) {
		if ((await this.userdb.findMember(user.id, channel.id)) == undefined)
			throw new UnauthorizedException();
		if (
			this.channeldb.findBanChannel(channel.id, channel.invited) ==
			undefined
		)
			throw new UnauthorizedException();
		this.channeldb.joinChannel(channel.id, channel.invited);
	}

	async deleteMember(channelId: string, userId: number) {
		const find: Member = await this.userdb.findMember(userId, channelId);
		if (find == undefined) throw new UnauthorizedException();
		await this.prisma.member.delete({
			where: { id: find.id }
		});
	}

	async quitChannel(user: User, channelId: { id: string }) {
		console.log(channelId.id);
		this.deleteMember(channelId.id, user.id);
		this.chatGateway.onLeaveChannel(user.id, channelId.id);
	}

	// it's just quit with a check if you are a modo
	async kick(user: User, body: ChannelKick) {
		if (!(await this.userdb.isModo(user.id, body.id)))
			throw new UnauthorizedException();
		this.deleteMember(body.id, body.invited);
	}

	async mute(user: User, body: ChannelMute) {
		if (!(await this.userdb.isModo(user.id, body.id)))
			throw new UnauthorizedException();
		const find: Member = await this.userdb.findMember(body.muted, body.id);
		this.prisma.member.update({
			where: {
				id: find.id
			},
			data: {
				mute: true,
				muteEnd: body.until
			}
		});
	}

	async unmute(user: User, body: ChannelMute) {
		if (!(await this.userdb.isModo(user.id, body.id)))
			throw new UnauthorizedException();
		const find: Member = await this.userdb.findMember(body.muted, body.id);
		this.prisma.member.update({
			where: {
				id: find.id
			},
			data: {
				mute: false
			}
		});
	}

	async ban(user: User, body: ChannelBan) {
		const banned: User = await this.userdb.getUser(body.invited);
		if (!(await this.userdb.isModo(user.id, body.id)))
			throw new UnauthorizedException();
		this.channeldb.banChannel(body.id, body.invited);
		this.deleteMember(body.id, body.invited);
	}

	async unban(user: User, body: ChannelBan) {
		if (!(await this.userdb.isModo(user.id, body.id)))
			throw new UnauthorizedException();
		this.channeldb.unbanChannel(body.id, body.invited);
	}

	async password(user: User, body: ChannelNewPassword) {
		if (!(await this.userdb.isModo(user.id, body.id)))
			throw new UnauthorizedException();
		this.prisma.channel.update({
			where: { id: body.id },
			data: {
				password: body.password
			}
		});
	}

	async listUser(user: User, channelId: string) {
		if (this.userdb.isMember(user.id, channelId))
			return await this.channeldb.getChannelUser(channelId);
		throw new UnauthorizedException();
	}

	async getChannelInfo(user: User, channelId: string): Promise<Channel> {
		if (this.userdb.isMember(user.id, channelId))
			return await this.channeldb.getChannelInfoId(channelId);
		throw new UnauthorizedException();
	}

	async channelChangement(user: User, body: ChannelChangement) {
		if (this.userdb.isOwner(user.id, body.id))
			return await this.channeldb.setChannel(user.id, body.id, body);
		return null;
	}

	async createDirect(user: User, channelId: { name: string }) {}
}
