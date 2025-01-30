import { Component } from '@angular/core';
import { document } from './document.model';

@Component({
  selector: 'app-documents-component',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  selectedDocument: document;

}
