import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import {LoggerService} from '@stomp/logger';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  public receivedMessages: string[] = [];
  private topicSubscription: Subscription;

  constructor(private rxStompService: RxStompService, private logger: LoggerService) {}

  ngOnInit() {
    this.topicSubscription = this.rxStompService
      .watch('/topic/demo')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
      });

    this.logger.info('Successfully initialized');
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    const message = `Message generated at ${new Date()}`;
    this.rxStompService.publish({ destination: '/topic/demo', body: message });
    this.logger.debug(`Published: ${message}`);
  }
}
