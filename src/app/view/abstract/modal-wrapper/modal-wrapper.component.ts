import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent {

  @Input() title: string;
  @Output() closeModalEvent = new EventEmitter();

  constructor() {
  }

  close() {
    this.closeModalEvent.emit();
  }
}
