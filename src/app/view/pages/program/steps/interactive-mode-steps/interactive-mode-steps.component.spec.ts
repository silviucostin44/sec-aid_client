import {TestBed} from '@angular/core/testing';

import {InteractiveModeStepsComponent} from './interactive-mode-steps.component';
import {FileService} from '../../../../../services/file.service';
import {ProgramService} from '../../../../../services/program.service';
import {MockBsModalService, MockDatePipe, MockToastrService} from '../../../../../../../test/mocks';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Program} from '../../../../../models/program.model';
import {BsModalService} from 'ngx-bootstrap/modal';
import {first} from 'rxjs/operators';
import {EventEmitter} from '@angular/core';
import {Asset} from '../../../../../models/asset.model';
import {RiskAssessment} from '../../../../../models/risk-assessment.model';
import {ActionAnalysis} from '../../../../../models/action-analysis.model';
import {ElementStartEnum} from '../../../../../models/enums/element-start.enum';
import {of} from 'rxjs';
import {AssetAttributes} from '../../../../../models/asset-attributes.model';
import {NistCoreSubcategory} from '../../../../../models/nist-core-subcategory.model';

describe('InteractiveModeStepsComponent', () => {
  let component: InteractiveModeStepsComponent;
  let datePipe: DatePipe;
  let toastrService: ToastrService;
  let fileServiceSpy: jasmine.SpyObj<FileService>;
  let programServiceSpy: jasmine.SpyObj<ProgramService>;

  let dummyProgram: Program;

  beforeEach(() => {
    const fileSpy = jasmine.createSpyObj('FileService', ['']);
    const programSpy = jasmine.createSpyObj('ProgramService', ['saveProgram', 'getProgram']);

    dummyProgram = new Program('99', 'dummy program');

    TestBed.configureTestingModule({
      providers: [
        InteractiveModeStepsComponent,
        {provide: FileService, useValue: fileSpy},
        {provide: ProgramService, useValue: programSpy},
        {provide: DatePipe, useClass: MockDatePipe},
        {provide: ToastrService, useClass: MockToastrService},
        {provide: BsModalService, useClass: MockBsModalService},
      ]
    });
    component = TestBed.inject(InteractiveModeStepsComponent);
    fileServiceSpy = TestBed.inject(FileService) as jasmine.SpyObj<FileService>;
    programServiceSpy = TestBed.inject(ProgramService) as jasmine.SpyObj<ProgramService>;
    datePipe = TestBed.inject(DatePipe);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not init after construction', () => {
    expect(component.currentStep).toBeUndefined();
    expect(component.program).toBeUndefined();
    expect(component.profileImplementationTierControl.value).toBeNull();
  });

  it('init after ngOnInit', () => {
    component.saveDataEmitter = new EventEmitter<any>();
    component.ngOnInit();

    expect(component.currentStep).toBeUndefined();
    expect(component.program).toBeUndefined();
    expect(component.profileImplementationTierControl.value).toBeNull();
  });

  it('step 1 and 6 data change', () => {
    component.stepOneAndSixDataChange();

    component.isStepValid.pipe(first()).subscribe((validity) =>
      expect(validity).toBeFalse()
    );
  });

  it('step 1 and 6 data change true', () => {
    component.data = ['elem'];
    component.stepOneAndSixDataChange();

    component.isStepValid.pipe(first()).subscribe((validity) =>
      expect(validity).toBeTrue()
    );
  });

  it('profile validity', () => {
    component.checkProfileValidity();

    component.isStepValid.pipe(first()).subscribe((validity) =>
      expect(validity).toBeFalse()
    );
  });

  it('profile validity true', () => {
    component.profileImplementationTierControl.setValue('improving');
    component.stepOneAndSixDataChange();

    component.isStepValid.pipe(first()).subscribe((validity) =>
      expect(validity).toBeTrue()
    );
  });

  it('test set programId new, before set step', () => {
    component.programId = ElementStartEnum.NEW;

    expect(component.program.id).toBe(0);
    expect(component.program.name.slice(0, 7)).toEqual('Program');
  });

  it('test set programId new, after set step', () => {
    component.step = 1;
    component.programId = ElementStartEnum.NEW;

    expect(component.program.id).toBe(0);
    expect(component.program.name.slice(0, 7)).toEqual('Program');
    expect(component.columns.length).toBe(7);
  });

  it('test set programId existing, before set step', () => {
    programServiceSpy.getProgram.and.returnValue(of(dummyProgram));
    component.programId = '99';

    expect(component.program).toEqual(dummyProgram);
  });

  it('test set programId existing, after set step', () => {
    programServiceSpy.getProgram.and.returnValue(of(dummyProgram));
    component.step = 1;
    component.programId = '99';

    expect(component.program).toEqual(dummyProgram);
    expect(component.columns.length).toBe(7);
  });

  it('set step', () => {
    component.step = 1;

    expect(component.currentStep).toBe(1);
    expect(component.data).toEqual([]);

    component.program = dummyProgram;
    const dummyAsset = new Asset();
    dummyAsset.name = 'dummy asset';
    component.data = [dummyAsset];

    component.step = 2;

    expect(component.currentStep).toBe(2);
    expect(component.program.assets[0]).toEqual(dummyAsset);
    expect(component.data[0].name).toEqual(dummyAsset.name);

    component.data[0].regulations = [new AssetAttributes(99)];

    component.step = 3;

    expect(component.currentStep).toBe(3);
    expect(component.program.assets.length).toBe(1);
    expect(component.program.assets[0].regulations.length).toBe(1);
    expect(component.data.length).toBe(1);
    expect(component.data[0].function).toEqual('IDENTIFY');
    expect(component.data[0].implementationLevel).toBe(0);
    expect(component.profileImplementationTierControl.pristine
      && component.profileImplementationTierControl.untouched).toBeTruthy();
    expect(component.profileImplementationTierControl.value).toBe(null);

    component.data[0].implementationLevel = 2;
    dummyAsset.riskAssessment = new RiskAssessment();
    component.program.assets = [dummyAsset];

    component.step = 4;

    expect(component.currentStep).toBe(4);
    expect(component.program.targetProfile.nistCoreSubcategoryList[0].implementationLevel).toBe(2);
    expect(component.data.length).toBe(1);
    expect(component.data[0].probability).toBe(0);

    component.data[0].probability = 2;

    component.step = 5;

    expect(component.currentStep).toBe(5);
    expect(component.program.assets.length).toBe(1);
    expect(component.program.assets[0].riskAssessment.probability).toBe(2);

    expect(component.data.length).toBe(1);
    expect(component.data[0].function).toEqual('IDENTIFY');
    expect(component.data[0].implementationLevel).toBe(0);

    component.data[0].implementationLevel = 2;
    const dummyActionAnalysis = new ActionAnalysis(99, 'ID.AM-1', 'glorify', 2, 1);
    component.program.currentProfile.nistCoreSubcategoryList.push(new NistCoreSubcategory('ID.AM-1', 0));
    component.program.currentProfile.nistCoreSubcategoryList[0].actionAnalysis = dummyActionAnalysis;

    component.step = 6;

    expect(component.currentStep).toBe(6);
    expect(component.program.currentProfile.nistCoreSubcategoryList[0].implementationLevel).toBe(2);
    expect(component.data.length).toBe(1);
    expect(component.data[0].action).toBe(dummyActionAnalysis.action);
    expect(component.data[0].priority).toBe(dummyActionAnalysis.priority);

    component.data[0].action = 'action';

    component.step = 7;

    expect(component.program.currentProfile.nistCoreSubcategoryList.length).toBe(1);
    expect(component.program.currentProfile.nistCoreSubcategoryList[0].actionAnalysis.action).toBe('action');
  });

});
