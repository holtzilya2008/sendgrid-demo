import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { AppGateway } from 'src/app.gateway';

import { DB_ACCESSOR_URL} from 'src/constants';
import { CreateMessageDTO } from 'src/dto/create-message-dto';
import { CreateMessageResponseDTO } from 'src/dto/create-message-response-dto';
import { MessageDTO } from 'src/dto/message-dto';
import { SocketChannel } from 'src/types/socket-channels-enum';


@Injectable()
export class MessagesService {

  private readonly path = 'messages';

  constructor(private http: HttpService, 
              private socketGateway: AppGateway) {

  }
  
  async createMessage(message: CreateMessageDTO): Promise<MessageDTO> {
    if(!message.content) {
      throw new Error('Empty message is not allowed');
    }

    const observable = this.http.post(`${DB_ACCESSOR_URL}/${this.path}`, message).pipe(
      tap(() => this.publishMessagesList()),
      map((response: AxiosResponse<CreateMessageResponseDTO>) => response.data.document)
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

}
