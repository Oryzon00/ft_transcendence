import { Injectable } from "@nestjs/common";
import { Ban, Block, Member, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
class UserDatabase {
	constructor(private prisma: PrismaService) {}

	// Get all the channelid and userid
	async getMembers(userid: number): Promise<Member[]> {
		try {
			return await this.prisma.member.findMany({
				where: {
					userId: userid
				}
			});
		} catch (error) {
			return error;
		}
	}

	async getMembersfromChannel(channelId: string): Promise<Member[]> {
		try {
			return await this.prisma.member.findMany({
				where: {
					channelId: channelId
				}
			});
		} catch (error) {
			return error;
		}
	}
	async getAllChannels(userid: number): Promise<{ channelId: string }[]> {
		try {
			return await this.prisma.member.findMany({
				where: {
					userId: userid
				},
				select: {
					channelId: true
				}
			});
		} catch (error) {
			return error;
		}
	}

	async getUser(userId: number): Promise<User> {
		try {
			return await this.prisma.user.findUnique({
				where: {
					id: userId
				}
			});
		} catch (error) {
			return error;
		}
	}

	async isModo(userId: number, channelId: string): Promise<boolean> {
		try {
			const res = await this.prisma.member.findFirst({
				where: {
					userId: userId,
					channelId: channelId
				},
				select: {
					isAdmin: true
				}
			});
			return res.isAdmin;
		} catch (error) {
			return error;
		}
	}

	async isOwner(userId: number, channelId: string): Promise<boolean> {
		try {
			const res = await this.prisma.channel.findFirst({
				where: {
					id: channelId
				}
			});
			return res.ownerId == userId;
		} catch (error) {
			return error;
		}
	}

	async isMember(userId: number, channelId: string): Promise<boolean> {
		return (await this.findMember(userId, channelId)) != null;
	}

	async isBan(userId: number, channelId: string): Promise<boolean> {
		return (await this.findBan(userId, channelId)) != null;
	}

	async findMember(userId: number, channelId: string): Promise<Member> {
		try {
			return await this.prisma.member.findFirst({
				where: {
					channelId: channelId,
					userId: userId
				}
			});
		} catch (error) {
			return error;
		}
	}

	async findBan(userId: number, channelId: string): Promise<Ban> {
		return await this.prisma.ban.findFirst({
			where: {
				channelId: channelId,
				userId: userId
			}
		});
	}

	async addBlock(userId: number, blockName: string): Promise<Block> {
		try {
			return await this.prisma.block.create({
				data: {
					isBlock: {
						connect: {
							name: blockName
						}
					},
					hasBlock: {
						connect: {
							id: userId
						}
					}
				}
			});
		} catch (error) {
			return error;
		}
	}

	async unBlock(userId: number, blockName: string) {
		const blocked = await this.prisma.block.findFirst({
			where: {
				isBlock: {},
				hasBlockId: userId
			}
		});
		if (blocked != undefined) {
			try {
				return await this.prisma.block.delete({
					where: {
						isBlockId_hasBlockId: {
							isBlockId: blocked.isBlockId,
							hasBlockId: blocked.hasBlockId
						}
					}
				});
			} catch (error) {
				return error;
			}
		}
	}

	async listBlockedUser(userId: number): Promise<Block[]> {
		try {
			return await this.prisma.block.findMany({
				where: {
					hasBlockId: userId
				}
			});
		} catch (error) {
			return error;
		}
	}

	async getUserFromId(userId: number[]) {
		try {
			return await this.prisma.user.findMany({
				where: {
					id: {
						in: userId
					}
				}
			});
		} catch (error) {
			return error;
		}
	}
}

export default UserDatabase;
