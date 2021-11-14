import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  availableEmails: string[];

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.availableEmails = this.userService.getUsers().map(u => u.email);
  }

  login() {
    const loginSuccess = this.userService.tryLogin(this.email);
    this.email = '';
    if (loginSuccess) {
      this.router.navigate(['chat']);
    }
  }

}
