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
import { initLoggerService, LoggerService } from './services/logger-service';

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
