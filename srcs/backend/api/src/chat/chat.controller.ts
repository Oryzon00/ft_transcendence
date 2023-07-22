import { 
    Controller,
    Post,
    Get,
    UseGuards,
    Patch,
    Body
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { JwtGuard } from "src/auth/guard";
import { ChannelBan, ChannelCreation, ChannelInfo, ChannelInvitation, ChannelJoin, ChannelKick, ChannelMute, ChannelNewPassword, ListChannel } from "./dto/chat";

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
    constructor(private ChatService: ChatService) {}

    @Get('getData')
    async getData(@GetUser() user : User) : Promise<ListChannel> {
        return( await (this.ChatService.getData(user)) );
    }

    @Post('/channel/create')
    create(
        @GetUser() user : User,
        @Body() channel : ChannelCreation
    ) : Promise<ChannelInfo> {
        return  (this.ChatService.createChannel(user, channel));
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
    search(
        @GetUser() user : User,
        @Body() body : { name : string },
    ){
        return (this.ChatService.searchChannel(user, body));
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