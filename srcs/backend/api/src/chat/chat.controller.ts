import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	@Post('send')
	sendMessage(message, channel) {
		this.chatService.sendMessage(message, channel);
	}
}
