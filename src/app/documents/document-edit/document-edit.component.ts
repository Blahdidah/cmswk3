import { Component, OnInit } from '@angular/core';
import { document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{
  originalDocument: document;
  document: document;
  editMode: boolean = false;

  ngOnInit(): void {
   
  }

  onSubmit(f) {
    
  }
}
