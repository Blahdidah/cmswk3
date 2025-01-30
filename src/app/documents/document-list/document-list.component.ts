import { Component, EventEmitter, Output } from '@angular/core';
import { document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<document>();

  documents: document[] = [
    new document(1, '101 Ways to cook Ramen', 'A document that provides 101 ideas on how to cook ramen. Savor or sweet, ramen is a treat!', 'https://maruchan.com', null),
    new document(2, 'The Care and Keeping of Cats', 'A document that explains how to care and keep cats', 'https://ittybittykitties.com', null),
  ]
  
  onSelected(document: document) {
    this.selectedDocumentEvent.emit(document);
  }
}
