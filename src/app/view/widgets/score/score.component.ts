import {Component, Input} from '@angular/core';
import {faCircle} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'widget-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  readonly faCircle = faCircle;
  readonly sizeDiff = 18;

  @Input() number: number = 0;
  @Input() color: string = 'inherit';
  @Input() fontSize: number = 20;

  constructor() {
  }

}
