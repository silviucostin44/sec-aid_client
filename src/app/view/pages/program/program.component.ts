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
}
