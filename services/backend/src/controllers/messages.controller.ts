import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageDTO } from 'src/dto/message-dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()  
  async getMessages(): Promise<MessageDTO[]> {
    return await this.messagesService.getMessages();
  }
}
