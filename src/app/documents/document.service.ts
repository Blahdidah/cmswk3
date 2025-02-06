import { EventEmitter, Injectable } from '@angular/core';
import { document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: document[] = []
  documentSelectedEvent = new EventEmitter<document>();

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
}
