
import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  OnInit
} from '@angular/core';

import { message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false}) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;
  @Output() messageAdded = new EventEmitter<message>();
  // currentSender: string = contact.name;

  constructor(private messageService: MessageService) { }
  
  ngOnInit() {
    
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;

    // Ensure subject and msgText are not empty
    if (!subject || !msgText) {
      console.error('Both subject and message must be filled out.');
      return;  // Prevent sending the message if required fields are empty
    }

    const id = this.generateId();  // A method to generate a unique ID
    const sender: string = '101';  // Use the sender's actual ID here

    // Create a new message object
    const newMessage = new message(id, subject, msgText, sender);

    // Send the message using the message service
    this.messageService.addMessage(newMessage).subscribe(
      response => {
        console.log('Message sent successfully!', response);
        // Optionally emit the new message to other components
        this.messageAdded.emit(newMessage);
        // Clear the form after sending the message
        this.onClear();  // No need to pass parameters anymore
      },
      error => {
        console.error('Error sending message', error);
      }
    );
  }

  // Generate a unique ID for the message
  private generateId(): string {
    // You can use a simple approach like this or use libraries like UUID
    return Math.random().toString(36).substr(2, 9);  // Generates a random ID
  }
}