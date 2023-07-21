import { Injectable } from "@nestjs/common";
import { Member, User } from "@prisma/client";
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

    async findMember(userId: number, channelId: string) : Promise<Member> {
        return (this.prisma.member.findFirst({
            where: {
                channelId: channelId,
                userId: userId,
            }
        }));
    }
    /*
    joinChannel
    quitChannel
    blockUser
    inviteChannel
    */
}

export default UserDatabase;