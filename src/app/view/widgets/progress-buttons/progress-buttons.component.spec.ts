import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressButonsComponent} from './progress-buttons.component';

describe('ProgressButonsComponent', () => {
  let component: ProgressButonsComponent;
  let fixture: ComponentFixture<ProgressButonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressButonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressButonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
