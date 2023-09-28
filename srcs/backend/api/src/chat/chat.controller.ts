import {
	Controller,
	Post,
	Get,
	UseGuards,
	Patch,
	Body,
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
	ChannelJoin,
	ChannelKick,
	ChannelMute,
	ListChannel,
	MessageWrite
} from "./dto/chat";
import UserDatabase from "./database/user";

@UseGuards(JwtGuard)
@Controller("chat")
export class ChatController {
	constructor(private ChatService: ChatService, private User: UserDatabase) {}

	// Get all the information about himself
	@Get("getData")
	async getData(@GetUser() user: User): Promise<ListChannel> {
		return await this.ChatService.getData(user);
	}

	// To send a message
	@Post("message")
	async message(@GetUser() user: User, @Body() message: MessageWrite) {
		message.authorId = user.id;
		const error: string = await this.ChatService.message(user, message);
		if (error.length > 0) throw new UnauthorizedException(error);
	}

	// Create a new channel
	@Post("/channel/create")
	create(@GetUser() user: User, @Body() channel: ChannelCreation) {
		return this.ChatService.createChannel(user, channel);
	}

	// Get list of channels
	@Get("/channel/public")
	async public(@GetUser() user: User) {
		return await this.ChatService.publicChannel(user);
	}

	@Get("/channel/protected")
	protected(@GetUser() user: User) {
		return this.ChatService.protectedChannel(user);
	}

	// Join an existing channel
	@Post("/channel/join")
	join(@GetUser() user: User, @Body() channel: ChannelJoin) {
		return this.ChatService.joinChannel(user, channel);
	}

	@Patch("/channel/quit")
	quit(@GetUser() user: User, @Body() channel: { id: string }) {
		return this.ChatService.quitChannel(user, channel);
	}

	@Patch("/channel/list")
	async list(
		@GetUser() user: User,
		@Body() body: { channelId: string }
	): Promise<{ user: { id: number; name: string } }[]> {
		return await this.ChatService.listUser(user, body.channelId);
	}

	@Patch("/channel/get")
	async getChannel(
		@GetUser() user: User,
		@Body() channel: { id: string }
	): Promise<ChannelAllInfo> {
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
				messagesId: res.messagesId
			};
		return res;
	}

	@Patch("/channel/settings")
	settings(@GetUser() user: User, @Body() body: ChannelChangement) {
		this.ChatService.channelChangement(user, body);
	}

	@Patch("/channel/kick")
	kick(@GetUser() user: User, @Body() body: ChannelKick) {
		this.ChatService.kick(user, body);
	}

	@Patch("/channel/ban")
	ban(@GetUser() user: User, @Body() body: ChannelBan) {
		this.ChatService.ban(user, body);
	}

	@Patch("/channel/unban")
	unban(@GetUser() user: User, @Body() body: ChannelBan) {
		this.ChatService.unban(user, body);
	}

	@Patch("/channel/mute")
	mute(@GetUser() user: User, @Body() body: ChannelMute) {
		this.ChatService.mute(user, body);
	}

	@Patch("/channel/unmute")
	unmute(@GetUser() user: User, @Body() body: ChannelMute) {
		this.ChatService.unmute(user, body);
	}

	@Post("/channel/direct")
	direct_message(@GetUser() user: User, @Body() body: { id: string }) {
		this.ChatService.createDirect([user.id, Number(body.id)]);
	}

	@Post("/channel/direct/other")
	async get_other_info(
		@GetUser() user: User,
		@Body() body: { id: string }
	): Promise<{ name: string; image: string }> {
		const oUser: User = await this.ChatService.getOtherInfo(
			user.id,
			body.id
		);
		return { name: oUser.name, image: oUser.image };
	}

	@Post("/channel/owner")
	async isOwner(
		@GetUser() user: User,
		@Body() body: { id: string }
	): Promise<boolean> {
		return await this.User.isOwner(user.id, body.id);
	}

	@Post("/channel/modo")
	async isModo(
		@GetUser() user: User,
		@Body() body: { id: string }
	): Promise<boolean> {
		return await this.User.isModo(user.id, body.id);
	}

	@Post("/channel/modo/change")
	async changeModo(
		@GetUser() user: User,
		@Body() body: { userId: number; channelId: string }
	) {
		this.ChatService.changeModo(user, body);
	}

	@Post("/fight")
	async Fight(@GetUser() user: User, @Body() body: { id: string }) : Promise<{gameId: string}> {
		const msg = await this.ChatService.fight(user, body.id);
		if(msg == '') {
			return undefined;
		} else {
			this.ChatService.message(user, {
				channelId: body.id,
				authorId: user.id,
				content: "Come here for the fight",
				link: "/play?gameId=" + msg
			});
			return ({gameId: msg});
		}

	}
}
