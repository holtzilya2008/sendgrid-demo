import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, tap } from 'rxjs';

import { DB_ACCESSOR_URL } from 'src/constants';
import { MessageDTO } from 'src/dto/message-dto';

@Injectable()
export class MessagesService {

  private readonly path = 'messages';

  constructor(private http: HttpService) {

  }

  getMessages(): Promise<MessageDTO[]> {
    const observable = this.http.get(`${DB_ACCESSOR_URL}/${this.path}`).pipe(
      tap(response => console.log(response)),
      map((response: AxiosResponse<MessageDTO[]>) => response.data)
    );
    return firstValueFrom(observable);
  }
}
