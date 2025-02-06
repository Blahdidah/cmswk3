import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
})

export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor(private contactService: ContactsService) { }

  ngOnInit(){
    this.contactService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => {
          this.selectedContact = contact;
      }
    )
  }
  
}
