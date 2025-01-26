import { Component, OnInit} from '@angular/core';
import { message } from './message.model';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  messages: message[] = [ ];
  
    constructor() {
    
    }
    ngOnInit() {
      
    }
  
  onAddMessage(newMessage: message) {
    this.messages.push(newMessage);
  }
}
