import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateMessageDTO } from '../dto/create-message-dto';
import { MessageDTO } from '../dto/message-dto';
import { MessagesMock } from '../mocks/messages-mock';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {

  private path = 'messages';

  constructor(private http: HttpClient) { }

  createMessage(message: CreateMessageDTO): Observable<any> {
    const url = `${environment.backendUrl}/${this.path}`;
    return this.http.post(url, message);
  }

  getMessages(): Observable<MessageDTO[]> {
    const url = `${environment.backendUrl}/${this.path}`;
    return this.http.get<MessageDTO[]>(url);
  }

}
