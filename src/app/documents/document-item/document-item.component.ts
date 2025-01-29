import { Component, Input } from '@angular/core';

import { document } from '../document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItem {
  @Input() document: document;

}
