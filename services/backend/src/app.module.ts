import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [HttpModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class AppModule {}
