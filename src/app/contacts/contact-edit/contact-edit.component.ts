import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  id: string;
  originalContact: Contact;
  contact: Contact = { id: '', name: '', email: '', phone: '', imageUrl: '', group: [] };
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  
  constructor(private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.group
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts'])
  }

  onCancel() {
    this.router.navigate(['/contacts'])
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return
    }
    this.groupContacts.push(selectedContact);
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
