import {
	Controller,
	Post,
	Get,
	UseGuards,
	Patch,
	Body,
	Put,
	UnauthorizedException
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { GetUser } from "src/auth/decorator";
import { Channel, User } from "@prisma/client";
import { JwtGuard } from "src/auth/guard";
import {
	ChannelAllInfo,
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
	MessageWrite
} from "./dto/chat";
import { get } from "http";

@UseGuards(JwtGuard)
@Controller("chat")
export class ChatController {
	constructor(private ChatService: ChatService) {}

	// Get all the information about himself
	@Get("getData")
	async getData(@GetUser() user: User): Promise<ListChannel> {
		return await this.ChatService.getData(user);
	}

	@Get("getDirect")
	async getDirect(@GetUser() user: User): Promise<ListChannel> {
		return await this.ChatService.getDirect(user);
	}
	// To send a message
	@Post("message")
	async message(@GetUser() user: User, @Body() message: MessageWrite) {
		console.log("message");
		message.authorId = user.id;
		const error: string = await this.ChatService.message(user, message);
		if (error.length > 0) throw new UnauthorizedException(error);
	}

	// Create a new channel
	@Post("/channel/create")
	create(@GetUser() user: User, @Body() channel: ChannelCreation) {
		console.log(channel);
		console.log("/channel/create");
		return this.ChatService.createChannel(user, channel);
	}

	// Get list of channels
	@Get("/channel/public")
	async public(@GetUser() user: User) {
		console.log("/channel/public");
		return await this.ChatService.publicChannel(user);
	}

	@Get("/channel/protected")
	protected(@GetUser() user: User) {
		console.log("/channel/protected");
		return this.ChatService.protectedChannel(user);
	}

	/*
	@Get("/channel/all")
	all(@GetUser() user : User) {
		return this.ChatService.allChannel(user);
	}
	*/

	// Join an existing channel
	@Post("/channel/join")
	join(@GetUser() user: User, @Body() channel: ChannelJoin) {
		console.log("/channel/join");
		return this.ChatService.joinChannel(user, channel);
	}

	@Patch("/channel/quit")
	quit(@GetUser() user: User, @Body() channel: { id: string }) {
		console.log("/channel/quit");
		return this.ChatService.quitChannel(user, channel);
	}

	@Get("/channel/list")
	async list(
		@GetUser() user: User,
		@Body() body: { channelId: string }
	): Promise<{ user: { id: number; name: string } }[]> {
		console.log("/channel/list");
		return await this.ChatService.listUser(user, body.channelId);
	}

	@Get("/channel/get")
	async getChannel(
		@GetUser() user: User,
		@Body() channel: { id: string }
	): Promise<ChannelAllInfo> {
		console.log("channel/get");
		const res: Channel = await this.ChatService.getChannelInfo(
			user,
			channel.id
		);
		if (res != null)
			return {
				id: res.id,
				createdAt: res.createdAt,
				updateAt: res.updateAt,
				name: res.name,
				avatar: res.avatar,
				description: res.description,
				status: res.status,
				ownerId: res.ownerId,
				messagesId: res.messagesId
			};
		return res;
	}

	// Moderation
	@Get("/isBlocked")
	async getBlocked(@GetUser() user: User): Promise<string[]> {
		console.log("/isBlocked");
		return await this.ChatService.getBlocked(user);
	}

	@Post("/user/block")
	block(@GetUser() user: User, @Body() body: ListName) {
		console.log("/user/block");
		return this.ChatService.block(user, body);
	}

	@Post("/user/unblock")
	unblock(@GetUser() user: User, @Body() body: ListName) {
		console.log("/user/unblock");
		return this.ChatService.unblock(user, body);
	}

	@Patch("/channel/settings")
	password(@GetUser() user: User, @Body() body: ChannelChangement) {
		console.log("/channel/settings");
		this.ChatService.channelChangement(user, body);
		return null;
	}

	@Patch("/channel/kick")
	kick(@GetUser() user: User, @Body() body: ChannelKick) {
		console.log("/channel/kick");
		this.ChatService.kick(user, body);
		return null;
	}

	@Patch("/channel/ban")
	ban(@GetUser() user: User, @Body() body: ChannelBan) {
		console.log("/channel/ban");
		this.ChatService.ban(user, body);
	}

	@Patch("/channel/unban")
	unban(@GetUser() user: User, @Body() body: ChannelBan) {
		console.log("/channel/unban");
		this.ChatService.unban(user, body);
	}

	@Patch("/channel/mute")
	mute(@GetUser() user: User, @Body() body: ChannelMute) {
		console.log("/channel/mute");
		this.ChatService.mute(user, body);
	}

	@Patch("/channel/unmute")
	unmute(@GetUser() user: User, @Body() body: ChannelMute) {
		console.log("/channel/unmute");
		this.ChatService.unmute(user, body);
	}

	@Post("/channel/direct")
	direct_message(@GetUser() user: User, @Body() body: { name: string }) {
		console.log("/channel/direct");
		this.ChatService.createDirect(user, body);
	}
}
