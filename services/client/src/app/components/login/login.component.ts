import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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

}
function subscribe(arg0: () => void) {
  throw new Error('Function not implemented.');
}

