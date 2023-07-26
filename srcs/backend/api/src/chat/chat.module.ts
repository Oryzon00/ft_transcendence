import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";
/* Database */
import ChannelDatabase from "./database/channel";
import UserDatabase from "./database/user";

@Module({
	providers: [ChatService, ChatGateway, ChannelDatabase, UserDatabase],
	controllers: [ChatController]
})
export class ChatModule {}
