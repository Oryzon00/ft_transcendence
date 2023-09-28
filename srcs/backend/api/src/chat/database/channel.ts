import { Message, Channel, Member, Ban, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import {
	ChannelCreation,
	MessageWrite,
	ChannelChangement,
	MessageSend
} from "../dto/chat.d";
import { Status } from "@prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
class ChannelDatabase {
	constructor(private prisma: PrismaService) {}

	/*
    changeStatus
    */

	async stockMessages(message: MessageWrite): Promise<Message> {
		try {
			const res: Message = await this.prisma.message.create({
				data: {
					content: message.content,
					link: message.link,
					channel: {
						connect: { id: message.channelId }
					},
					author: {
						connect: { id: message.authorId }
					}
				}
			});
			return res;
		} catch (error) {
			return error;
		}
	}

	convertStatus(status: string): Status {
		if (status == "public") return Status.PUBLIC;
		else if (status == "private") return Status.PRIVATE;
		else return Status.PROTECT;
	}

	convertString(status: Status): string {
		if (status == Status.PUBLIC) return "public";
		else if (status == Status.PRIVATE) return "private";
		else return "protect";
	}
	// Demo of the creation of a channel
	async createChannel(
		channel: ChannelCreation,
		user: number
	): Promise<Channel> {
		let hashPassword = "";
		if (channel.password.length > 0) {
			channel.status = "protect";
			hashPassword = await bcrypt.hash(channel.password, 10);
		}
		try {
			const res: Channel = await this.prisma.channel.create({
				data: {
					name: channel.name,
					owner: {
						connect: {
							id: user
						}
					},
					status: this.convertStatus(channel.status.toLowerCase()),
					password: hashPassword
				}
			});
			this.joinChannel(res.id, user, true);
			return res;
		} catch (error) {
			return error;
		}
	}

	async createDirect(user: number[]): Promise<Channel> {
		try {
			const res: Channel = await this.prisma.channel.create({
				data: {
					name: "DIRECT",
					direct: true,
					status: Status.PRIVATE
				}
			});
			this.joinChannel(res.id, user[0]);
			if (user[0] != user[1]) this.joinChannel(res.id, user[1]);
			return res;
		} catch (error) {
			return error;
		}
	}

	async findDirectChannel(user: number[]): Promise<Channel> {
		try {
			const res: Channel = await this.prisma.channel.findFirst({
				where: {
					name: "DIRECT",
					members: {
						every: {
							userId: { in: user }
						}
					}
				}
			});
			return res;
		} catch (error) {
			return error;
		}
	}

	async setChannel(
		userId: number,
		channelId: string,
		body: ChannelChangement
	): Promise<Channel> {
		try {
			let res: Channel;
			if (body.status == "protect") {
				const hashPassword = await bcrypt.hash(body.password, 10);
				res = await this.prisma.channel.update({
					where: {
						id: channelId
					},
					data: {
						name: body.name,
						description: body.description,
						status: this.convertStatus(body.status),
						password: hashPassword
					}
				});
			} else {
				res = await this.prisma.channel.update({
					where: {
						id: channelId
					},
					data: {
						name: body.name,
						status: this.convertStatus(body.status)
					}
				});
			}
			return res;
		} catch (error) {
			return error;
		}
	}
	async joinChannel(
		channel: string,
		user: number,
		admin = false
	): Promise<Member> {
		if (
			(await this.prisma.member.findFirst({
				where: {
					channelId: channel,
					userId: user
				}
			})) == undefined
		) {
			return await this.prisma.member.create({
				data: {
					channel: {
						connect: { id: channel }
					},
					user: {
						connect: { id: user }
					},
					isAdmin: admin
				}
			});
		}
		return undefined;
	}

	async findBanChannel(channel: string, user: number) {
		try {
			return await this.prisma.ban.findFirst({
				where: {
					channelId: channel,
					userId: user
				}
			});
		} catch (error) {
			return error;
		}
	}

	async banChannel(
		channel: string,
		user: number,
		reason: string = ""
	): Promise<Ban> {
		try {
			return await this.prisma.ban.create({
				data: {
					channel: {
						connect: { id: channel }
					},
					user: {
						connect: { id: user }
					},
					reason: reason
				}
			});
		} catch (error) {
			return error;
		}
	}

	async unbanChannel(
		channel: string,
		user: number,
		reason = ""
	): Promise<Ban> {
		try {
			const find: Ban = await this.findBanChannel(channel, user);
			return await this.prisma.ban.delete({
				where: {
					id: find.id
				}
			});
		} catch (error) {
			return error;
		}
	}

	async getPublicChannel(): Promise<Channel[]> {
		return await this.prisma.channel.findMany({
			where: {
				status: Status.PUBLIC
			}
		});
	}

	async getProtectChannel(): Promise<Channel[]> {
		return await this.prisma.channel.findMany({
			where: {
				status: Status.PROTECT
			}
		});
	}

	async getChannelInfoId(id: string, userId: number = 0): Promise<Channel> {
		let res: Channel = await this.prisma.channel.findUnique({
			where: {
				id: id
			}
		});
		if (res.direct && userId != 0) {
			const member = await this.prisma.member.findMany({
				where: {
					channelId: id
				},
				include: {
					user: true
				}
			});
			if (member.length > 1) {
				res.name =
					member[0].user.id == userId
						? member[1].user.name
						: member[0].user.name;
			} else {
				res.name = member[0].user.name;
			}
		}
		return res;
	}

	async getChannelMessage(id: string): Promise<MessageSend[]> {
		let res: MessageSend[] = [];
		const messages: Message[] = await this.prisma.message.findMany({
			where: {
				channelId: id
			}
		});
		for (let i = 0; i < messages.length; i++) {
			let add: MessageSend = {
				id: messages[i].id,
				createdAt: messages[i].createdAt,
				updateAt: messages[i].updateAt,
				authorId: messages[i].authorId,
				content: messages[i].content,
				channelId: messages[i].channelId,
				avatar: "",
				username: "",
				link: messages[i].link
			};
			try {
				let user: User = await this.prisma.user.findFirst({
					where: {
						id: messages[i].authorId
					}
				});
				add.username = user.name;
				add.avatar = user.image;
			} catch {
				throw new NotFoundException();
			}
			res.push(add);
		}
		return res;
	}

	async getChannelUser(id: string): Promise<
		{
			isAdmin: boolean;
			mute: boolean;
			muteEnd: Date;
			user: { id: number; name: string; image: string };
			channel: { ownerId: number };
		}[]
	> {
		try {
			return await this.prisma.member.findMany({
				where: {
					channelId: id
				},
				select: {
					isAdmin: true,
					mute: true,
					muteEnd: true,
					user: {
						select: {
							id: true,
							name: true,
							image: true
						}
					},
					channel: {
						select: {
							ownerId: true
						}
					}
				}
			});
		} catch (error) {
			return error;
		}
	}
}

export default ChannelDatabase;
