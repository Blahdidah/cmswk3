import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy{
  contacts: Contact[] = [];
  private subscription; Subscription

  constructor(private contactService: ContactsService) { }
  
  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactService.contactChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error('Error Fetching Contacts:', error);
      }
    );
  }
   

  onContactSelected(contact: Contact) {
    
    this.contactService.contactSelectedEvent.next(contact);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
