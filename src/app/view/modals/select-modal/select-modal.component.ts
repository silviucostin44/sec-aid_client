import {Component, OnInit} from '@angular/core';
import ro from '../../../../assets/text/ro.json';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {faPlusSquare, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {Router} from '@angular/router';
import {noop, Observable, Subject} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {QuestionnaireService} from '../../../services/questionnaire.service';
import QuestionnaireHelper from '../../../helpers/questionnaire.helper';
import {QuestionnaireServer} from '../../../models/server-api/questionnaire-server';
import {ProgramService} from '../../../services/program.service';
import ProgramHelper from '../../../helpers/program.helper';
import {Program} from '../../../models/program.model';

export interface SelectableElement {
  id: string;
  name: string;
  index?: number;
}

export interface SelectingOutput {
  itemsToAdd: QuestionnaireServer[] | Program[];
  itemsToEdit: QuestionnaireServer[] | Program[];
  itemsToDelete: QuestionnaireServer[] | Program[];
}

export enum SelectType {
  QUESTIONNAIRE = 'questionnaire',
  PROGRAM = 'program'
}

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit {
  readonly text = ro;
  readonly deleteIcon = faTrashAlt;
  readonly plusIcon = faPlusSquare;

  // input fields
  objectNameInput: string;
  typeInput: SelectType;
  elementsToSelectInput: SelectableElement[];

  responseEmitter: Subject<SelectingOutput> = new Subject();

  displayedElementsToSelect: SelectableElement[];
  editingState: boolean = false;
  allSelected: boolean = false;
  someSelected: boolean = false;
  checked = this.fb.array([]);
  names = this.fb.array([]);
  itemsToDelete: SelectableElement[] = [];
  itemsToAdd: SelectableElement[] = [];
  duplicateName: boolean;

  constructor(private bsModalRef: BsModalRef,
              private router: Router,
              private fb: FormBuilder,
              private questService: QuestionnaireService,
              private programService: ProgramService) {
  }

  ngOnInit(): void {
    this.initFormArrays();

    this.displayedElementsToSelect = Object.assign([], this.elementsToSelectInput);

    this.checked.valueChanges.subscribe((values) => {
      const checkedNo = values.filter((value) => value).length;
      if (values.length > 0 && checkedNo === values.length) {
        this.allSelected = true;
        this.someSelected = true;
      } else if (checkedNo > 0) {
        this.someSelected = true;
        this.allSelected = false;
      } else {
        this.allSelected = false;
        this.someSelected = false;
      }
    });

    this.names.valueChanges.subscribe((values) => {
      this.duplicateName = false;
      for (let i = 0; i < values.length - 1; i++) {
        for (let j = i + 1; j < values.length; j++) {
          if (values[i] === values[j]) {
            this.duplicateName = true;
          }
        }
      }
    });
  }

  closeModalHandler(): void {
    this.bsModalRef.hide();
  }

  actionButtonText(): string {
    return this.editingState ? this.text.MODAL.SAVE : this.text.MODAL.EDIT;
  }

  editOrSave(): void {
    if (this.editingState) {
      // save action
      const itemsToEdit = [];
      // check for name changes
      for (let displayedItem of this.displayedElementsToSelect) {
        if (this.names.at(displayedItem.index).dirty) {
          // update item name with the one form form control
          displayedItem.name = this.names.at(displayedItem.index).value;
          // null id means item has just been added
          if (displayedItem.id !== null) {
            itemsToEdit.push(displayedItem);
          }
        }
      }
      this.save(itemsToEdit).subscribe((selectableElemsInput) => {
        this.elementsToSelectInput = selectableElemsInput;
        this.resetForm();
        this.names.clear();
        this.checked.clear();
        this.initFormArrays();
      });
    } else {
      // edit action
      this.names.enable();
    }
    this.editingState = !this.editingState;
  }

  cancelEditing(): void {
    // resetting form arrays
    this.checked = this.fb.array([]);
    this.names = this.fb.array([]);
    this.initFormArrays();
    this.resetForm();
    this.editingState = false;
  }

  resetForm(): void {
    this.names.disable();
    this.displayedElementsToSelect = Object.assign([], this.elementsToSelectInput);
    this.itemsToDelete = [];
    this.itemsToAdd = [];
    this.allSelected = false;
    this.someSelected = false;
  }

  selectAll(): void {
    if (this.allSelected) {
      for (let checkControl of this.checked.controls) {
        checkControl.setValue(false);
      }
    } else {
      for (let checkControl of this.checked.controls) {
        checkControl.setValue(true);
      }
    }
    this.allSelected = !this.allSelected;
  }

  startById(id: string): void {
    if (!this.editingState) {
      this.closeModalHandler();
      this.router.navigate([`/${this.typeInput}/${id}`])
        .then(_ => noop());
    }
  }

  deleteOne(globalIndex: number, currentDisplayIndex: number): void {
    if (this.displayedElementsToSelect[currentDisplayIndex].id === null) {
      // remove an added item
      this.names.removeAt(globalIndex);
      this.checked.removeAt(globalIndex);
      let itemsToAddIndex = 0;
      for (let itemToAdd of this.itemsToAdd) {
        if (itemToAdd.index === globalIndex) {
          break;
        }
        itemsToAddIndex++;
      }
      this.itemsToAdd.splice(itemsToAddIndex, 1);
    } else {
      this.itemsToDelete.push(this.displayedElementsToSelect[currentDisplayIndex]);
      this.checked.at(globalIndex).setValue(false);
    }

    this.displayedElementsToSelect.splice(currentDisplayIndex, 1);
  }

  deleteSelected(): void {
    let globalIndex = 0;
    for (let checkedControl of this.checked.controls) {
      if (checkedControl.value) {
        for (let displayIndex = 0; displayIndex < this.displayedElementsToSelect.length; displayIndex++) {
          if (this.displayedElementsToSelect[displayIndex].index === globalIndex) {
            this.deleteOne(globalIndex, displayIndex);
          }
        }
      }
      globalIndex++;
    }
  }

  isSaveButtonDisabled(): boolean {
    return (this.editingState && this.itemsToDelete.length === 0 && (this.names.pristine || this.names.invalid)) || this.duplicateName;
  }

  addNewItem(): void {
    // add control form
    const index = this.elementsToSelectInput.length + this.itemsToAdd.length;
    this.checked.push(this.fb.control(false));
    this.names.push(this.fb.control('', Validators.required));
    // add as temporary item
    const newItem: SelectableElement = {
      id: null,
      name: '',
      index: index
    };
    this.displayedElementsToSelect.push(newItem);
    this.itemsToAdd.push(newItem);
  }

  elementsIsNotEmpty(): boolean {
    return this.elementsToSelectInput && this.elementsToSelectInput.length > 0;
  }

  private initFormArrays() {
    for (let i = 0; i < this.elementsToSelectInput.length; i++) {
      // save index into each element to ease control form usage
      this.elementsToSelectInput[i].index = i;
      const checkedControl = this.fb.control(false);
      const nameControl = this.fb.control({value: this.elementsToSelectInput[i].name, disabled: !this.editingState}, Validators.required);
      this.checked.push(checkedControl);
      this.names.push(nameControl);
    }
  }

  private save(itemsToEdit: SelectableElement[]): Observable<SelectableElement[]> {
    if (this.typeInput === SelectType.QUESTIONNAIRE) {
      const output: SelectingOutput = {
        itemsToAdd: QuestionnaireHelper.buildQuestionnaireServerListFromSelectableElems(this.itemsToAdd),
        itemsToEdit: QuestionnaireHelper.buildQuestionnaireServerListFromSelectableElems(itemsToEdit),
        itemsToDelete: QuestionnaireHelper.buildQuestionnaireServerListFromSelectableElems(this.itemsToDelete)
      };
      return this.questService.manageQuestionnaires(output);
    } else if (this.typeInput === SelectType.PROGRAM) {
      const output: SelectingOutput = {
        itemsToAdd: ProgramHelper.buildProgramListFromSelectableElems(this.itemsToAdd),
        itemsToEdit: ProgramHelper.buildProgramListFromSelectableElems(itemsToEdit),
        itemsToDelete: ProgramHelper.buildProgramListFromSelectableElems(this.itemsToDelete)
      };
      return this.programService.manageProgram(output);
    }
    throw new Error('Invalid argument input type: ' + this.typeInput);
  }
}
