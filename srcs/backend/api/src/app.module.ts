import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.service';
import { UserModule } from './user/user.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthService, UserModule, PrismaModule],
})
export class AppModule {}
