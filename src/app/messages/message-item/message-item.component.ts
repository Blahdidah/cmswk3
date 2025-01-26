import { Component, Input, Output, EventEmitter } from '@angular/core';
import { message } from '../message.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message: message;
  @Output() messageSelected = new EventEmitter<void>();

  onSelected() {
    this.messageSelected.emit();
  }

}
