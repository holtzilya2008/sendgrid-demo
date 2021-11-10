import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { EmailService } from './services/email.service';
import { InboundEmailController } from './controllers/inbound-email.controller';

@Module({
  imports: [HttpModule],
  controllers: [MessagesController, InboundEmailController],
  providers: [MessagesService, EmailService],
})
export class AppModule {}
