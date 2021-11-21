import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.scss']
})
export class SelfAssessmentComponent implements OnInit {

  id: string;

  questionnaireId: string;

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.questionnaireId = this.router.snapshot.paramMap.get('q_id');
  }

}
