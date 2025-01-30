import { Component, EventEmitter, Input, Output } from '@angular/core';

import { document } from '../document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItem {
  @Input() document: document;
  @Output() documentSelected = new EventEmitter<void>();

  onSelected() {
    this.documentSelected.emit();
  }

}
