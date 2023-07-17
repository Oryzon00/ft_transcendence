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
import { ChannelCreation } from "./chat";

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
    createChannel(channel: ChannelCreation) {
        return this.ChatService.createChannel(channel);
    }

    @Post('joinChannel')
    joinChannel() {}

    @Post('quitChannel')
    quitChannel() {}

    @Post('setChannel')
    setChannel() {}

    @Post('blockUser')
    blockUser() {}
}