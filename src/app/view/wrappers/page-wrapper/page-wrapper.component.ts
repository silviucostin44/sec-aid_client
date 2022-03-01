import {Component, EventEmitter, Input, Output} from '@angular/core';
import ro from 'src/assets/text/ro.json';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent {
  text = ro.PAGE;

  @Input() needSecondaryAction: boolean = false;
  @Output() primaryAction = new EventEmitter();
  @Output() secondaryAction = new EventEmitter();

  constructor() {
  }

  triggerPrimaryAction(): void {
    this.primaryAction.emit();
  }

  triggerSecondaryAction(): void {
    this.secondaryAction.emit();
  }
}
