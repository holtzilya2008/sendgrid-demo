import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { EmailService } from './services/email.service';
import { InboundEmailController } from './controllers/inbound-email.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { AppGateway } from './app.gateway';

const eventEmitterOpts = {
  // set this to `true` to use wildcards
  wildcard: false,
  // the delimiter used to segment namespaces
  delimiter: '.',
  // set this to `true` if you want to emit the newListener event
  newListener: false,
  // set this to `true` if you want to emit the removeListener event
  removeListener: false,
  // the maximum amount of listeners that can be assigned to an event
  maxListeners: 10,
  // show event name in memory leak message when more than maximum amount of listeners is assigned
  verboseMemoryLeak: false,
  // disable throwing uncaughtException if an error event is emitted and it has no listeners
  ignoreErrors: false,
}

@Module({
  imports: [HttpModule, EventEmitterModule.forRoot(eventEmitterOpts)],
  controllers: [MessagesController, InboundEmailController, UsersController],
  providers: [MessagesService, EmailService, UserService, AppGateway],
})
export class AppModule {}
