import {TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {Router} from '@angular/router';
import {SecurityService} from '../../../services/security.service';
import {IeService} from '../../../services/ie.service';
import {FileService} from '../../../services/file.service';
import {ProgramService} from '../../../services/program.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {QuestionnaireService} from '../../../services/questionnaire.service';
import {MockEmptyClass, MockSecurityService} from '../../../../../test/mocks';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let ieServiceSpy: IeService;
  let securityService: SecurityService;
  let router: Router;
  let fileServiceSpy: jasmine.SpyObj<FileService>;
  let questService: QuestionnaireService;
  let programService: ProgramService;

  beforeEach(() => {
    const fileSpy = jasmine.createSpyObj('FileService', ['resetSessionDb']);

    TestBed.configureTestingModule({
      providers:
        [
          HomeComponent,
          {provide: BsModalService, useClass: MockEmptyClass},
          {provide: SecurityService, useClass: MockSecurityService},
          {provide: FileService, useValue: fileSpy},
          {provide: ProgramService, useClass: MockEmptyClass},
          {provide: QuestionnaireService, useClass: MockEmptyClass},
          {provide: Router, useClass: MockEmptyClass},
          {provide: IeService, useClass: MockEmptyClass},
        ]
    });
    component = TestBed.inject(HomeComponent);
    ieServiceSpy = TestBed.inject(IeService);
    securityService = TestBed.inject(SecurityService);
    router = TestBed.inject(Router);
    fileServiceSpy = TestBed.inject(FileService) as jasmine.SpyObj<FileService>;
    questService = TestBed.inject(QuestionnaireService);
    programService = TestBed.inject(ProgramService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('not init after construction', () => {
    expect(component.isSignedIn).toBeUndefined();
  });

  it('init after ngOnInit', () => {
    component.ngOnInit();

    expect(component.isSignedIn).toBeFalse();
  });
});
