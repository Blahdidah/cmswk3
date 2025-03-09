import { EventEmitter, Injectable } from '@angular/core';
import { message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: message[] = []
  private maxMessageId: number;
  messageChangedEvent = new EventEmitter<message[]>();

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let msg of this.messages) {
      let currentId = parseInt(msg.id, 10);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): Observable<message[]> {
    return this.http.get<message[]>('https://blahs-doc-contacts-default-rtdb.firebaseio.com/messages.json')
      .pipe(
        map((messages: message[]) => {
          this.maxMessageId = this.getMaxId();
          messages.sort((a, b) => a.subject.localeCompare(b.subject));
          this.messages = messages;
          this.messageChangedEvent.next(messages);
          return messages;
        })
      );
  }

  emitMessagesChanged(messages: message[]) {
    this.messageChangedEvent.next(messages);
  }

  getMessage(id: string): message | undefined {
    if (!this.messages || this.messages.length === 0) {
      this.getMessages().subscribe((messages: message[]) => {
        return messages.find(cont => cont.id === id);
      })
    }
    return this.messages.find(cont => cont.id === id);
  }

  addMessage(newMessage: message) {
    this.messages.push(newMessage);
    this.storeMessages();
  }

  storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const messagesJson = JSON.stringify(this.messages);

    this.http.put('https://blahs-doc-contacts-default-rtdb.firebaseio.com/messages.json', messagesJson, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

}
