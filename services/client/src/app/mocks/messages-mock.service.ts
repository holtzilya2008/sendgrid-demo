import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { MessageDTO } from '../dto/message-dto';
import { MessagesMock } from './messages-mock';

export class MessagesMockService {

  private messages = new BehaviorSubject<MessageDTO[]>([]);
  messages$ = this.messages.asObservable();

  constructor() { }

  async createMessage(userId: string, content: string): Promise<void> {
    return Promise.resolve();
  }

  public listenToNewMessages(until: Observable<any>) {

  }

  public refreshMessages(): void {
    this.messages.next([...MessagesMock]);
  }

}
