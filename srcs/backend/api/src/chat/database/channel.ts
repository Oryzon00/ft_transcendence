import { Message, Channel, Member, Ban, User, Block } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { MessagePayload, ChannelPayload, ChannelCreation, MessageWrite } from "../dto/chat.d";
import { Status } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
class ChannelDatabase {
	constructor(private prisma: PrismaService) {}

    /*
    changeStatus
    */

	async stockMessages(message : MessageWrite) : Promise<Message>{
		console.log('Message:', message);
		const res: Message = await this.prisma.message.create({
			data: {
				content: message.content,
				channel: {
					connect: { id: message.channelId }
				},
				author: {
					connect: { id: message.authorId }
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
	async createChannel(name : string, user: number) : Promise<Channel> {
		const res : Channel = await this.prisma.channel.create({
					data: {
						name: name,
						owner: {
							connect: {
								id: user,
							}
						},
						status: Status.PUBLIC,
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
        return (await this.prisma.channel.findMany({
            where: {
                status: Status.PUBLIC,
            }
        }))
    }

	async getProtectChannel() : Promise<Channel[]> {
        return (await this.prisma.channel.findMany({
            where: {
                status: Status.PROTECT,
            }
        }))
	}

	async getChannelInfo(name: string) : Promise<Channel> {
		return (await this.prisma.channel.findUnique({
			where: {
				name: name,
			}
		}))
	}

	// Do not take all the user blocked
	async getChannelMessage(id: string, blocked: number[]) : Promise<Message[]> {
		let res : Message[] = [];
		const messages : Message[] = await this.prisma.message.findMany({
			where: {
				channelId: id,
			},
		})
		for (let i = 0; i < messages.length; i++)
		{
			if (!(messages[i].authorId in blocked))
				res.push(messages[i]);
		}
		return (res);
	}

	async getChannelUser(id: string) : Promise<{user : {id: number, name: string}}[]> {
		return (await this.prisma.member.findMany({
			where: {
				channelId: id
			},
			select: 
			{
				user: {
						select: {
							id: true,
							name: true
						}
					}
				}
			}
		));
	}

};

export default ChannelDatabase;