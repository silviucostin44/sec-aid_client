import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ro from 'src/assets/text/ro.json';
import {QUEST_CONTENT} from '../../../constants/questionnaire-content';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Questionnaire, QuestSection} from '../../../models/questionnaire.model';
import {QuestContent} from '../../../models/questionnaire-content.interface';
import {Question} from '../../../models/question.model';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  text = ro.QUEST;

  id: string;
  content: QuestContent[] = QUEST_CONTENT;
  responses: FormArray = this.fb.array([]);
  questionsGroup: FormGroup = new FormGroup({
    responses: this.responses
  });
  questionnaire: Questionnaire;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private scroller: ViewportScroller) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    const questionsNo = this.initQuestionnaire();
    this.addQuestResponseControls(questionsNo);
  }

  isQuestionnaireComplete(): boolean {
    return this.responses.valid;
  }

  save(): void {
    for (let section of this.questionnaire.sections) {
      this.updateQuestionsResponse(section);
    }
    // todo controller: save questionnaire
    console.log(this.questionnaire);
  }

  scrollTo(anchor: string) {
    this.scroller.scrollToAnchor(anchor);
  }

  private updateQuestionsResponse(section: QuestSection): void {
    for (let subsection of section.subsections) {
      this.updateQuestionsResponse(subsection);
    }
    for (let question of section.questions) {
      question.response = this.responses.at(question.responseControlIndex).value;
    }
  }

  private initQuestionnaire(): number {
    let index = 0;
    const questionnaire = new Questionnaire();
    for (let i = 0; i < this.content.length; i++) {
      const section = new QuestSection(i, this.content[i].title);
      for (let j = 0; j < this.content[i].subtitles.length; j++) {
        const question = new Question(j, 'Q ' + index, index++);
        const subsection = new QuestSection(j, this.content[i].subtitles[j]);
        subsection.questions = [question];
        section.subsections.push(subsection);
      }
      questionnaire.sections.push(section);
    }
    this.questionnaire = questionnaire;
    return index;
  }

  private addQuestResponseControls(controlsNo: number): void {
    for (let i = 0; i < controlsNo; i++) {
      this.responses.push(this.fb.control('', Validators.required));
    }
  }

  private countQuestions(): number {
    // can be transformed into a constant for better performance
    return this.content.map((section) => section.subtitles.length)
      .reduce((a, b) => a + b);
  }
}
