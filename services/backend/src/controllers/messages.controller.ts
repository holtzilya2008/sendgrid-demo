import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageDTO } from 'src/dto/create-message-dto';
import { MessageDTO } from 'src/dto/message-dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()  
  async getMessages(): Promise<MessageDTO[]> {
    return await this.messagesService.getMessages();
  }

  @Post()
  async createMessage(@Body() message: CreateMessageDTO): Promise<string> {
    return await this.messagesService.createMessage(message);
  }

}
