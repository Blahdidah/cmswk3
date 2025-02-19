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
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent
      .subscribe(
        (documents: document[]) => {
      this.documents = documents;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  }