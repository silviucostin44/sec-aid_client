import {TestBed} from '@angular/core/testing';

import {ProgramComponent} from './program.component';
import {ActivatedRoute} from '@angular/router';
import {FileService} from '../../../services/file.service';
import {SecurityService} from '../../../services/security.service';
import {ProgramService} from '../../../services/program.service';
import {ChangeDetectorRef} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap/modal';
import {IeService} from '../../../services/ie.service';
import {MockActivatedRoute, MockEmptyClass, MockSecurityService} from '../../../../../test/mocks';

class MockIeService {
  getProgramJsonUrl = () => 'export-url';
}

describe('ProgramComponent', () => {
  let component: ProgramComponent;
  let activatedRoute: ActivatedRoute;
  let securityService: SecurityService;
  let ieService: IeService;
  let fileServiceSpy: jasmine.SpyObj<FileService>;
  let programServiceSpy: jasmine.SpyObj<ProgramService>;

  beforeEach(() => {
    const fileSpy = jasmine.createSpyObj('FileService', ['lastProgramStep', 'downloadFilesByType', 'deleteFile']);
    const programSpy = jasmine.createSpyObj('ProgramService', ['lastProgramStep']);

    TestBed.configureTestingModule({
      providers: [
        ProgramComponent,
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: SecurityService, useClass: MockSecurityService},
        {provide: FileService, useValue: fileSpy},
        {provide: ProgramService, useValue: programSpy},
        {provide: BsModalService, useClass: MockEmptyClass},
        {provide: IeService, useClass: MockIeService},
        {provide: ChangeDetectorRef, useClass: MockIeService},
      ]
    });
    component = TestBed.inject(ProgramComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    securityService = TestBed.inject(SecurityService);
    ieService = TestBed.inject(IeService);
    fileServiceSpy = TestBed.inject(FileService) as jasmine.SpyObj<FileService>;
    programServiceSpy = TestBed.inject(ProgramService) as jasmine.SpyObj<ProgramService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not init after construction', () => {
    expect(component.id).toBeUndefined();
    expect(component.isSignedIn).toBeUndefined();
    expect(component.pageActionsNames).toBeUndefined();
  });

  it('init after ngOnInit', () => {
    fileServiceSpy.lastProgramStep.and.returnValue(new Observable<number>());
    programServiceSpy.lastProgramStep.and.returnValue(new Observable<number>());

    component.ngOnInit();
    expect(component.id).toBe('99');
    expect(component.isSignedIn).toBeFalse();
    expect(component.pageActionsNames[0]).toBe('Exportă');
    expect(component.pageActionsNames[1]).toBe('Arhivează');
  });

  it('can deactivate', () => {
    expect(component.canDeactivate()).toBe(true);
  });

  it('export action', () => {
    fileServiceSpy.lastProgramStep.and.returnValue(new Observable<number>());
    programServiceSpy.lastProgramStep.and.returnValue(new Observable<number>());
    component.ngOnInit();
    component.primaryAction();

    expect(component.isSaved).toBeTrue();
  });

  it('save action', () => {
    component.isSignedIn = true;
    component.primaryAction();

    expect(component.isSaved).toBeTrue();
  });

  it('update step', () => {
    fileServiceSpy.lastProgramStep.and.returnValue(new Observable<number>());
    programServiceSpy.lastProgramStep.and.returnValue(new Observable<number>());
    const downloadSpy = fileServiceSpy.downloadFilesByType.and.returnValue(of([]));
    component.ngOnInit();

    component.updateStep(0);

    expect(component.currentStep).toBe(1);
    component.files.subscribe(files => expect(files.length).toBe(0));
    expect(downloadSpy.calls.any()).toBeTrue();
  });

  it('delete file', () => {
    fileServiceSpy.lastProgramStep.and.returnValue(new Observable<number>());
    const deleteSpy = fileServiceSpy.deleteFile.and.returnValue(of(0));
    programServiceSpy.lastProgramStep.and.returnValue(new Observable<number>());
    const downloadSpy = fileServiceSpy.downloadFilesByType.and.returnValue(of([]));
    component.ngOnInit();

    component.currentStep = 1;
    component.deleteFile('99');

    expect(component.isSaved).toBe(false);
    expect(deleteSpy.calls.any()).toBeTrue();
    expect(downloadSpy.calls.any()).toBeTrue();
    component.files.subscribe(files => expect(files.length).toBe(0));
  });
});
