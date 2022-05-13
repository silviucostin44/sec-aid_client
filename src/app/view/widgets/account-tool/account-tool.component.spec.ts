import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountToolComponent} from './account-tool.component';

describe('AccountToolComponent', () => {
  let component: AccountToolComponent;
  let fixture: ComponentFixture<AccountToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountToolComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
