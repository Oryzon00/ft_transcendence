import { 
    Controller,
    Post,
    Get,
    UseGuards
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";
import { JwtGuard } from "src/auth/guard";
import { ChannelCreation, ChannelJoin } from "./chat";
import { ConnectedSocket } from "@nestjs/websockets";
import { Socket } from "dgram";

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
    constructor(private ChatService: ChatService) {}

    @Get('getData')
    getData(@GetUser() user : User) {
        return this.ChatService.getData(user);
    }

    @Get('searchChannel')
    searchChannel() {
        //return this.ChatService.searchChannel
    }

    @Post('createChannel')
    createChannel(
        @GetUser() user : User,
        @ConnectedSocket() socket,
        channel: ChannelCreation
    ) {
        return this.ChatService.createChannel(user, socket, channel);
    }

    @Post('joinChannel')
    joinChannel(
        @GetUser() user : User,
        @ConnectedSocket() socket,
        channel: ChannelJoin
    ) {
        return this.ChatService.joinChannel(user, socket, channel);
    }

    @Post('quitChannel')
    quitChannel() {}

    @Post('setChannel')
    setChannel() {}

    @Post('blockUser')
    blockUser() {}
}