import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BUTTONS_DISTANCE_STEP, PROGRESS_BUTTONS} from '../../../constants/progress-buttons';
import * as cloneDeep from 'lodash/cloneDeep';

export interface ProgressButton {
  position: string;
  isComputed: boolean;
}

@Component({
  selector: 'widget-progress-buttons',
  templateUrl: './progress-buttons.component.html',
  styleUrls: ['./progress-buttons.component.scss']
})
export class ProgressButtons implements OnInit {

  @Input() next: EventEmitter<any>;
  @Output('currentStep') currentStepEmitter = new EventEmitter();
  currentStep: number = 0;
  lastComputedStep: number = 0;
  buttons: ProgressButton[] = cloneDeep(PROGRESS_BUTTONS);

  constructor() {
  }

  ngOnInit(): void {
    this.next.subscribe(() => {
      if (this.currentStep < this.buttons.length - 1) {
        this.nextStep();
      }
    });
  }

  updateStep(number: number): void {
    this.currentStep = number;
    this.currentStepEmitter.emit(this.currentStep);
  }

  buttonStyle(isComputed: boolean, index: number): string {
    if (this.currentStep == index) {
      return 'btn-danger';
    }
    if (isComputed) {
      return 'btn-primary';
    }
    return 'btn-secondary';
  }

  progressPercentage(): string {
    return this.lastComputedStep * BUTTONS_DISTANCE_STEP + '%';
  }

  isUntouchedStep(stepIndex: number): boolean {
    return stepIndex > this.lastComputedStep;
  }

  private nextStep(): void {
    if (this.currentStep === this.lastComputedStep) {
      this.buttons[this.currentStep].isComputed = true;
      this.lastComputedStep++;
    }
    this.updateStep(this.currentStep + 1);
  }
}
