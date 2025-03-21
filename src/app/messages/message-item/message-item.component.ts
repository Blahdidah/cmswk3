import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { message } from '../message.model';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { Contact } from 'src/app/contacts/contact.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: message;
  messageSender: string = 'Unknown'; // Default sender name

  constructor(private contactService: ContactsService) { }
  
  // @Output() messageSelected = new EventEmitter<void>();
  ngOnInit() {
    // Check if this.message and this.message.sender are defined and if sender is not null
    if (!this.message || !this.message.sender) {
      console.error('Message or sender is undefined:', this.message);
      return;
    }

    // Ensure sender is an object with a valid 'id' property
    if (this.message.sender && typeof this.message.sender === 'object') {
      // Explicitly assert that sender has 'id' property
      const senderId = (this.message.sender as { id: string }).id;

      // Assign senderId to message.sender
      this.message.sender = senderId;
    }

    // Proceed if sender is a valid string ID
    if (typeof this.message.sender === 'string') {
      this.contactService.getContact(this.message.sender).subscribe(
        contact => {
          this.messageSender = contact.name;
        },
        error => {
          console.error('Error fetching contact:', error);
          this.messageSender = 'Unknown'; // Handle errors gracefully
        }
      );
    }
  }
}
