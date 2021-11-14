import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailData } from '@sendgrid/helpers/classes/email-address';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { AppGateway } from 'src/app.gateway';

import { CHAT_NAME, DB_ACCESSOR_URL, DOMAIN_NAME, SENDGRID_API_KEY } from 'src/constants';
import { CreateMessageDTO } from 'src/dto/create-message-dto';
import { CreateMessageResponseDTO } from 'src/dto/create-message-response-dto';
import { EmailDTO } from 'src/dto/email-dto';
import { MessageDTO } from 'src/dto/message-dto';
import { UserDTO } from 'src/dto/user-dto';
import { BackendEvents } from 'src/events/backend-events.enum';
import { EmailParsedEvent } from 'src/events/email-parsed.event';
import { ParsedEmail } from 'src/types/parsed-email';
import { SocketChannel } from 'src/types/socket-channels-enum';
import { EmailService } from './email.service';
import { UserService } from './user.service';


@Injectable()
export class MessagesService {

  private readonly path = 'messages';

  constructor(private http: HttpService, 
              private emailService: EmailService,
              private userService: UserService,
              private socketGateway: AppGateway) {

  }

  async createMessage(message: CreateMessageDTO): Promise<MessageDTO> {
    console.log('MessagesService:createMessage');
    console.log(JSON.stringify(message,null,2));
    if(!message.content) {
      throw new Error('Empty message is not allowed');
    }

    const observable = this.http.post(`${DB_ACCESSOR_URL}/${this.path}`, message).pipe(
      tap(() => this.publishMessagesList()),
      map((response: AxiosResponse<CreateMessageResponseDTO>) => response.data.document),
      tap(message => this.sendEmailToChatGroup(message)),
    );
    return firstValueFrom(observable);
  }

  private async publishMessagesList(): Promise<void> {
    const messages = await this.getMessages();
    this.socketGateway.publish<MessageDTO[]>(SocketChannel.MessagesUpdated ,messages);
  }

  getMessages(): Promise<MessageDTO[]> {
    const observable = this.http.get(`${DB_ACCESSOR_URL}/${this.path}`).pipe(
      tap(response => console.log(response)),
      map((response: AxiosResponse<MessageDTO[]>) => response.data)
    );
    return firstValueFrom(observable);
  }

  private async sendEmailToChatGroup(message: MessageDTO): Promise<void> {
    const email = await this.createEmailForChatGroup(message);
    this.emailService.sendEmail(email);
  }

  private async createEmailForChatGroup(message: MessageDTO): Promise<EmailDTO> {
    const users = await this.userService.getUsers();
    const author = users.find(u => u._id === message.userId);
    const to = this.getEmailsOfChatGroup(users, message.userId);
    return {
      to,
      from: { name: author.nickName, email: `${CHAT_NAME}@${DOMAIN_NAME}` },
      text: message.content,
      subject: 'Sending message via chat'
    }
  }

  private getEmailsOfChatGroup(users: UserDTO[], messageAuthorId: string): EmailData[] {
    return users.filter(u => u._id !== messageAuthorId)
                .map(u => ({ name: u.nickName, email: u.email }));
  }


  @OnEvent(BackendEvents.EmailParsed)
  private handleEmailParsed(payload: EmailParsedEvent) {
    this.createMessageFromEmail(payload.email);
  }

  private async createMessageFromEmail(email: ParsedEmail): Promise<void> {
    const user = await this.userService.getUserByEmail(email.from);
    const message: CreateMessageDTO = {
      userId: user._id,
      content: email.text
    }
    await this.createMessage(message);
  }

}
