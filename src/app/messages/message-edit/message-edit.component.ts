
import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';

import { message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject', {static: false}) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;
  @Output() messageAdded = new EventEmitter<message>();
  currentSender: string = 'Blah';

  onClear(subjectInput: HTMLInputElement, msgTextInput: HTMLTextAreaElement) {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
    console.log('Form cleared!');
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value; 
    const id = 'string';
    //the line above needs fixing.
    const sender: string = this.currentSender;
    const newMessage = new message(id, subject, msgText, sender);

    console.log("message being emitted", newMessage);
    this.messageAdded.emit(newMessage);
  }
}
