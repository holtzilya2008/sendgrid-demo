import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateMessageDTO } from '../dto/create-message-dto';
import { MessageDTO } from '../dto/message-dto';
import { MessagesMock } from '../mocks/messages-mock';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {

  constructor() { }

  createMessage(message: CreateMessageDTO): Observable<void> {
    return of();
  }

  getMessages(): Observable<MessageDTO[]> {
    return of(MessagesMock);
  }

}
