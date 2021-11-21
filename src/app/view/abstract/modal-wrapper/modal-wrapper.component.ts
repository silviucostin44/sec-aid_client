import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit {

  @Input() title: string;
  @Input() modalId: string;
  @Output() closeModal = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
