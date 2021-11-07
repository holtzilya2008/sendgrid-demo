import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { EmailService } from './services/email.service';

@Module({
  imports: [HttpModule],
  controllers: [MessagesController],
  providers: [MessagesService, EmailService],
})
export class AppModule {}
