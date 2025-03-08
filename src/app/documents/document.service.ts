import { Injectable } from '@angular/core';
import { document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: document[] = []
  documentSelectedEvent = new Subject<document>();
  documentChangedEvent = new Subject<document[]>();
  private maxDocumentId: number;
  
  constructor(private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.http.get<document[]>('https://blahs-doc-contacts-default-rtdb.firebaseio.com/documents.json')
  }

  getDocument(id: string): document{
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
  }

  sortDocuments() {
    this.documents.sort((a, b) => {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const documentsJson = JSON.stringify(this.documents);

    this.http.put('https://your-firebase-url/documents.json', documentsJson, { headers })
      .subscribe(() => {
        this.documentChangedEvent.next(this.documents.slice());
      });
  }

  deleteDocument(document: document) {
    this.documents = this.documents.filter(d => d.id !== document.id);
    this.storeDocuments(); 
  }

  getMaxId(): number {
    let maxId = 0;
    for (let doc of this.documents) {
      let currentId = parseInt(doc.id, 10);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: document) {
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: document, newDocument: document) {
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;

    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

}
