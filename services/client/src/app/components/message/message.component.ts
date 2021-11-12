import { Component, Input, OnInit } from '@angular/core';
import { MessageDTO } from 'src/app/dto/message-dto';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input()
  message: MessageDTO;

  constructor() { }

  ngOnInit(): void {
  }

}
