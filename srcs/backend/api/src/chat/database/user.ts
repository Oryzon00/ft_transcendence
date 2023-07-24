import { Injectable } from "@nestjs/common";
import { Ban, Member, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
class UserDatabase {
	constructor(private prisma: PrismaService) {}

    // Get all the channelid and userid 
    async getMembers(userid: number) : Promise< Member[]>{
        try {
            return (await this.prisma.member.findMany({
                where: {
                    userId: userid,
                }
            }))
        } catch (error) {
            return (error);
        }
    }

    async getAllChannels(userid: number) : Promise<{channelId: string}[]> {
        try {
            return (await this.prisma.member.findMany({
                where: {
                    userId: userid
                },
                select: {
                    channelId: true
                }
            }))
        } catch (error) {
            return (error);
        }
    }

    async getUser(userId: number) : Promise<User>
    {
        try {
            return (await this.prisma.user.findUnique({
                where: {
                    id: userId
                },
            }))
        } catch (error) {
            return (error);
        }
    }

    async isModo(userId: number, channelId: string) : Promise<boolean>
    {
        const res = await this.prisma.member.findFirst({
            where: {
                userId: userId,
                channelId: channelId
            },
            select: {
                isAdmin: true
            }
        });
        return (res.isAdmin)
    }

    async isMember(userId : number, channelId: string) : Promise<boolean> {
        return ((await this.findMember(userId, channelId)) != undefined)
    }

    async findMember(userId: number, channelId: string) : Promise<Member> {
        return (await this.prisma.member.findFirst({
            where: {
                channelId: channelId,
                userId: userId,
            }
        }));
    }

    async findBan(userId : number, channelId: string) : Promise<Ban> {
        return (await this.prisma.ban.findFirst({
            where: {
                channelId: channelId,
                userId: userId,
            }
        }))
    }
    /*
    joinChannel
    quitChannel
    blockUser
    inviteChannel
    */
}

export default UserDatabase;