import { Component, ComponentFactoryResolver, Injector, NgModuleRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence,
  AnimationEvent
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
        height: '500px',
        opacity: 1,
        backgroundColor: 'Red'
      })),
      state('closed', style({
        width: '45px',
        height: '60px',
        opacity: 0.8
      })),
      transition('open => closed', [
          animate('2s')
      ]),
      transition('closed => open', [
        sequence([
          animate('1s', style({
            width: '600px',
            opacity: 0.9,
            backgroundColor: 'grey'
          })),
          animate('1s', style({
            height: '500px',
            opacity: 1,
            backgroundColor: 'red'
          }))
        ]),
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  @ViewChild("myContainer", { read: ViewContainerRef }) container: ViewContainerRef;

  collapsed = false;
  modalVisible = false;

  email: string;
  availableEmails: string[];
  isInitialized = false;

  constructor(private cfr: ComponentFactoryResolver,
              private injector: Injector,
              private userService: UsersService,
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

  async showModal($event: AnimationEvent) {
    if ($event.toState === 'open') {
      await this.getLazy();
    }
  }

  async getLazy() {
    this.container.clear();
    const { DynamicModalComponent } = await import('../dynamic-modal/dynamic-modal.component');
    const componentRef = this.container.createComponent(
      this.cfr.resolveComponentFactory(DynamicModalComponent), null, this.injector
    );
  }

}
