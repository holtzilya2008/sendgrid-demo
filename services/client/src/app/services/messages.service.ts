import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageDTO } from '../dto/message-dto';
import { MessagesApiService } from './messages-api.service';
import { isEqual } from 'lodash';
import { CreateMessageDTO } from '../dto/create-message-dto';
import { SocketService } from './socket.service';
import { SocketChannel } from '../types/socket-channels-enum';

@Injectable()
export class MessagesService {

  private messages = new BehaviorSubject<MessageDTO[]>([]);
  messages$ = this.messages.asObservable();

  constructor(private api: MessagesApiService,
              private socketService: SocketService) { }

  async createMessage(userId: string, content: string): Promise<void> {
    const message: CreateMessageDTO = {
      content,
      userId
    }
    return await this.api.createMessage(message).toPromise();
  }

  public listenToNewMessages(until: Observable<any>) {
    this.socketService.listen<MessageDTO[]>(SocketChannel.MessagesUpdated).pipe(
      takeUntil(until)
    ).subscribe((messagesList) => {
      if (!isEqual(messagesList, this.messages.value)) {
        this.messages.next(messagesList);
      }
    });
    until.subscribe(() => {
      this.messages.next([]);
    });
  }

  public refreshMessages(): void {
    this.api.getMessages().subscribe(messages => {
      if (!isEqual(messages, this.messages.value)) {
        this.messages.next(messages);
      }
    });
  }

}
