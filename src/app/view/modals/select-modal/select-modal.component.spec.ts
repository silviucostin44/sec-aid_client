import {TestBed} from '@angular/core/testing';

import {SelectModalComponent, SelectType} from './select-modal.component';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MockBsModalService, MockEmptyClass, MockFB} from '../../../../../test/mocks';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ProgramService} from '../../../services/program.service';
import {QuestionnaireService} from '../../../services/questionnaire.service';
import {of} from 'rxjs';

describe('SelectModalComponent', () => {
  let component: SelectModalComponent;
  let questServiceSpy: jasmine.SpyObj<QuestionnaireService>;
  let programServiceSpy: jasmine.SpyObj<ProgramService>;

  const testInput = [
    {
      id: '1',
      name: 'e1'
    },
    {
      id: '2',
      name: 'e2'
    }
  ];

  beforeEach(() => {
    const questSpy = jasmine.createSpyObj('QuestionnaireService', ['manageQuestionnaires']);
    const programSpy = jasmine.createSpyObj('ProgramService', ['manageProgram']);

    TestBed.configureTestingModule({
      providers: [
        SelectModalComponent,
        {provide: QuestionnaireService, useValue: questSpy},
        {provide: ProgramService, useValue: programSpy},
        {provide: FormBuilder, useClass: MockFB},
        {provide: Router, useClass: MockEmptyClass},
        {provide: BsModalRef, useValue: MockBsModalService},
      ]
    });
    component = TestBed.inject(SelectModalComponent);
    questServiceSpy = TestBed.inject(QuestionnaireService) as jasmine.SpyObj<QuestionnaireService>;
    programServiceSpy = TestBed.inject(ProgramService) as jasmine.SpyObj<ProgramService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not init after construction', () => {
    expect(component.displayedElementsToSelect).toBeUndefined();
    expect(component.checked.length).toBe(0);
    expect(component.names.length).toBe(0);
    expect(component.duplicateName).toBeUndefined();
  });

  it('init after ngOnInit', () => {
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    expect(component.displayedElementsToSelect.length).toBe(2);
    expect(component.displayedElementsToSelect[0].id).toEqual('1');
    expect(component.displayedElementsToSelect[1].name).toEqual('e2');
    expect(component.checked.length).toBe(2);
    expect(component.names.length).toBe(2);
  });

  it('action button text', () => {
    expect(component.actionButtonText()).toEqual('Editare');
    expect(component.duplicateName).toBeUndefined();
  });

  it('edit', () => {
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    component.editOrSave();

    expect(component.names.enabled).toBeTrue();
    expect(component.editingState).toBeTrue();
  });

  it('save quests', () => {
    questServiceSpy.manageQuestionnaires.and.returnValue(of([]));
    component.typeInput = SelectType.QUESTIONNAIRE;
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    component.editOrSave();
    component.editOrSave();

    expect(component.names.length).toBe(0);
    expect(component.names.disabled).toBeTrue();
    expect(component.checked.length).toBe(0);
    expect(component.displayedElementsToSelect.length).toBe(0);
    expect(component.itemsToDelete).toEqual([]);
    expect(component.itemsToAdd).toEqual([]);
    expect(component.allSelected).toBeFalse();
    expect(component.someSelected).toBeFalse();
  });

  it('save programs', () => {
    programServiceSpy.manageProgram.and.returnValue(of([]));
    component.typeInput = SelectType.PROGRAM;
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    component.editOrSave();
    component.editOrSave();

    expect(component.names.length).toBe(0);
    expect(component.names.disabled).toBeTrue();
    expect(component.checked.length).toBe(0);
    expect(component.displayedElementsToSelect.length).toBe(0);
    expect(component.itemsToDelete).toEqual([]);
    expect(component.itemsToAdd).toEqual([]);
    expect(component.allSelected).toBeFalse();
    expect(component.someSelected).toBeFalse();
  });

  it('edit and cancel', () => {
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    component.editOrSave();
    expect(component.editingState).toBeTrue();

    component.cancelEditing();

    expect(component.names.length).toBe(2);
    expect(component.names.disabled).toBeTrue();
    expect(component.checked.length).toBe(2);
    expect(component.displayedElementsToSelect.length).toBe(2);
    expect(component.itemsToDelete).toEqual([]);
    expect(component.itemsToAdd).toEqual([]);
    expect(component.allSelected).toBeFalse();
    expect(component.someSelected).toBeFalse();
    expect(component.editingState).toBeFalse();
  });

  it('test select all', () => {
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    expect(component.allSelected).toBeFalse();

    component.selectAll();

    expect(component.checked.controls.every(control => control.value)).toBeTrue();

    component.selectAll();

    expect(component.allSelected).toBeFalse();
  });

  it('deleteOne', () => {
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    component.deleteOne(0, 0);

    expect(component.displayedElementsToSelect.length).toBe(1);
    expect(component.displayedElementsToSelect[0].id).toEqual('2');
    expect(component.displayedElementsToSelect[0].name).toEqual('e2');
    expect(component.itemsToDelete.length).toBe(1);

    component.deleteOne(0, 0);

    expect(component.displayedElementsToSelect.length).toBe(0);
    expect(component.itemsToDelete.length).toBe(2);
    expect(component.elementsToSelectInput.length).toBe(2);
  });

  it('delete selected', () => {
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    component.deleteSelected();

    expect(component.displayedElementsToSelect.length).toBe(2);
    expect(component.itemsToDelete.length).toBe(0);

    component.selectAll();

    component.deleteSelected();

    expect(component.displayedElementsToSelect.length).toBe(0);
    expect(component.itemsToDelete.length).toBe(2);
  });

  it('save button disabled', () => {
    component.duplicateName = false;
    expect(component.isSaveButtonDisabled()).toBeFalse();

    component.duplicateName = true;
    expect(component.isSaveButtonDisabled()).toBeTrue();

    component.duplicateName = false;
    component.editingState = true;
    expect(component.isSaveButtonDisabled()).toBeTrue();

    component.itemsToDelete = [{id: '99', name: ''}];
    expect(component.isSaveButtonDisabled()).toBeFalse();
  });

  it('add new item', () => {
    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    component.addNewItem();

    expect(component.displayedElementsToSelect.length).toBe(3);
    expect(component.displayedElementsToSelect[2].id).toBeNull();
    expect(component.displayedElementsToSelect[2].name).toEqual('');
    expect(component.itemsToAdd.length).toBe(1);
    expect(component.elementsToSelectInput.length).toBe(2);
    expect(component.names.length).toBe(3);
    expect(component.checked.length).toBe(3);

    component.deleteOne(2, 2);

    expect(component.displayedElementsToSelect.length).toBe(2);
    expect(component.itemsToAdd.length).toBe(0);
    expect(component.elementsToSelectInput.length).toBe(2);
    expect(component.names.length).toBe(2);
    expect(component.checked.length).toBe(2);
  });

  it('elems is not empty', () => {
    expect(component.elementsIsNotEmpty()).toBeUndefined();

    component.elementsToSelectInput = testInput;
    component.ngOnInit();

    expect(component.elementsIsNotEmpty()).toBeTrue();
  });
});
