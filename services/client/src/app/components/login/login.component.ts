import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '600px',
        opacity: 1,
        backgroundColor: 'Red'
      })),
      state('closed', style({
        width: '45px',
        opacity: 0.8,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class LoginComponent implements OnInit {

  collapsed = false;

  email: string;
  availableEmails: string[];
  isInitialized = false;

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    // this.userService.isInitialized$.pipe(
    //   filter(value => !!value),
    //   take(1)
    // ).subscribe((isInitialized) => {
    //   this.isInitialized = isInitialized;
    //   this.availableEmails = this.userService.getUsers().map(u => u.email);
    // });
  }

  login() {
    // const loginSuccess = this.userService.tryLogin(this.email);
    // this.email = '';
    // if (loginSuccess) {
    //   this.router.navigate(['chat']);
    // }
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

}
