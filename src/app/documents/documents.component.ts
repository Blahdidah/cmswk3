import { Component, OnInit } from '@angular/core';
import { document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents-component',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: document;

  constructor(private documentService: DocumentService) {
    
  }

  ngOnInit() {
    this.documentService.documentSelectedEvent
      .subscribe(
        (document: document) => {
          this.selectedDocument = document;
        }
      )
  }
}
