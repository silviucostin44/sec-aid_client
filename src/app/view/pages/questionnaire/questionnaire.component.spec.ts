import {QuestionnaireComponent} from './questionnaire.component';
import {TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {DatePipe, ViewportScroller} from '@angular/common';
import {QuestionnaireService} from '../../../services/questionnaire.service';
import {IeService} from '../../../services/ie.service';
import {SecurityService} from '../../../services/security.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MockActivatedRoute, MockDatePipe, MockEmptyClass, MockSecurityService, MockToastrService} from 'test/mocks';
import {of} from 'rxjs';
import {ElementStartEnum} from '../../../models/enums/element-start.enum';
import {CONSTANTS} from '../../../constants/global-constants';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let activatedRoute: ActivatedRoute;
  let fb: FormBuilder;
  let scroller: ViewportScroller;
  let questServiceSpy: jasmine.SpyObj<QuestionnaireService>;
  let ieServiceSpy: jasmine.SpyObj<IeService>;
  let securityService: SecurityService;
  let router: Router;
  let datePipe: DatePipe;
  let toastrService: ToastrService;

  const dummyQuest = {
    id: '99',
    sections: [],
    name: 'dummy quest'
  };

  beforeEach(() => {
    const questSpy = jasmine.createSpyObj('QuestionnaireService', ['getDefaultQuestionnaire', 'getQuestionnaire', 'saveQuestionnaire']);
    const ieSpy = jasmine.createSpyObj('IeService', ['getQuestionnaireExport']);

    TestBed.configureTestingModule({
      providers: [
        QuestionnaireComponent,
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: FormBuilder, useValue: new FormBuilder()},
        {provide: ViewportScroller, useClass: MockEmptyClass},
        {provide: QuestionnaireService, useValue: questSpy},
        {provide: IeService, useValue: ieSpy},
        {provide: SecurityService, useClass: MockSecurityService},
        {provide: Router, useClass: MockEmptyClass},
        {provide: DatePipe, useClass: MockDatePipe},
        {provide: ToastrService, useClass: MockToastrService},
        {provide: BsModalService, useClass: MockEmptyClass},
      ]
    });
    component = TestBed.inject(QuestionnaireComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fb = TestBed.inject(FormBuilder);
    scroller = TestBed.inject(ViewportScroller);
    questServiceSpy = TestBed.inject(QuestionnaireService) as jasmine.SpyObj<QuestionnaireService>;
    ieServiceSpy = TestBed.inject(IeService) as jasmine.SpyObj<IeService>;
    securityService = TestBed.inject(SecurityService);
    router = TestBed.inject(Router);
    datePipe = TestBed.inject(DatePipe);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not init after construction', () => {
    expect(component.id).toBeUndefined();
    expect(component.isSignedIn).toBeUndefined();
    expect(component.pageActionsNames).toBeUndefined();
    expect(component.questionnaire).toBeUndefined();
    expect(component.responses.length).toBe(0);
  });

  it('init after ngOnInit with loaded quest', () => {
    questServiceSpy.getQuestionnaire.and.returnValue(of(dummyQuest));

    component.ngOnInit();

    expect(component.id).toBe('99');
    expect(component.isSignedIn).toBeFalse();
    expect(component.pageActionsNames[0]).toBe('Exportă');
    expect(component.questionnaire.sections.length).toBe(0);
    expect(component.questName).toBe(dummyQuest.name);
    expect(component.id).toBe(dummyQuest.id);
    expect(component.responses.length).toBe(0);
  });

  it('init after ngOnInit with new quest', () => {
    questServiceSpy.getDefaultQuestionnaire.and.returnValue(of([]));

    activatedRoute.snapshot.paramMap.get = () => ElementStartEnum.NEW;
    component.ngOnInit();

    expect(component.id).toBe('new');
    expect(component.isSignedIn).toBeFalse();
    expect(component.pageActionsNames[0]).toBe('Exportă');
    expect(component.questionnaire.sections.length).toBe(0);
    expect(component.questName).toBe(undefined);
    expect(component.responses.length).toBe(CONSTANTS.totalQuestionsNo);
  });

  it('can deactivate', () => {
    expect(component.canDeactivate()).toBe(true);
  });

  it('export action', () => {
    questServiceSpy.getQuestionnaire.and.returnValue(of(dummyQuest));
    ieServiceSpy.getQuestionnaireExport.and.returnValue(of(new ArrayBuffer(0)));
    component.ngOnInit();
    component.primaryAction();

    expect(component.isSaved).toBeTrue();
  });

  it('save action', () => {
    questServiceSpy.getQuestionnaire.and.returnValue(of(dummyQuest));
    questServiceSpy.saveQuestionnaire.and.returnValue(of(dummyQuest));

    component.ngOnInit();
    component.isSignedIn = true;
    component.primaryAction();

    expect(component.isSaved).toBeTrue();
    expect(component.questName).toBe(dummyQuest.name);
    expect(component.questionnaire.sections.length).toBe(0);
  });

  it('is quest complete', () => {
    questServiceSpy.getDefaultQuestionnaire.and.returnValue(of([]));
    activatedRoute.snapshot.paramMap.get = () => ElementStartEnum.NEW;
    component.ngOnInit();

    expect(component.isQuestionnaireComplete()).toBeFalse();
    expect(component.isAtLeastOneResponseCompleted()).toBeFalse();
    expect(component.isQuestionResponseValid(0)).toBeFalse();
  });


});
