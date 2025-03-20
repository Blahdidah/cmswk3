import { EventEmitter, Injectable } from '@angular/core';
import { message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: message[] = [];
  private maxMessageId: number;
  messageChangedEvent = new EventEmitter<message[]>();

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }

  // Get maximum message ID
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

  // Fetch messages from the Node.js server
  getMessages(): Observable<message[]> {
    return this.http.get<message[]>('http://localhost:3000/api/messages')
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

  // Emit changes to the message list
  emitMessagesChanged(messages: message[]) {
    this.messageChangedEvent.next(messages);
  }

  // Fetch a single message by ID
  getMessage(id: string): Observable<message> {
    return this.http.get<message>(`http://localhost:3000/api/messages/${id}`);
  }

  // Add a new message
  addMessage(newMessage: message) {
    newMessage.id = (this.maxMessageId + 1).toString(); // Ensure ID is set
    this.http.post<{ message: string, data: message }>('http://localhost:3000/api/messages', newMessage)
      .subscribe((responseData) => {
        this.messages.push(responseData.data);
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  // Store messages (not necessary for local array anymore, handled via HTTP)
  storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/api/messages', this.messages, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  // Delete a message
  deleteMessage(message: message) {
    this.http.delete(`http://localhost:3000/api/messages/${message.id}`)
      .subscribe(() => {
        this.messages = this.messages.filter(m => m.id !== message.id);
        this.messageChangedEvent.next(this.messages);
      });
  }
}
