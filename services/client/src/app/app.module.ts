import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { UserPipe } from './pipes/user.pipe';
import { AvatarPipe } from './pipes/avatar.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.backendUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MessageComponent,
    LoginComponent,
    UserPipe,
    AvatarPipe,
    UserNamePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
