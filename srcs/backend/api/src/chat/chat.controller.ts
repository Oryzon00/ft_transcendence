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

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
    constructor(private ChatService: ChatService) {}

    @Get('getData')
    getData(@GetUser() user : User) {
        return this.ChatService.getData(user);
    }

    @Get('searchChannel')
    searchChannel() {}

    @Post('createChannel')
    createChannel() {}

    @Post('joinChannel')
    joinChannel() {}

    @Post('quitChannel')
    quitChannel() {}

    @Post('setChannel')
    setChannel() {}

    @Post('blockUser')
    blockUser() {}
}