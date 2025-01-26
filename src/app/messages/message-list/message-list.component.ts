import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  @Input() messages: message[] = [
    new message(1, 'Subject 1', 'This is the body of message 1', 'Sender1'),
    new message(2, 'Subject 2', 'This is the body of message 2', 'Sender2'),
    new message(3, 'Subject 3', 'This is the body of message 3', 'Sender3'),
  ];

  constructor() { }

  ngOnInit() {

  }
  
  onAddMessage(newMessage: message) {
    this.messages.push(newMessage);
  }
}
