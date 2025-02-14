import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
  
  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | undefined {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return undefined;
  }

  deleteContact(contact: Contact) { 
    this.contacts = this.contacts.filter(c => c.id !== contact.id);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
