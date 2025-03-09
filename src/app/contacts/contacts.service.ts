import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  private maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  
  getContacts(): Observable<Contact[]> {
     return this.http.get<Contact[]>('https://blahs-doc-contacts-default-rtdb.firebaseio.com/contacts.json')
          .pipe(
            map((contacts: Contact[]) => {
              this.contacts = contacts;  
              this.maxContactId = this.getMaxId();
              contacts.sort((a, b) => a.name.localeCompare(b.name));
              this.contactChangedEvent.next(contacts);
              return contacts; 
            })
          );
  }
  
  emitContactsChanged(contacts: Contact[]) {
    this.contactChangedEvent.next(contacts);
  }

  getContact(id: string): Contact | undefined {
    if (!this.contacts || this.contacts.length === 0) {
      this.getContacts().subscribe((contacts: Contact[]) => {
        return contacts.find(cont => cont.id === id);
      })
    }
    return this.contacts.find(cont => cont.id === id);
  }

  sortContacts() {
    this.contacts.sort((a, b) => {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
  }

  storeContacts() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const contactsJson = JSON.stringify(this.contacts);

    this.http.put('https://blahs-doc-contacts-default-rtdb.firebaseio.com/contacts.json', contactsJson, { headers })
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  deleteContact(contact: Contact) { 
    this.contacts = this.contacts.filter(d => d.id !== contact.id);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id, 10);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) { 
    newContact.id = (this.maxContactId + 1).toString();
    this.contacts.push(newContact);
    this.maxContactId = this.getMaxId();
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if (pos < 0) return;

    // Ensure that we are not removing or overwriting the ID field
    newContact.id = originalContact.id; // Preserve the original ID

    this.contacts[pos] = newContact;
    this.storeContacts();
  }

}
