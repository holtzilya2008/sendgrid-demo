import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SocketChannel } from '../types/socket-channels-enum';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  listen<T>(channel: SocketChannel): Observable<T> {
    return this.socket.fromEvent<string>(channel).pipe(
      tap(console.log),
      map(data => JSON.parse(data) as T)
    );
  }

}
