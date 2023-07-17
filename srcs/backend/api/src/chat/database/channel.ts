import { Message, Channel, Member } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { MessagePayload, ChannelPayload } from "../chat";
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
	async createChannel(channel : ChannelPayload) : Promise<Channel> {
		// Search if the channel doesn't already exist
		let res : Channel;
		const search : Channel[] = await this.prisma.channel.findMany({
			where: {
				name: channel.name
			},
		});
		console.log(search);
		if (search.length == 0) // create if doesn't find
		{
			res = await this.prisma.channel.create({
					data: {
						name: channel.name,
						owner: {
							connect: { id: channel.ownerId, }
						}
					},
			});
		}
		else
		{
			res = search[0];
			console.log(res);
		}
		let member: Member[] = await this.prisma.member.findMany({
			where: {
				channelId: res.id,
				userId: channel.ownerId,
			}
		});
		if (member.length == 0)
		{
			await this.prisma.member.create({
				data: {
					channel: {
						connect: {id: res.id},
					},
					user: {
						connect: {id: res.ownerId},
					}

				}
			}
			)
		}
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