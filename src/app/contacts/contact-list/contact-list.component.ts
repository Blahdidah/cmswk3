import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
  @Output() contactWasSelected = new EventEmitter<Contact>();

  constructor(private contactService: ContactsService) { }
  
  contacts: Contact[] = []

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }
  
  

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }


}
