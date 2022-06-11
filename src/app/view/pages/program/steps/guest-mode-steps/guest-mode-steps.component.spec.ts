import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GuestModeStepsComponent} from './guest-mode-steps.component';

describe('GuestModeStepsComponent', () => {
  let component: GuestModeStepsComponent;
  let fixture: ComponentFixture<GuestModeStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuestModeStepsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestModeStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
