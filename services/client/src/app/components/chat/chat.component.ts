import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageDTO } from 'src/app/dto/message-dto';
import { UserDTO } from 'src/app/dto/user-dto';
import { MessagesService } from 'src/app/services/messages.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  currentUser$: Observable<UserDTO>;
  messages$: Observable<MessageDTO[]>;

  constructor(private messagesService: MessagesService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.currentUser$= this.usersService.currentUser$;
    this.messages$ = this.messagesService.messages$;
  }



}
