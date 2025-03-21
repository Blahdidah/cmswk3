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
  private documents: document[] = [];
  documentSelectedEvent = new Subject<document>();
  documentChangedEvent = new Subject<document[]>();
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  // Fetch documents from the Node.js server
  getDocuments(): Observable<document[]> {
    return this.http.get<document[]>('http://localhost:3000/api/documents')
      .pipe(
        map((documents: document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentChangedEvent.next(documents);
          return documents;
        })
      );
  }

  // Emit changes to the document list
  emitDocumentsChanged(documents: document[]) {
    this.documentChangedEvent.next(documents);
  }

  // Fetch a single document by ID from the Node.js server
  getDocument(id: string): Observable<document> {
    return this.http.get<document>(`http://localhost:3000/api/documents/${id}`);
  }

  // Add a new document to the server
  addDocument(newDocument: document) {
    newDocument.id = (this.maxDocumentId + 1).toString(); // Ensure ID is set
    this.http.post<{document: document }>('http://localhost:3000/api/documents', newDocument)
      .subscribe((responseData) => {
        this.documents.push(responseData.document);
        this.documentChangedEvent.next(this.documents.slice());
      });
  }

  // Store documents (optional, if needed)
  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/api/documents', this.documents, { headers })
      .subscribe(() => {
        this.documentChangedEvent.next(this.documents.slice());
      });
  }

  // Delete a document from the server
  deleteDocument(document: document) {
    this.http.delete(`http://localhost:3000/api/documents/${document.id}`)
      .subscribe(() => {
        this.documents = this.documents.filter(d => d.id !== document.id);
        this.documentChangedEvent.next(this.documents);
      });
  }

  // Get the maximum document ID from the local array
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

  // Update an existing document
  updateDocument(originalDocument: document, newDocument: document) {
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;

    newDocument.id = originalDocument.id; // Preserve the original ID
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }
}
