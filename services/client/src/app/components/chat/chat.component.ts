import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
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
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('messagesContainer') messagesContainer: ElementRef;

  currentUser$: Observable<UserDTO>;
  messages$: Observable<MessageDTO[]>;
  private cleanUp$ = new Subject();
  input: string;

  constructor(private messagesService: MessagesService,
              private usersService: UsersService,
              private router: Router) { }

  ngAfterViewInit(): void {
    this.messages$.pipe(
      takeUntil(this.cleanUp$),
      debounceTime(100)
    ).subscribe(() => {
      this.scrollToBottom();
    })
  }

  ngOnInit(): void {
    if (!this.usersService.getCurrentUser()) {
      this.router.navigate(['login']);
    }
    this.currentUser$= this.usersService.currentUser$;
    this.messages$ = this.messagesService.messages$;
    this.messagesService.refreshMessagesWithInterval(this.cleanUp$.asObservable())
  }

  private scrollToBottom() {
    const element: HTMLElement = (this.messagesContainer.nativeElement as HTMLElement);
    const maxScroll = element.scrollHeight;
    element.scrollTo(0, maxScroll);
  }

  sendMessage(): void {
    const userId = this.usersService.getCurrentUser()._id;
    this.messagesService.createMessage(userId, this.input);
    this.input = '';
  }

  ngOnDestroy() {
    this.cleanUp$.next();
    this.cleanUp$.complete();
  }

}
