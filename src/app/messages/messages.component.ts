import { Component, OnInit } from '@angular/core';
import { RxStompService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private rxStompService: RxStompService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/topic/demo', body: message});
  }
}
