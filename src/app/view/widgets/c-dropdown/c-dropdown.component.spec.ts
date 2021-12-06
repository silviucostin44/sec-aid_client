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
});
