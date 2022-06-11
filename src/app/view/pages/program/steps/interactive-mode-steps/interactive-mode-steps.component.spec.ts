import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InteractiveModeStepsComponent} from './interactive-mode-steps.component';

describe('InteractiveModeStepsComponent', () => {
  let component: InteractiveModeStepsComponent;
  let fixture: ComponentFixture<InteractiveModeStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InteractiveModeStepsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveModeStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
