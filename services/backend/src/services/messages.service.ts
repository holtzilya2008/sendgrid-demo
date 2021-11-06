import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import { DB_ACCESSOR_URL } from 'src/constants';
import { MessageDTO } from 'src/dto/message-dto';

@Injectable()
export class MessagesService {

  private readonly path = 'messages';

  constructor(private http: HttpService) {

  }

  getMessages(): Observable<MessageDTO[]> {
    return this.http.get(`${DB_ACCESSOR_URL}/${this.path}`).pipe(
      map((response: AxiosResponse<MessageDTO[]>) => response.data)
    );
  }
}
