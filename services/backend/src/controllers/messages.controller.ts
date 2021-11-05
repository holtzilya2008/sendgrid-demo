import { Controller, Get } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly appService: MessagesService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}