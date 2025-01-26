import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  //@Input() messages: message[] = [];
  //@Output() messageAdded = new EventEmitter<string>();
  messages: message[] = [
    new message(1, 'test', 'this is a test msg', "blah"),
    new message(2, 'testaroot', 'i hate and love testing', "Francis"),
    new message(3, 'call me', 'i think you have my number', 'jenny')
  ];

  constructor() { }

  ngOnInit() {

  }
  
  onAddMessage(newMessage: message) {
    this.messages.push(newMessage);
  }

}
