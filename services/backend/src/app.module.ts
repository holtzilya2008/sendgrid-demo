import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { AppGateway } from './app.gateway';

@Module({
  imports: [HttpModule],
  controllers: [MessagesController, UsersController],
  providers: [MessagesService, UserService, AppGateway],
})
export class AppModule {}
