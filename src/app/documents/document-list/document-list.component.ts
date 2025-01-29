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
    new document(1, 'test name', 'description', 'url', null),
    new document(2, 'The Care and Keeping of Cats', 'a document that explains how to care and keep cats', 'https://google.com', null),
    ]
  onSelected(document: document) {
    this.selectedDocumentEvent.emit(document);
  }
}
