import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ro from 'src/assets/text/ro.json';
import {QUEST_CONTENT} from '../../../constants/questionnaire-content';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Questionnaire, QuestSection} from '../../../models/questionnaire.model';
import {QuestContent} from '../../../models/questionnaire-content.interface';
import {Question} from '../../../models/question.model';
import {ViewportScroller} from '@angular/common';
import QuestionnaireHelper from '../../../helpers/questionnaire.helper';
import {Response} from '../../../models/response.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  text = ro.QUEST;

  id: string;
  content: QuestContent[] = QUEST_CONTENT;
  responses: FormArray = new FormArray([]);
  responsesGroup: FormGroup = new FormGroup({
    responses: this.responses
  });
  responseCriteriaKeys: string[] = QuestionnaireHelper.getResponseCriteriaKeys();
  responseOptions: string[] = QuestionnaireHelper.getMaturityLevelsAsList();
  questionnaire: Questionnaire;

  displayScores: boolean = false;

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

  getLabelBySection(sectionIndex: number, crtIndex: number): string {
    return sectionIndex === 7
      ? this.text.EVAL['R_CRT_' + (crtIndex + 1)]
      : this.text.EVAL['P_CRT_' + (crtIndex + 1)];
  }

  generateScores(): void {
    // todo refactor: better way to iterate over questionnaire
    this.save();  /* todo refactor: don't use save here */
    for (let section of this.questionnaire.sections) {
      this.computeScores(section);
      section.setRating(section.subsections
        .map((question) => question.getRating())
        .reduce((sum, current) => sum + current)
      );
    }
    this.displayScores = true;
  }

  resetScores(): void {
    this.displayScores = false;
  }

  getScoreColor(score: number): string {
    return QuestionnaireHelper.getColorFromMaturityLevel(Math.ceil(score));
  }

  translateMaturityLevel(maturityLevel: string) {
    return ro.QUEST.EVAL['MAT_LVL_' + maturityLevel];
  }

  private updateQuestionsResponse(section: QuestSection): void {
    for (let subsection of section.subsections) {
      this.updateQuestionsResponse(subsection);
    }
    for (let question of section.questions) {
      // todo response: fix
      question.response = Response.formGroupToResponse(this.responses.at(question.responseControlIndex));
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
      const responseFormGroup = this.fb.group({
        crt_1: this.fb.control('', Validators.required),
        crt_2: this.fb.control('', Validators.required),
        crt_3: this.fb.control('', Validators.required),
        crt_4: this.fb.control('', Validators.required)
      });
      this.responses.push(responseFormGroup);
    }
  }

  private computeScores(section: QuestSection): void {
    for (let subsection of section.subsections) {
      this.computeScores(subsection);
      subsection.setRating(subsection.questions
        .map((question) => question.getRating())
        .reduce((sum, current) => sum + current)
      );
    }
    for (let question of section.questions) {
      question.setRating(question.response.computeRating());
    }
  }

  private countQuestions(): number {
    // can be transformed into a constant for better performance
    return this.content.map((section) => section.subtitles.length)
      .reduce((a, b) => a + b);
  }
}
