import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  @Input() messages: message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent
      .subscribe(
        (messages: message[]) => {
          this.messages = messages;
        }
      );
  }
  
  onAddMessage(newMessage: message) {
    this.messages.push(newMessage);
  }
}
