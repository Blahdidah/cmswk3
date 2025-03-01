import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

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
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }
   

  onContactSelected(contact: Contact) {
    
    this.contactService.contactSelectedEvent.next(contact);
  }

  isDragEnabled(contact: any): boolean{
    return true;
  }

  onDragStart(contact: any) {
    console.log('Drag Started for contact: ', contact);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
