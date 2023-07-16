import { Controller, Post, Get } from "@nestjs/common";

@Controller('chat')
export class ChatController {

    @Post('createChannel')
    createChannel() {}

    @Post('joinChannel')
    joinChannel() {}

    @Post('quitChannel')
    quitChannel() {}

    @Post('setChannel')
    setChannel() {}
}