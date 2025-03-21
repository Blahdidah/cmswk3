import { Component, OnInit } from '@angular/core';

import { document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
  document: document;
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService, 
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router) {
    
    }

  ngOnInit() {
    this.nativeWindow = this.windowRefService.getNativeWindow();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.documentService.getDocument(this.id).subscribe((document: document) => {
            this.document = document;
          });
        }
      );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
