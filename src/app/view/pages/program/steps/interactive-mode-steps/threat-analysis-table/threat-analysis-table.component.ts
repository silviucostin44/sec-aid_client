import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import ro from '../../../../../../../assets/text/ro.json';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {CellClickEvent, GridComponent} from '@progress/kendo-angular-grid';
import {ColumnSetting} from '../../../../../widgets/table/table.component';
import {threatAnalysisColumns} from '../../../../../../constants/program-tables-configs';
import {AssetAttributes} from '../../../../../../models/asset-attributes.model';

@Component({
  selector: 'threat-analysis-table',
  templateUrl: './threat-analysis-table.component.html',
})
export class ThreatAnalysisTableComponent implements OnInit {
  readonly text = ro.PROGRAM;
  readonly deleteIcon = faTrashAlt;

  formGroup: FormGroup;
  columns: ColumnSetting[];
  editedRowIndex: number;
  @Input() view: any[];
  @Output() viewChange = new EventEmitter();
  @ViewChild(GridComponent) private grid: GridComponent;

  constructor() {
  }

  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined;
  }

  ngOnInit(): void {
    this.columns = threatAnalysisColumns;
  }

  editHandler({sender, columnIndex, rowIndex, dataItem}: CellClickEvent): void {
    if ((this.formGroup && !this.formGroup.valid)
      || rowIndex < 0
      || rowIndex === this.editedRowIndex) {
      return;
    }

    this.saveRow();
    this.editedRowIndex = rowIndex;
    this.formGroup = this.generateFormGroup(dataItem);

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

  addAttribute(rowIndex: number, columnIndex: number, columnField: string): void {
    if (this.formGroup) {
      // if form group is already defined just add a new attribute control
      (this.formGroup.get(columnField) as FormArray).push(new FormControl(''));
    } else {
      // if form group is not defined generate it by view row and adding the new attribute
      this.formGroup = this.generateFormGroup(this.view[rowIndex]);
      (this.formGroup.get(columnField) as FormArray).push(new FormControl(''));
      // then activate the row editing
      this.editedRowIndex = rowIndex;
      this.grid.editRow(rowIndex, this.formGroup, {columnIndex: columnIndex});
    }
  }

  deleteItem(index: number, columnField: string): void {
    (this.formGroup.get(columnField) as FormArray).removeAt(index);
    this.view[this.editedRowIndex][columnField].splice(index, 1);
  }

  private generateFormGroup(dataItem: any): FormGroup {
    const regulationsControls = dataItem.regulations.map((dataItem) => new FormControl(dataItem.description));
    const vulnerabilitiesControls = dataItem.vulnerabilities.map((dataItem) => new FormControl(dataItem.description));
    const threatsControls = dataItem.threats.map((dataItem) => new FormControl(dataItem.description));
    return new FormGroup({
      regulations: new FormArray(regulationsControls),
      vulnerabilities: new FormArray(vulnerabilitiesControls),
      threats: new FormArray(threatsControls),
    });
  };

  private closeEditor(grid: GridComponent, rowIndex: number = this.editedRowIndex): void {
    if (grid) {
      grid.closeRow(rowIndex);
    }
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private saveRow(): void {
    if (this.isInEditingMode) {
      for (let key of Object.keys(this.formGroup.value)) {
        for (let i = 0; i < this.formGroup.value[key].length; i++) {
          // if new asset attributes were added, create associated objects
          if (i >= this.view[this.editedRowIndex][key].length) {
            this.view[this.editedRowIndex][key].push(new AssetAttributes(this.view[this.editedRowIndex].id));
          }
          this.view[this.editedRowIndex][key][i].description = this.formGroup.value[key][i];
        }
      }
      this.viewChange.emit(this.view);
    }
    this.closeEditor(this.grid);
  }
}
