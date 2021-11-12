import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageDTO } from '../dto/message-dto';
import { MessagesApiService } from './messages-api.service';
import { isEqual } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages = new BehaviorSubject<MessageDTO[]>([]);
  messages$ = this.messages.asObservable();

  constructor(private api: MessagesApiService) { }

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
