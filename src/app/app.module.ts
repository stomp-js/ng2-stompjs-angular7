import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  InjectableRxStompConfig,
  RxStompService,
  rxStompServiceFactory,
} from '@stomp/ng2-stompjs';

import { AppComponent } from './app.component';
import { myRxStompConfig } from './my-rx-stomp.config';
import { MessagesComponent } from './messages/messages.component';
import { StatusComponent } from './status/status.component';
import {LoggerConfig, LoggerService, LogLevel, StompAppender} from '@stomp/logger';


const userId = '9be7ecd3-b706-43ee-9114-628241a808bd';
const sessionId = '972e139d-2426-4955-b2f9-74532e790722';

function initLoggerService(rxStomp: RxStompService): LoggerService {
  const stompAppenderConfig = {
    dest: '/exchange/user-log',
    level: LogLevel.DEBUG,
    formatter: message => ({
      headers: {
        user: userId,
        session: sessionId,
        ts: `${Date.now()}`
      },
      message
    })
  };

  const stompAppender = new StompAppender(stompAppenderConfig, rxStomp);

  const config: LoggerConfig = {
    appenders: [stompAppender],
  };

  return new LoggerService(config);
}

@NgModule({
  declarations: [AppComponent, MessagesComponent, StatusComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
    {
      provide: LoggerService,
      useFactory: initLoggerService,
      deps: [RxStompService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
