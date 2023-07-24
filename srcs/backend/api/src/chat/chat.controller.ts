import { 
    Controller,
    Post,
    Get,
    UseGuards,
    Patch,
    Body,
    Put
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { JwtGuard } from "src/auth/guard";
import { ChannelBan, ChannelCreation, ChannelInfo, ChannelInvitation, ChannelJoin, ChannelKick, ChannelMute, ChannelNewPassword, ListChannel, ListName, MessageWrite } from "./dto/chat";

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
    constructor(
        private ChatService: ChatService) {}

    @Get('getData')
    async getData(@GetUser() user : User) : Promise<ListChannel> {
        return (await this.ChatService.getData(user));
    }

    @Post('message')
    message(
        @GetUser() user : User,
        @Body() message : MessageWrite
    ) {

        message.authorId = user.id;
        this.ChatService.message(user, message);
    }

    @Patch('/channel/join')
    join(
        @GetUser() user : User,
        @Body() channel : ChannelJoin
    ) {
        return (this.ChatService.joinChannel(user, channel));
    }

    @Patch('/channel/quit')
    quit(
        @GetUser() user : User,
        @Body() channel : { id: string }
    ) {
        return (this.ChatService.quitChannel(user, channel));
    }

    @Get('/channel/list')
    list(
        @GetUser() user : User,
        @Body() body : { channelId: string}
    )
    {
        return (this.ChatService.listUser(user, body.channelId))
    }

    @Get('/user/listBlock')
    async getBlocked(
        @GetUser() user : User,
    ) : Promise<string[]>
    {
        return (await this.ChatService.getBlocked(user));
    }

    @Post('/user/block')
    block(
        @GetUser() user : User,
        @Body() body : ListName
    )  
    {
        return (this.ChatService.block(user, body))
    }

    @Post('/user/unblock')
    unblock(
        @GetUser() user : User,
        @Body() body : ListName
    )
    {
        return (this.ChatService.unblock(user, body))
    }

    @Patch('/channel/sendPassword')
    sendPassword(
        @GetUser() user : User,
        @Body() body : ChannelNewPassword
    )
    {}

    @Patch('/channel/password')
    password(
        @GetUser() user : User,
        @Body() body : ChannelNewPassword
    )
    {
        this.ChatService.password(user, body);
        return (null)
    }

    @Patch('/channel/kick')
    kick(
        @GetUser() user : User,
        @Body() body : ChannelKick
    ){
        this.ChatService.kick(user, body)
        return (null)
    }

    @Patch('/channel/ban')
    ban(
        @GetUser() user : User,
        @Body() body : ChannelBan
    ){
        this.ChatService.ban(user, body);
    }

    @Patch('/channel/unban')
    unban(
        @GetUser() user : User,
        @Body() body : ChannelBan
    ){
        this.ChatService.unban(user, body);
    }

    @Patch('/channel/mute')
    mute(
        @GetUser() user : User,
        @Body() body : ChannelMute
    )
    {
        this.ChatService.mute(user, body);
    }

    @Patch('/channel/unmute')
    unmute(
        @GetUser() user : User,
        @Body() body : ChannelMute
    )
    {
        this.ChatService.unmute(user, body);
    }
}