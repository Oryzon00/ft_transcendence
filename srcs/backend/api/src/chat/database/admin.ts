import { PrismaService } from "src/prisma/prisma.service";

class AdminDatabase {
	constructor(private prisma: PrismaService) {}

    /*
    async addAdmin();
    async expulseUser();
    async banUser();
    async muteUser();
    */
}

export default AdminDatabase;