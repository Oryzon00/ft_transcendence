import { Message, Channel, Member } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { MessagePayload, ChannelPayload, ChannelCreation, status } from "../chat";
import { Status } from "@prisma/client";

class ChannelDatabase {
	constructor(private prisma: PrismaService) {}

    /*
    changeStatus
    destroyChannel
    */

	async stockMessages(message : MessagePayload) : Promise<Message>{
		const res: Message = await this.prisma.message.create({
			data: {
				content: message.content,
				channel: {
					connect: { id: message.channelId }
				},
				author: {
					connect: { id: message.authorId}
				}
			}
		})
		return (res);
	};

	// Demo of the creation of a channel
	async createChannel(channel : ChannelCreation) : Promise<Channel> {
		const res = await this.prisma.channel.create({
					data: {
						name: channel.name,
						owner: {
							connect: { id: channel.userId, }
						},
						password: channel.password,
						//status: status.PUBLIC
					},
			});
		return (res);
		}

    async getPublicChannel() : Promise<Channel[]> {
        return (this.prisma.channel.findMany({
            where: {
                status: Status.PUBLIC,
            }
        }))
    }

	async getChannelInfo(id: number) : Promise<Channel> {
		return (this.prisma.channel.findUnique({
			where: {
				id: id,
			}
		}))
	}

	async getChannelMessage(id: number) : Promise<Message[]> {
		return (this.prisma.message.findMany({
			where: {
				channelId: id,
			},
		}))
	}
};

export default ChannelDatabase;