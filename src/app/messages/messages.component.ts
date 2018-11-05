import { Component, OnInit } from '@angular/core';
import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public receivedMessages: string[] = [];

  constructor(private rxStompService: RxStompService) { }

  ngOnInit() {
    this.rxStompService.watch('/topic/demo').subscribe((message: Message) => {
      this.receivedMessages.push(message.body);
    });
  }

  onSendMessage() {
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/topic/demo', body: message});
  }
}
