import { Message, Channel, Member } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { MessagePayload, ChannelPayload, ChannelCreation } from "../dto/chat";
import { Status } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
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

	convertStatus(status: string) : Status {
		if (status == 'public')
			return Status.PUBLIC;
		else if (status == 'private')
			return Status.PRIVATE;
		return Status.PROTECT;
	}
	// Demo of the creation of a channel
	async createChannel(channel : ChannelCreation, user: number) : Promise<Channel> {
		const res = await this.prisma.channel.create({
					data: {
						name: channel.name,
						owner: {
							connect: {
								id: user,
							}
						},
						password: channel.password,
						status: this.convertStatus(channel.status),
					},
			});
		this.joinChannel(res.id, res.ownerId);
		return (res);
	}


	async joinChannel(channel: number, user: number) : Promise<Member> {
		return (await this.prisma.member.create({
			data: {
				channel: {
					connect: { id: channel }
				},
				user: { 
					connect: { id: user }
				}
			}
		}))
	}

	async 

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