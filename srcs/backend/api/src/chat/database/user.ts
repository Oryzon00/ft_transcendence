import { Member, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

class UserDatabase {
	constructor(private prisma: PrismaService) {}

    // Get all the channelid and userid 
    async getMembers(userid: number) : Promise<{members: Member[]}> {
        let member : { members: Member[] } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            select: {
                members: true,
            }
        })
        return (member);
    }
    /*
    joinChannel
    quitChannel
    blockUser
    inviteChannel
    */
}

export default UserDatabase;