import { Injectable } from '@angular/core';
import { document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: document[] = []
  documentSelectedEvent = new Subject<document>();
  documentChangedEvent = new Subject<document[]>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): document{
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
  }

  deleteDocument(document: document) {
    if (!document) {
      return; // No document? Do nothing.
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return; // Can't find the document? Do nothing.
    }

    this.documents.splice(pos, 1); // Remove the document
    this.documentChangedEvent.next(this.documents.slice()); // Notify the app
  }
}
