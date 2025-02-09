import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThreatAnalysisTableComponent} from './threat-analysis-table.component';
import {GridComponent} from '@progress/kendo-angular-grid';
import {MockGridComponent} from '../../../../../../../../test/mocks';

describe('ThreatAnalysisTableComponent', () => {
  let component: ThreatAnalysisTableComponent;
  let fixture: ComponentFixture<ThreatAnalysisTableComponent>;
  let gridComponent: GridComponent;
  let dataItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThreatAnalysisTableComponent],
      providers: [{provide: GridComponent, useClass: MockGridComponent}]
    })
      .compileComponents();
    gridComponent = TestBed.inject(GridComponent);
    dataItem = {
      type: 't',
      name: 'n',
      regulations: [{description: 'r'}],
      vulnerabilities: [{description: 'v'}],
      threats: [{description: 't'}],
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatAnalysisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init', () => {
    expect(component.columns.length).toBe(5);
  });

  it('is in editing mode', () => {
    expect(component.isInEditingMode).toBeFalse();
  });

  it('edit handler', () => {
    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 2,
      dataItem: dataItem
    });

    expect(component.isInEditingMode).toBeTrue();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('regulations').value[0]).toEqual('r');
    expect(component.formGroup.get('vulnerabilities').value[0]).toEqual('v');
    expect(component.formGroup.get('threats').value[0]).toEqual('t');
  });

  it('save current editing', () => {
    component.view = [dataItem];
    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 0,
      dataItem: {
        type: 't1',
        name: 'n1',
        regulations: [{description: 'r1'}],
        vulnerabilities: [{description: 'v1'}],
        threats: [{description: 't1'}],
      }
    });

    component.saveCurrent();
    expect(component.isInEditingMode).toBeFalse();
    expect(component.view.length).toBe(1);
    expect(component.view[0].type).toEqual('t');
    expect(component.view[0].name).toEqual('n');
    expect(component.view[0].regulations[0].description).toEqual('r1');
    expect(component.view[0].vulnerabilities[0].description).toEqual('v1');
    expect(component.view[0].threats[0].description).toEqual('t1');
  });

  it('deleteRow', () => {
    expect(component.isInEditingMode).toBeFalse();
  });

  it('add attribute', () => {
    component.view = [dataItem];
    component.grid = gridComponent;
    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 0,
      dataItem: dataItem
    });
    component.saveCurrent();

    component.addAttribute(0, 2, 'regulations');

    expect(component.formGroup.get('regulations').value.length).toBe(2);
    expect(component.isInEditingMode).toBeTrue();
  });

  it('add attribute while editing', () => {
    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 0,
      dataItem: dataItem
    });

    component.addAttribute(0, 2, 'regulations');

    expect(component.formGroup.get('regulations').value.length).toBe(2);
  });
});
