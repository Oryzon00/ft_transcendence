import { Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
class UserDatabase {
	constructor(private prisma: PrismaService) {}

    // Get all the channelid and userid 
    async getMembers(userid: number) : Promise< Member[]>{
        try {
            return (await this.prisma.member.findMany({
                where: {
                    id: userid,
                }
            }))
        } catch (error) {
            return (error);
        }
    }

    async getAllChannels(userid: number) : Promise<{channelId: number}[]> {
        try {
            return (await this.prisma.member.findMany({
                where: {
                    id: userid
                },
                select: {
                    channelId: true
                }
            }))
        } catch (error) {
            return (error);
        }
    }
    /*
    joinChannel
    quitChannel
    blockUser
    inviteChannel
    */
}

export default UserDatabase;