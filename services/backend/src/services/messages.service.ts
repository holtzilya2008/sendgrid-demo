import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, tap } from 'rxjs';

import { DB_ACCESSOR_URL, DOMAIN_NAME, SENDGRID_API_KEY } from 'src/constants';
import { CreateMessageDTO } from 'src/dto/create-message-dto';
import { CreateMessageResponseDTO } from 'src/dto/create-message-response-dto';
import { EmailDTO } from 'src/dto/email-dto';
import { MessageDTO } from 'src/dto/message-dto';
import { BackendEvents } from 'src/events/backend-events.enum';
import { EmailParsedEvent } from 'src/events/email-parsed.event';
import { ParsedEmail } from 'src/types/parsed-email';
import { EmailService } from './email.service';
import { UserService } from './user.service';


@Injectable()
export class MessagesService {

  private readonly path = 'messages';

  constructor(private http: HttpService, 
              private emailService: EmailService,
              private userService: UserService) {

  }

  async createMessage(message: CreateMessageDTO): Promise<string> {
    console.log('MessagesService:createMessage');
    console.log(JSON.stringify(message,null,2));
    console.log('Checking Env Variables');
    console.log(DOMAIN_NAME);
    console.log(SENDGRID_API_KEY);

    const observable = this.http.post(`${DB_ACCESSOR_URL}/${this.path}`, message).pipe(
      tap(response => console.log(response)),
      map((response: AxiosResponse<CreateMessageResponseDTO>) => response.data.document),
      tap(message => this.sendEmailToChatGroup(message)),
      map(message => message._id)
    );
    return firstValueFrom(observable);
  }

  getMessages(): Promise<MessageDTO[]> {
    const observable = this.http.get(`${DB_ACCESSOR_URL}/${this.path}`).pipe(
      tap(response => console.log(response)),
      map((response: AxiosResponse<MessageDTO[]>) => response.data)
    );
    return firstValueFrom(observable);
  }

  private toEmail(message: MessageDTO, to: string): EmailDTO {
    return {
      to,
      from: { name: 'Rick Sanches', email: `our.chat@${DOMAIN_NAME}` },
      text: message.content,
      subject: 'A message was sent via chat'
    }
  }

  private async sendEmailToChatGroup(message: MessageDTO): Promise<any> {
    const to = 'holtzilya2008@gmail.com';
    const email = this.toEmail(message, to);
    console.log(`Emiting sending eamil`);
    return Promise.resolve();
    // this.emailService.sendEmail(email);
  }

  @OnEvent(BackendEvents.EmailParsed)
  private handleEmailParsed(payload: EmailParsedEvent) {
    this.createMessageFromEmail(payload.email);
  }

  private async createMessageFromEmail(email: ParsedEmail): Promise<void> {
    console.log('createMessageFromEmail');
    const user = await this.userService.getUserByEmail(email.from);
    console.log(`user: \n ${JSON.stringify(user)}`);
    const message: CreateMessageDTO = {
      userId: user._id,
      content: email.text
    }
    await this.createMessage(message);
  }

}
