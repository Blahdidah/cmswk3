import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  standalone: false,

  templateUrl: './contacts.component.html',

})
export class ContactsComponent {
  selectedContact: Contact;
  
}
