import { EventEmitter, Injectable } from '@angular/core';
import { message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: message[] = []
  messageChangedEvent = new EventEmitter<message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }
  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): message{
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
  }

  addMessage(message: message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
