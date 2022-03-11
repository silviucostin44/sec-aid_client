import {Component, OnInit} from '@angular/core';
import ro from '../../../../assets/text/ro.json';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {faPlusSquare, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';

export interface SelectableElement {
  id: string;
  name: string;
  index?: number;
}

export enum SelectingAction {
  EDIT,
  DELETE,
  ADD
}

export interface SelectingOutput {  // todo: delete if now used
  elements: SelectableElement[];
  action: SelectingAction;
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

  objectNameInput: string;
  type: SelectType;
  elementsToSelectInput: SelectableElement[];

  displayedElementsToSelect: SelectableElement[];
  editingState: boolean = false;
  allSelected: boolean = false;
  someSelected: boolean = false;
  checked = this.fb.array([]);
  names = this.fb.array([]);
  itemsToDelete: SelectableElement[] = [];
  itemsToAdd: SelectableElement[] = [];

  constructor(private bsModalRef: BsModalRef,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initFormArrays();

    this.displayedElementsToSelect = Object.assign([], this.elementsToSelectInput);

    this.checked.valueChanges.subscribe((values) => {
      const checkedNo = values.filter((value) => value).length;
      if (checkedNo === values.length) {
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
      for (let displayedItem of this.displayedElementsToSelect) {
        if (this.names.at(displayedItem.index).dirty) {
          displayedItem.name = this.names.at(displayedItem.index).value;
          itemsToEdit.push(displayedItem);
        }
      }
      // todo: save
      // todo: update on db and back here
      console.log('Items to delete: ', this.itemsToDelete);
      console.log('Items to edit: ', itemsToEdit);
      console.log('Items to add: ', this.itemsToAdd);

      this.resetForm();
      this.names.clear();
      this.names.clear();
      this.initFormArrays();
    } else {
      // edit action
      this.names.enable();
    }
    this.editingState = !this.editingState;
  }

  cancelEditing(): void {
    let i = 0;
    for (let nameControl of this.names.controls) {
      nameControl.setValue(this.elementsToSelectInput[i].name);
      i++;
    }
    this.checked.reset();
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
      this.router.navigate([`/${this.type}/${id}`])
        .then(_ => noop());
    }
  }

  deleteOne(index: number): void {
    if (this.displayedElementsToSelect[index].id === null) {
      // remove an added item
      this.names.removeAt(index);
      this.checked.removeAt(index);
      let itemsToAddIndex = 0;
      for (let itemToAdd of this.itemsToAdd) {
        if (itemToAdd.index === index) {
          break;
        }
        itemsToAddIndex++;
      }
      this.itemsToAdd.splice(itemsToAddIndex, 1);
    } else {
      this.itemsToDelete.push(this.displayedElementsToSelect[index]);
      this.checked.at(index).setValue(false);
    }
    for (let i = 0; i < this.displayedElementsToSelect.length; i++) {
      if (this.displayedElementsToSelect[i].index === index) {
        this.displayedElementsToSelect.splice(i, 1);
      }
    }
  }

  deleteSelected(): void {
    let i = 0;
    for (let checkedControl of this.checked.controls) {
      if (checkedControl.value) {
        this.deleteOne(i);
      }
      i++;
    }
  }

  isSaveButtonDisabled(): boolean {
    return this.editingState && this.itemsToDelete.length === 0 && (this.names.pristine || this.names.invalid);
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
}
