import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageDTO } from '../dto/message-dto';
import { MessagesApiService } from './messages-api.service';
import { isEqual } from 'lodash';
import { CreateMessageDTO } from '../dto/create-message-dto';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages = new BehaviorSubject<MessageDTO[]>([]);
  messages$ = this.messages.asObservable();

  constructor(private api: MessagesApiService) { }

  async createMessage(userId: string, content: string): Promise<void> {
    const message: CreateMessageDTO = {
      content,
      userId
    }
    return await this.api.createMessage(message).toPromise();
  }

  public refreshMessagesWithInterval(until: Observable<any>) {
    interval(100).pipe(
      takeUntil(until)
    ).subscribe(() => {
      this.refreshMessages();
    });
    until.subscribe(() => {
      this.messages.next([]);
    });
  }

  private refreshMessages(): void {
    this.api.getMessages().subscribe(messages => {
      if (!isEqual(messages, this.messages.value)) {
        this.messages.next(messages);
      }
    });
  }

}
