import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddEvent, CellClickEvent, GridComponent, SortSettings} from '@progress/kendo-angular-grid';
import {ColumnSetting} from '../../../../../widgets/table/table.component';
import {ProfileTemplate} from '../../../../../../constants/profile-template';
import {actionAnalysisColumns} from '../../../../../../constants/program-tables-configs';
import ro from '../../../../../../../assets/text/ro.json';
import {orderBy, SortDescriptor} from '@progress/kendo-data-query';
import {RISK_SCORE_FUNCTION} from '../../../../../../constants/global-constants';

@Component({
  selector: 'action-analysis-grid',
  templateUrl: './action-analysis-table.component.html',
})
export class ActionAnalysisTableComponent implements OnChanges {
  readonly text = ro.PROGRAM;
  readonly deleteIcon = faTrashAlt;

  formGroup: FormGroup;
  tableSortable: SortSettings = {
    allowUnsort: true,
    mode: 'multiple'
  };
  columns: ColumnSetting[];
  subcategoryOptions: string[];
  sortDescriptors: SortDescriptor[] = [];
  @Input() view: any[];
  @Output() viewChange = new EventEmitter();
  @Input() profileData: Map<string, number>;
  @ViewChild(GridComponent) private grid: GridComponent;
  private editedRowIndex: number;
  private isNew = false;

  constructor() {
    this.columns = actionAnalysisColumns;
  }

  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterSubcategoryOptions(changes.view.currentValue);
  }

  addHandler({sender}: AddEvent): void {
    this.closeEditor(sender);

    this.formGroup = this.generateFormGroup({
      subcategory: '',
      action: '',
      costBenefitIndex: 0,
      priority: 0
    });

    this.isNew = true;
    sender.addRow(this.formGroup);
  }

  editHandler({sender, columnIndex, rowIndex, dataItem}: CellClickEvent): void {
    if ((this.formGroup && !this.formGroup.valid) || rowIndex < 0) {
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
    this.filterSubcategoryOptions(this.view);
  }

  isCurrentRowNew(rowIndex: number): boolean {
    return rowIndex < 0;
  }

  subcategoryChange() {
    const index = this.editedRowIndex ? this.editedRowIndex : this.view.length - 1;
    const currentViewRow = this.view[index];
    currentViewRow.impact = ProfileTemplate[currentViewRow.subcategory].impactRate;
    currentViewRow.priorityCode = ProfileTemplate[currentViewRow.subcategory].priorityCode;
    currentViewRow.implementationLevel = this.profileData.get(currentViewRow.subcategory);
    currentViewRow.riskScore = RISK_SCORE_FUNCTION(currentViewRow.implementationLevel, currentViewRow.impact);

    this.filterSubcategoryOptions(this.view);
  }

  sortChange(descriptors: Array<SortDescriptor>): void {
    this.sortDescriptors = descriptors;
    this.view = orderBy(this.view, this.sortDescriptors);
  }

  private generateFormGroup(dataItem: any): FormGroup {
    return new FormGroup({
      subcategory: new FormControl(dataItem.subcategory, Validators.required),
      action: new FormControl(dataItem.action, Validators.required),
      costBenefitIndex: new FormControl(dataItem.costBenefitIndex),
      priority: new FormControl(dataItem.priority),
    });
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
        this.view.push(this.formGroup.value);
      } else {
        // edit existing
        for (let key of Object.keys(this.formGroup.value)) {
          this.view[this.editedRowIndex][key] = this.formGroup.value[key];
        }
      }
      this.subcategoryChange();
      this.viewChange.emit(this.view);
    }

    this.closeEditor(this.grid);
  }

  private filterSubcategoryOptions(view: any[]): void {
    this.subcategoryOptions = Object.keys(ProfileTemplate).filter((key) => {
      for (let viewObject of view) {
        if (viewObject.subcategory === key) {
          return false;
        }
      }
      return true;
    });
  }
}
