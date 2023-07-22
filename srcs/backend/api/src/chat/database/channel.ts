import { Message, Channel, Member, Ban } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { MessagePayload, ChannelPayload, ChannelCreation } from "../dto/chat.d";
import { Status } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
class ChannelDatabase {
	constructor(private prisma: PrismaService) {}

    /*
    changeStatus
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
		else
			return Status.PROTECT;
	}

	convertString(status : Status) : string {
		if (status == Status.PUBLIC)
			return 'public';
		else if (status == Status.PRIVATE)
			return 'private';
		else
			return 'protect';

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
		this.joinChannel(res.id, res.ownerId, true);
		return (res);
	}


	async joinChannel(channel: string, user: number, admin = false) : Promise<Member> {
		if ((await this.prisma.member.findFirst({
			where: {
				channelId: channel,
				userId: user
			}
		})) == undefined)
		{
			console.log('member')
		return (await this.prisma.member.create({
			data: {
				channel: {
					connect: { id: channel }
				},
				user: { 
					connect: { id: user }
				},
				isAdmin: admin
			}
		}))
	}
	return undefined
	}

	async findBanChannel(channel : string, user: number) {
		return (await this.prisma.ban.findFirst({
			where: {
				channelId: channel,
				userId: user
			}
		}))

	}

	async banChannel(channel: string, user: number, reason = '') : Promise<Ban> {
		return (await this.prisma.ban.create({
			data: {
				channel: {
					connect: { id: channel }
				},
				user: { 
					connect: { id: user }
				},
				reason: reason
			}
		}))
	}

	async unbanChannel(channel: string, user: number, reason = '') : Promise<Ban> {
		const find : Ban = await this.findBanChannel(channel, user);
		return (await this.prisma.ban.delete({
			where: {
				id: find.id
			}
		}))
	}

    async getPublicChannel() : Promise<Channel[]> {
        return (this.prisma.channel.findMany({
            where: {
                status: Status.PUBLIC,
            }
        }))
    }

	async getProtectChannel() : Promise<Channel[]> {
        return (this.prisma.channel.findMany({
            where: {
                status: Status.PROTECT,
            }
        }))
	}

	async getChannelInfo(id: string) : Promise<Channel> {
		return (this.prisma.channel.findUnique({
			where: {
				id: id,
			}
		}))
	}

	async getChannelMessage(id: string) : Promise<Message[]> {
		return (this.prisma.message.findMany({
			where: {
				channelId: id,
			},
		}))
	}

};

export default ChannelDatabase;