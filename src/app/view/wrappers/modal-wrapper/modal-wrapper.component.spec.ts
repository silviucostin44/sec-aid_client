import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalWrapperComponent} from './modal-wrapper.component';

describe('ModalWrapperComponent', () => {
  let component: ModalWrapperComponent;
  let fixture: ComponentFixture<ModalWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close', () => {
    component.closeModalEvent.subscribe(() => expect().nothing());
    component.close();
  });
});
