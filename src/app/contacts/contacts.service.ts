import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  private maxContactId: number;

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  // Fetch contacts from the Node.js server
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts')
      .pipe(
        map((contacts: Contact[]) => {
          // Ensure each contact has a valid 'id' (not '_id')
          this.contacts = contacts.map(contact => ({
            ...contact,
            id: contact.id || ''  // Ensure 'id' exists
          }));
          this.contactChangedEvent.next(this.contacts);
          return this.contacts;
        })
      );
  }

  // Emit changes to the contact list
  emitContactsChanged(contacts: Contact[]) {
    this.contactChangedEvent.next(contacts);
  }

  // Get a single contact by ID from the array (use the API to get it)
  getContact(id: string): Observable<Contact> {
    if (!id || typeof id !== 'string') {
      console.error("Invalid contact ID:", id);
      return throwError(() => new Error("Invalid contact ID"));
    }
    return this.http.get<Contact>(`http://localhost:3000/api/contacts/${id}`);
  }

  // Sort the contacts locally
  sortContacts() {
    this.contacts.sort((a, b) => {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
  }

  // Store contacts (this is no longer needed for your local array, just handle through HTTP)
  storeContacts() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/api/contacts', this.contacts, { headers })
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  // Delete a contact
  deleteContact(contact: Contact) {
    this.http.delete(`http://localhost:3000/api/contacts/${contact.id}`)
      .subscribe(() => {
        this.contacts = this.contacts.filter(c => c.id !== contact.id);
        this.contactChangedEvent.next(this.contacts);
      });
  }

  // Get the maximum contact ID
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

  // Add a contact (use the API to add a new contact)
  addContact(newContact: Contact) {
    this.http.post<{ message: string, contact: Contact }>(
      'http://localhost:3000/api/contacts',
      newContact
    )
      .subscribe((responseData) => {
        if (!responseData.contact.id) {
          console.error("Error: New contact is missing 'id'");
        }
        this.contacts.push(responseData.contact);
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  // Update a contact (use the API to update a contact)
  updateContact(originalContact: Contact, newContact: Contact) {
    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if (pos < 0) return;

    // Ensure that we are not removing or overwriting the ID field
    newContact.id = originalContact.id; // Preserve the original ID

    this.http.put(`http://localhost:3000/api/contacts/${originalContact.id}`, newContact)
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }
}
