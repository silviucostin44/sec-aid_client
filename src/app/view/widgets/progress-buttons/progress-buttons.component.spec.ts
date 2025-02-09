import {ProgressButtons} from './progress-buttons.component';
import {TestBed} from '@angular/core/testing';
import {FileService} from '../../../services/file.service';
import {ProgramService} from '../../../services/program.service';
import {EventEmitter} from '@angular/core';
import {BUTTONS_DISTANCE_STEP} from '../../../constants/progress-buttons';

describe('ProgressButon', () => {
  let component: ProgressButtons;

  beforeEach(() => {
    const fileSpy = jasmine.createSpyObj('FileService', ['lastProgramStep', 'downloadFilesByType', 'deleteFile']);
    const programSpy = jasmine.createSpyObj('ProgramService', ['lastProgramStep']);

    TestBed.configureTestingModule({
      providers: [
        ProgressButtons,
      ]
    });
    component = TestBed.inject(ProgressButtons);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not init after construction', () => {
    expect(component.currentStep).toBe(0);
    expect(component.next).toBeUndefined();
    expect(component.initialLastComputedStep).toBeUndefined();
    expect(component.lastComputedStep).toBe(0);
  });

  it('init after ngOnInit update step', () => {
    component.next = new EventEmitter<any>();
    component.ngOnInit();
    component.next.emit(2);

    expect(component.currentStep).toBe(1);
    expect(component.lastComputedStep).toBe(1);
  });

  it('init after ngOnInit next step', () => {
    component.next = new EventEmitter<any>();
    component.ngOnInit();
    component.next.emit(2);

    expect(component.currentStep).toBe(1);
    expect(component.lastComputedStep).toBe(1);

    component.next.emit(undefined);

    expect(component.currentStep).toBe(2);
    expect(component.lastComputedStep).toBe(2);
  });

  it('init after ngOnInit prev step', () => {
    component.next = new EventEmitter<any>();
    component.ngOnInit();
    component.next.emit(6);

    component.updateStep(2);

    expect(component.currentStep).toBe(2);
    expect(component.lastComputedStep).toBe(5);
  });

  it('button style', () => {
    expect(component.buttonStyle(false, 1)).toEqual('btn-secondary');
    expect(component.buttonStyle(true, 1)).toEqual('btn-primary');
    expect(component.buttonStyle(true, 0)).toEqual('btn-danger');
  });

  it('progress %', () => {
    component.next = new EventEmitter<any>();
    component.ngOnInit();
    component.next.emit(6);

    expect(component.progressPercentage()).toEqual(5 * BUTTONS_DISTANCE_STEP + '%');
  });

  it('is touched step', () => {
    expect(component.isUntouchedStep(4)).toBeTrue();

    component.next = new EventEmitter<any>();
    component.ngOnInit();
    component.next.emit(6);

    expect(component.isUntouchedStep(4)).toBeFalse();
  });


});
