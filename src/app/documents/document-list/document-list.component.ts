import { Component, OnInit } from '@angular/core';
import { document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  

  documents: document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }
  

}