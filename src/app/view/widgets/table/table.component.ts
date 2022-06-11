import {Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup} from '@angular/forms';
import {AddEvent, CellClickEvent, GridComponent} from '@progress/kendo-angular-grid';
import ProgramHelper from '../../../helpers/program.helper';
import {ProfileTemplate} from '../../../constants/profile-template';

export interface ColumnSetting {
  field: string;
  title: string;
  editable: boolean;
  editor?: FieldType;
}

export type FieldType = 'text' | 'numeric' | 'boolean' | 'date';

@Component({
  selector: 'widget-grid',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  readonly deleteIcon = faTrashAlt;

  formGroup: FormGroup;
  @Input() columns: ColumnSetting[];
  @Input() columnFieldsValidators: any;
  @Input() canAddRows: boolean = true;
  @Input() canDeleteRows: boolean = true;
  @Input() equations: ((_: FormGroup) => void)[] = [];
  @Input() view: unknown[];
  @Output() viewChange = new EventEmitter();
  subcategoryOptions: string[] = Object.keys(ProfileTemplate);
  @ViewChild(GridComponent) private grid: GridComponent;
  private editedRowIndex: number;
  private isNew = false;

  constructor(private renderer: Renderer2) {
    // this.renderer.listen('document', 'click', ({target}) => {
    //   if (!this.isChildOf(target, 'k-grid')) {
    //     this.saveCurrent();
    //   }
    // });
  }

  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }

  ngOnInit(): void {
  }

  addHandler({sender}: AddEvent): void {
    this.closeEditor(sender);

    this.formGroup = this.generateDefaultFormGroup();

    this.isNew = true;
    sender.addRow(this.formGroup);
  }

  editHandler({sender, columnIndex, rowIndex, dataItem}: CellClickEvent): void {
    if (this.formGroup && !this.formGroup.valid) {
      return;
    }

    this.saveRow();
    this.formGroup = this.generateFormGroup(dataItem);
    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup, {columnIndex});
  }

  cancelHandler(): void {
    this.closeEditor(this.grid, this.editedRowIndex);
  }

  saveCurrent(): void {
    if (this.formGroup && !this.formGroup.valid) {
      return;
    }

    this.saveRow();
  }

  deleteRow(rowIndex: number): void {
    this.view.splice(rowIndex, 1);
    this.viewChange.emit(this.view);
  }

  isCurrentRowNew(rowIndex: number): boolean {
    return rowIndex < 0;
  }

  private generateFormGroup(itemData: any): FormGroup {
    const formGroupControls = {};
    for (let key of Object.keys(itemData)) {
      formGroupControls[key] = new FormControl(itemData[key],
        this.columnFieldsValidators ? this.columnFieldsValidators[key] : null);
    }
    return new FormGroup(formGroupControls);
  };

  private generateDefaultFormGroup(): FormGroup {
    const defaultItemData = {};

    for (let column of this.columns) {
      defaultItemData[column.field] = ProgramHelper.getFormControlDefaultValue(column.editor);
    }

    return this.generateFormGroup(defaultItemData);
  }

  private hasClass = (el, className) => new RegExp(className).test(el.className);

  private isChildOf = (el, className) => {
    while (el && el.parentElement) {
      if (this.hasClass(el.parentElement, className)) {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  };

  private closeEditor(grid: GridComponent, rowIndex: number = this.editedRowIndex): void {
    this.isNew = false;
    if (grid) {
      grid.closeRow(rowIndex);
    }
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private saveRow(): void {
    if (this.isInEditingMode) {
      if (this.isNew) {
        // add new
        this.applyEquations();
        this.view.push(this.formGroup.value);
      } else {
        // edit existing
        this.applyEquations();
        for (let key of Object.keys(this.formGroup.value)) {
          this.view[this.editedRowIndex][key] = this.formGroup.value[key];
        }
      }
      this.viewChange.emit(this.view);
    }

    this.closeEditor(this.grid);
  }

  private applyEquations(): void {
    for (let equation of this.equations) {
      equation(this.formGroup);
    }
  }
}
