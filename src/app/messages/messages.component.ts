import { Component, OnInit} from '@angular/core';
import { message } from './message.model';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  messages: message[] = [
    // new message(1, 'test', 'this is a test msg', "blah"),
    // new message(2, 'testaroot', 'i hate and love testing', "Francis"),
    // new message(3, 'call me', 'i think you have my number', 'jenny')
    ];
  
    constructor() {
    
    }
    ngOnInit() {
      
    }
  
  onAddMessage(newMessage: message) {
    this.messages.push(newMessage);
  }
}
