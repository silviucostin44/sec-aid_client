import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ColumnSetting, TableComponent} from './table.component';
import {GridComponent} from '@progress/kendo-angular-grid';
import {MockGridComponent} from '../../../../../test/mocks';
import {FormGroup} from '@angular/forms';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let gridComponent: GridComponent;

  const columns: ColumnSetting[] = [
    {
      field: 'f1',
      title: 't1',
      editable: false
    },
    {
      field: 'f2',
      title: 't2',
      editable: false
    }
  ];
  let dataItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [{provide: GridComponent, useClass: MockGridComponent}]
    })
      .compileComponents();
    gridComponent = TestBed.inject(GridComponent);
    dataItem = {
      f1: 'f1',
      f2: 'f2'
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is in editing mode', () => {
    expect(component.isInEditingMode).toBeFalse();
  });

  it('add handler', () => {
    component.columns = columns;
    component.addHandler({dataItem: undefined, isNew: false, rowIndex: 0, sender: gridComponent});

    expect(component.isInEditingMode).toBeTrue();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('f1').value).toBeNull();
  });

  it('edit handler', () => {
    component.columns = columns;
    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 2,
      dataItem: dataItem
    });

    expect(component.isInEditingMode).toBeTrue();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('f1').value).toEqual('f1');
    expect(component.formGroup.get('f2').value).toEqual('f2');
  });

  it('edit while adding', () => {
    component.columns = columns;
    component.view = [];
    component.addHandler({dataItem: undefined, isNew: false, rowIndex: 0, sender: gridComponent});
    component.formGroup = new FormGroup({});
    component.formGroup.value.fi = 'f1';
    component.formGroup.value.f2 = 'f2';

    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 2,
      dataItem: dataItem
    });

    expect(component.formGroup.get('f1').value).toEqual('f1');
    expect(component.formGroup.get('f1').value).toEqual('f1');
  });

  it('save current', () => {
    component.columns = columns;
    component.view = [];
    component.addHandler({dataItem: dataItem, isNew: true, rowIndex: 0, sender: gridComponent});

    component.saveCurrent();
    expect(component.isInEditingMode).toBeFalse();
    expect(component.view.length).toBe(1);
  });

  it('save current editing', () => {
    component.columns = columns;
    component.view = [dataItem];
    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 0,
      dataItem: {
        f1: 'f11',
        f2: 'f22'
      }
    });

    component.saveCurrent();
    expect(component.isInEditingMode).toBeFalse();
    expect(component.view.length).toBe(1);
    expect(component.view[0].f1).toEqual('f11');
    expect(component.view[0].f2).toEqual('f22');
  });

  it('deleteRow', () => {
    expect(component.isInEditingMode).toBeFalse();
  });

  it('is current row new', () => {
    expect(component.isCurrentRowNew(1)).toBeFalse();
    expect(component.isCurrentRowNew(-1)).toBeTrue();
  });
});
