import { Member } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

class UserDatabase {
	constructor(private prisma: PrismaService) {}

    // Get all the channelid and userid 
    async getMembers(userid: number) : Promise< Member[] | undefined >{
        try {
            return (await this.prisma.member.findMany({
                where: {
                    id: userid,
                }
            }))
        } catch (error) {
            console.log(error);
            return undefined;
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