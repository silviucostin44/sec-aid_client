import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import ro from 'src/assets/text/ro.json';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Questionnaire} from '../../../models/questionnaire.model';
import {DatePipe, ViewportScroller} from '@angular/common';
import QuestionnaireHelper from '../../../helpers/questionnaire.helper';
import {Response} from '../../../models/response.model';
import {CONSTANTS} from '../../../constants/global-constants';
import {QuestionnaireService} from '../../../services/questionnaire.service';
import {QuestSection} from '../../../models/quest-section.model';
import {IeService} from '../../../services/ie.service';
import {UploadDownloadService} from '../../../services/upload-download.service';
import {Observable} from 'rxjs';
import {SecurityService} from '../../../services/security.service';
import {QuestionnaireServer} from '../../../models/server-api/questionnaire-server';
import {ElementStartEnum} from '../../../models/enums/element-start.enum';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  readonly text = ro.QUEST;
  id: string;
  responses: FormArray = new FormArray([]);
  responsesGroup: FormGroup = new FormGroup({
    responses: this.responses
  });
  responseCriteriaKeys: string[] = Response.getResponseCriteriaKeys();
  responseOptions: string[] = QuestionnaireHelper.getMaturityLevelsAsList();
  questionnaire: Questionnaire;
  questName: String;
  isSaved: boolean = true;
  displayScores: boolean = false;
  hideCheck: boolean = true;
  isSignedIn: boolean;
  pageActionsNames: String[];

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private scroller: ViewportScroller,
              private questService: QuestionnaireService,
              private ieService: IeService,
              private downloadService: UploadDownloadService,
              private securityService: SecurityService,
              private router: Router,
              private datePipe: DatePipe,
              private toastrService: ToastrService) {
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.isAtLeastOneResponseCompleted() || this.isSaved;
  }

  ngOnInit(): void {
    this.checkSignedUser();
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageActionsNames = [
      this.primaryActionName(),
      ro.PAGE.EXPORT
    ];

    this.initQuestionnaire();
  }

  primaryActionName(): string {
    return this.isSignedIn
      ? ro.PAGE.SAVE
      : ro.PAGE.EXPORT;
  }

  primaryAction(): void {
    return this.isSignedIn
      ? this.save()
      : this.export();
  }

  isQuestionnaireComplete(): boolean {
    return this.responses.valid;
  }

  updateQuestionsResponse(): void {
    for (let section of this.questionnaire.sections) {
      this.updateQuestionsResponseRecursive(section);
    }
  }

  updateFormControlResponse(): void {
    for (let section of this.questionnaire.sections) {
      this.updateFormControlResponseRecursive(section);
    }
    this.startCheckingResponseControlsChanges();
  }

  isAtLeastOneResponseCompleted(): boolean {
    return this.responses.controls.some((control) => this.responseCriteriaKeys.some(key => control.get(key).valid));
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
    this.updateQuestionsResponse();
    this.questService.computeScores(this.questionnaire).subscribe((sections) => {
      this.questionnaire = new Questionnaire(QuestSection.fromServerListOfObjects(sections));
    });
    this.displayScores = true;
  }

  reset(): void {
    this.displayScores = false;
    this.hideCheck = true;
  }

  getScoreColor(score: number): string {
    return QuestionnaireHelper.getColorFromMaturityLevel(Math.ceil(score));
  }

  translateMaturityLevel(maturityLevel: string): string {
    return ro.QUEST.EVAL['MAT_LVL_' + maturityLevel];
  }

  checkResponses(): void {
    this.hideCheck = false;
  }

  export(): void {
    this.updateQuestionsResponse();
    this.ieService.getQuestionnaireExport(this.questionnaire)
      .pipe(finalize(() => this.isSaved = true))
      .subscribe((fileData) => {
        const blob = new Blob([fileData], {type: 'text/json; charset=utf-8'});
        this.downloadService.saveAs(blob, 'questionnaire-' + this.getDateNow() + '.json');
      });
  }

  isQuestionResponseValid(responseControlIndex: number): boolean {
    return this.responses.at(responseControlIndex).valid;
  }

  isSectionValid(section: QuestSection): boolean {
    return section.subsections.every((subsection) => this.isSectionValid(subsection))
      && section.questions.every((question) => this.isQuestionResponseValid(question.responseControlIndex));
  }

  generateDoc(): void {
    // todo v3:
  }

  save(): void {
    if (!this.questName || this.questName.length === 0) {
      this.questName = 'Quest-' + this.getDateNow();
    }
    const questRealId = this.id.length > 8 ? this.id : null;  // todo v3: make it better than this
    this.updateQuestionsResponse();
    this.questService.saveQuestionnaire(questRealId, this.questionnaire, this.questName)
      .pipe(finalize(() => this.isSaved = true))
      .subscribe((questionnaire) => {
          this.updateSavedQuestionnaire(questionnaire);
          this.toastrService.success(this.text.TOAST.SUCCESS + questionnaire.name, '', {timeOut: 3000});
        }, () => this.toastrService.error(this.text.TOAST.ERROR, '', {disableTimeOut: true})
      );
  }

  private initQuestionnaire() {
    switch (this.id) {
      case ElementStartEnum.NEW: {
        this.questService.getDefaultQuestionnaire().subscribe((sections) => {
          this.questionnaire = new Questionnaire(QuestSection.fromServerListOfObjects(sections));
        });
        this.initQuestResponseControls(CONSTANTS.totalQuestionsNo);
        break;
      }
      case ElementStartEnum.IMPORTED: {
        if (!history.state.questionnaire) {
          this.router.navigate(['/home']);
        }
        this.questionnaire = new Questionnaire(QuestSection.fromServerListOfObjects(history.state.questionnaire));
        this.updateFormControlResponse();
        break;
      }
      default: {
        // the loading case, id is considered the db stored questionnaire's id
        this.questService.getQuestionnaire(this.id).subscribe((questionnaire) => {
          this.updateSavedQuestionnaire(questionnaire);
          this.updateFormControlResponse();
        });
      }
    }
  }

  private updateQuestionsResponseRecursive(section: QuestSection): void {
    for (let subsection of section.subsections) {
      this.updateQuestionsResponseRecursive(subsection);
    }
    for (let question of section.questions) {
      const response = this.responses.at(question.responseControlIndex);
      // set to null if there is no value
      question.response = this.isResponseValid(response) ? Response.formGroupToResponse(response) : null;
    }
  }

  private isResponseValid(response: AbstractControl): boolean {
    if (response.valid) {
      return true;
    }
    return this.responseCriteriaKeys.some((crt) => response.value[crt] && response.value[crt] !== '');
  }

  private updateFormControlResponseRecursive(section: QuestSection): void {
    for (let subsection of section.subsections) {
      this.updateFormControlResponseRecursive(subsection);
    }
    for (let question of section.questions) {
      this.responses.push(
        question.response ? question.response.toFormGroup() : Response.buildDefaultResponseControl());
    }
  }

  private initQuestResponseControls(controlsNo: number): void {
    for (let i = 0; i < controlsNo; i++) {
      this.responses.push(Response.buildDefaultResponseControl());
    }
    this.startCheckingResponseControlsChanges();
  }

  private checkSignedUser(): void {
    this.isSignedIn = this.securityService.isSignedIn();

    this.securityService.authEvents.subscribe(() => {
      this.isSignedIn = this.securityService.isSignedIn();
    });
  }

  private updateSavedQuestionnaire(questionnaire: QuestionnaireServer) {
    this.questionnaire = new Questionnaire(QuestSection.fromServerListOfObjects(questionnaire.sections));
    this.questName = questionnaire.name;
  }

  private getDateNow(): string {
    return this.datePipe.transform(new Date(), CONSTANTS.dateFormat);
  }

  /**
   * After form control is updated during initialisation start checking for changes.
   * @private
   */
  private startCheckingResponseControlsChanges() {
    this.responses.valueChanges.subscribe(() => this.isSaved = false);
  }
}
