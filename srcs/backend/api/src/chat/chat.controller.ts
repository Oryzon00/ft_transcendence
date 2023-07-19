import { 
    Controller,
    Post,
    Get,
    UseGuards,
    Patch,
    Put
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { JwtGuard } from "src/auth/guard";

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
    constructor(private ChatService: ChatService) {}

    @Get('getData')
    getData(@GetUser() user : User) {
        return this.ChatService.getData(user);
    }

    @Get('/channel/search')
    searchChannel() {
        return this.ChatService.searchChannel()
    }

    @Post('/channel/create')
    createChannel(
        @GetUser() user : User,
        channel: any
    ) {
        return (this.ChatService.createChannel(user, channel.body));
    }

    @Patch('/channel/join')
    joinChannel(
        @GetUser() user : User,
        channel: any
    ) {
        const res : any = this.ChatService.joinChannel(user, channel);
        console.log(res);
        return res
    }

    @Patch('/channel/quit')
    quitChannel() {}

    @Put('/channel/set')
    setChannel() {}

    @Post('/user/block')
    blockUser() {}

}