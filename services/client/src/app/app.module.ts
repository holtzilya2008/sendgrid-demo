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
import { UsersService } from './services/users.service';
import { UsersMockService } from './mocks/user-mock.service';
import { MessagesService } from './services/messages.service';
import { MessagesMockService } from './mocks/messages-mock.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: UsersService, useClass: UsersMockService },
    { provide: MessagesService, useClass: MessagesMockService }
    // UsersService,
    // MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
