import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class AppModule {}
