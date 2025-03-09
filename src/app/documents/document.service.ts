import { Injectable } from '@angular/core';
import { document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: document[] = []
  documentSelectedEvent = new Subject<document>();
  documentChangedEvent = new Subject<document[]>();
  private maxDocumentId: number;
  
  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Observable<document[]> {
    return this.http.get<document[]>('https://blahs-doc-contacts-default-rtdb.firebaseio.com/documents.json')
      .pipe(
        map((documents: document[]) => {
          this.documents = documents;  // Add this line to actually store the documents
          this.maxDocumentId = this.getMaxId();
          documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentChangedEvent.next(documents);
          return documents; // Return the processed documents
        })
      );
  }

  emitDocumentsChanged(documents: document[]) {
    this.documentChangedEvent.next(documents);
  }


  getDocument(id: string): document | undefined {
    if (!this.documents || this.documents.length === 0) {
      this.getDocuments().subscribe((documents: document[]) => {
        return documents.find(doc => doc.id === id);
      });
    }
    return this.documents.find(doc => doc.id === id);
  }

  sortDocuments() {
    this.documents.sort((a, b) => {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const documentsJson = JSON.stringify(this.documents);

    this.http.put('https://blahs-doc-contacts-default-rtdb.firebaseio.com/documents.json', documentsJson, { headers })
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
    newDocument.id = (this.maxDocumentId + 1).toString(); // Assign a new ID
    this.documents.push(newDocument);
    this.maxDocumentId = this.getMaxId(); // Update the maxDocumentId
    this.storeDocuments();
  }

  updateDocument(originalDocument: document, newDocument: document) {
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;

    // Ensure that we are not removing or overwriting the ID field
    newDocument.id = originalDocument.id; // Preserve the original ID

    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

}
