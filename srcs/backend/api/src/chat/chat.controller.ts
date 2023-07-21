import { 
    Controller,
    Post,
    Get,
    UseGuards,
    Patch,
    Put,
    Body
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { JwtGuard } from "src/auth/guard";
import { ChannelBan, ChannelCreation, ChannelInvitation, ChannelJoin, ChannelKick, ChannelMute, ChannelNewPassword } from "./dto/chat";

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
    constructor(private ChatService: ChatService) {}

    @Get('getData')
    getData(@GetUser() user : User) {
        return this.ChatService.getData(user);
    }

    @Post('/channel/create')
    create(
        @GetUser() user : User,
        @Body() channel : ChannelCreation
    ) {
        console.log(channel)
        return (this.ChatService.createChannel(user, channel));
    }

    @Patch('/channel/join')
    join(
        @GetUser() user : User,
        @Body() channel : ChannelJoin
    ) {
        return (this.ChatService.joinChannel(user, channel));
    }

    @Patch('/channel/invite')
    invite(
        @GetUser() user : User,
        @Body() invite : ChannelInvitation
    ) {
        return (this.ChatService.invite(user, invite));
    }

    @Patch('/channel/quit')
    quit(
        @GetUser() user : User,
        @Body() channel : { id: string }
    ) {
        return (this.ChatService.quitChannel(user, channel));
    }

    @Get('/channel/search')
    searchChannel(
        @Body() body : { name : string },
    ){
        return (this.ChatService.searchChannel(body));
    }

    @Post('/user/block')
    block(
        @GetUser() user : User,
        @Body() channel
    ) {}

    @Patch('/channel/password')
    password(
        @GetUser() user : User,
        @Body() body : ChannelNewPassword
    )
    {
        this.ChatService.password(user, body);
    }

    @Patch('/channel/kick')
    kick(
        @GetUser() user : User,
        @Body() body : ChannelKick
    ){
        this.ChatService.kick(user, body)
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