import { Member, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

class UserDatabase {
	constructor(private prisma: PrismaService) {}

    // Get all the channel 
    async getUserData(userid: number) {
        let res : { members: Member[] } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            select: {
                members: true,
            }
        })
        console.log(res);
        return (res);
    }
    /*
    joinChannel
    quitChannel
    blockUser
    inviteChannel
    */
}

export default UserDatabase;