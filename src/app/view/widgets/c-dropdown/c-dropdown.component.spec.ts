import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CDropdownComponent} from './c-dropdown.component';

describe('CDropdownComponent', () => {
  let component: CDropdownComponent;
  let fixture: ComponentFixture<CDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CDropdownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('write value', () => {
    expect(component.selectedOption).toBeUndefined();
    component.writeValue('value');

    expect(component.selectedOption).toEqual('value');
  });

  it('change option', () => {
    component.onChange = () => new Object();
    expect(component.selectedOption).toBeUndefined();
    component.changeSelectedOption('value');

    expect(component.selectedOption).toEqual('value');
  });

  it('get button class', () => {
    expect(component.getButtonClass()).toEqual('btn-outline-primary');
    component.selectedOption = 'value';
    expect(component.getButtonClass()).toEqual('btn-primary');
  });
});
