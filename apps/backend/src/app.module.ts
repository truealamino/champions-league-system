import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from 'prisma/prisma.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
