import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {AccountToolComponent} from './account-tool.component';
import {SecurityService} from '../../../services/security.service';
import {MockSecurityService} from '../../../../../test/mocks';

describe('AccountToolComponent', () => {
  let component: AccountToolComponent;
  let fixture: ComponentFixture<AccountToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountToolComponent],
      providers: [{provide: SecurityService, useClass: MockSecurityService}]
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

  it('username', () => {
    expect(component.username).toEqual('username');
  });

  it('logout', fakeAsync(() => {
    expect(component.username).toEqual('username');

    component.logout();
    expect(component.username).toEqual('username');
  }));
});
