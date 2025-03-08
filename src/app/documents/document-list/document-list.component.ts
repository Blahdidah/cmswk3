import { Component, OnDestroy, OnInit } from '@angular/core';
import { document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{
  documents: document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.getDocuments().subscribe(
      (documents: document[]) => {
        this.documents = documents; 
        this.documentService.documentChangedEvent.next(this.documents.slice()); 
      },
      (error: any) => {
        console.error('Error fetching documents:', error); // Handle the error
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  }