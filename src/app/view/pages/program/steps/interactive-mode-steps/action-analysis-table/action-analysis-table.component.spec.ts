import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActionAnalysisTableComponent} from './action-analysis-table.component';
import {GridComponent} from '@progress/kendo-angular-grid';
import {MockGridComponent} from '../../../../../../../../test/mocks';
import {FormGroup} from '@angular/forms';


describe('ActionAnalysisTableComponent', () => {
  let component: ActionAnalysisTableComponent;
  let fixture: ComponentFixture<ActionAnalysisTableComponent>;
  let gridComponent: GridComponent;
  let dataItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionAnalysisTableComponent],
      providers: [{provide: GridComponent, useClass: MockGridComponent}]
    })
      .compileComponents();
    gridComponent = TestBed.inject(GridComponent);
    dataItem = {
      action: 'a',
      impact: '1',
      implementationLevel: '2',
      riskScore: '5',
      costBenefitIndex: 'cbi',
      priorityCode: 'pc',
      priority: 'p',
    };

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAnalysisTableComponent);
    component = fixture.componentInstance;
    component.profileData = new Map<string, number>();
    component.profileData.set('ID.AM-1', 3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is in editing mode', () => {
    expect(component.isInEditingMode).toBeFalse();
  });

  it('add handler', () => {
    component.addHandler({dataItem: undefined, isNew: false, rowIndex: 0, sender: gridComponent});

    expect(component.isInEditingMode).toBeTrue();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('action').value).toEqual('');
  });

  it('edit handler', () => {
    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 2,
      dataItem: dataItem
    });

    expect(component.isInEditingMode).toBeTrue();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('action').value).toEqual('a');
    expect(component.formGroup.get('costBenefitIndex').value).toEqual('cbi');
    expect(component.formGroup.get('priority').value).toEqual('p');
  });

  it('edit while adding', () => {
    component.view = [];
    component.addHandler({dataItem: undefined, isNew: false, rowIndex: 0, sender: gridComponent});
    component.formGroup = new FormGroup({});
    component.formGroup.value.action = 'a';
    component.formGroup.value.costBenefitIndex = 'cbi';
    component.formGroup.value.priority = 'p';
    component.formGroup.value.subcategory = 'ID.AM-1';

    component.editHandler({
      column: undefined, isEdited: false, originalEvent: undefined, type: undefined,
      sender: gridComponent, columnIndex: 0, rowIndex: 2,
      dataItem: dataItem
    });

    expect(component.formGroup.get('action').value).toEqual('a');
    expect(component.formGroup.get('costBenefitIndex').value).toEqual('cbi');
    expect(component.formGroup.get('priority').value).toEqual('p');
  });

  it('save current', () => {
    component.view = [];
    component.addHandler({dataItem: dataItem, isNew: true, rowIndex: 0, sender: gridComponent});
    component.formGroup.get('subcategory').setValue('ID.AM-1');
    component.formGroup.get('action').setValue('a');

    expect(component.isInEditingMode).toBeTrue();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.valid).toBeTrue();
    component.saveCurrent();
    expect(component.isInEditingMode).toBeFalse();
    expect(component.view.length).toBe(1);
  });

  it('deleteRow', () => {
    expect(component.isInEditingMode).toBeFalse();
  });

  it('is current row new', () => {
    expect(component.isCurrentRowNew(1)).toBeFalse();
    expect(component.isCurrentRowNew(-1)).toBeTrue();
  });
});
