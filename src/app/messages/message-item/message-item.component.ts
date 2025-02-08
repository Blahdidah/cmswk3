import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { message } from '../message.model';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{
  @Input() message: message;
  messageSender: string;
  constructor(private contactService:ContactsService) { }
  
  // @Output() messageSelected = new EventEmitter<void>();
  ngOnInit() {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }
  
  // onSelected() {
  //   this.messageSelected.emit();
  // }

}
