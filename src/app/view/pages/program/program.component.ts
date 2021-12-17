import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ro from 'src/assets/text/ro.json';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  text = ro.PROGRAM;

  id: string;
  currentStep: number = 1;
  nextStepEvent = new EventEmitter();

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
  }

  isStepComplete(): boolean {
    // todo program steps: next step
    return true;
  }

  nextStep(): void {
    this.nextStepEvent.emit();
  }

  updateStep(stepIndex: number) {
    this.currentStep = stepIndex + 1;
  }

  downloadDoc1() {
    // todo: download document in step 1
  }

  downloadDoc2() {
    // todo: download document in step 2
  }

  downloadDoc3_1() {
    // todo: download NIST fw core doc in step 3
  }

  downloadDoc3_2() {
    // todo: download NIST implementation levels in step 3
  }

  downloadDoc3_3() {
    // todo: download profile template doc in step 3
  }

  downloadDoc4() {
    // todo download risk assessment doc in step 4
  }

  downloadDoc6_1() {
    // todo download document in step 6
  }

  downloadDoc6_2() {
    // todo download impact rate and priority code table in step 6
  }

  downloadDoc6_3() {
    // todo download result doc from step 5 in step 6
  }
}
