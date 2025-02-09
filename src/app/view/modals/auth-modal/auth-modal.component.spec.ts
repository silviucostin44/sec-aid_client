import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AuthModalComponent} from './auth-modal.component';
import {ActivatedRoute} from '@angular/router';
import {MockActivatedRoute} from '../../../../../test/mocks';
import {SecurityService} from '../../../services/security.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {of, throwError} from 'rxjs';
import {ServerErrors} from '../../../constants/server-errors';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let securityServiceSpy: jasmine.SpyObj<SecurityService>;
  let modalRefSpy: jasmine.SpyObj<BsModalRef>;

  beforeEach(() => {
    const securitySpy = jasmine.createSpyObj('SecurityService', ['login']);
    const modalSpy = jasmine.createSpyObj('BsModalRef', ['hide']);

    TestBed.configureTestingModule({
      providers: [
        AuthModalComponent,
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: SecurityService, useValue: securitySpy},
        {provide: BsModalRef, useValue: modalSpy},
      ]
    });
    component = TestBed.inject(AuthModalComponent);
    securityServiceSpy = TestBed.inject(SecurityService) as jasmine.SpyObj<SecurityService>;
    modalRefSpy = TestBed.inject(BsModalRef) as jasmine.SpyObj<BsModalRef>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit', fakeAsync(() => {
    securityServiceSpy.login.and.returnValue(of({jwtToken: 'token'}));
    const hideSpy = modalRefSpy.hide.and.returnValue();
    component.authForm = new NgForm([], []);

    component.onSubmit();
    tick();

    expect(hideSpy.calls.count()).toBe(1);
  }));

  it('submit error', fakeAsync(() => {
    securityServiceSpy.login.and.returnValue(throwError(new HttpErrorResponse({
      error: {
        jwtToken: ServerErrors.BAD_CREDENTIALS
      }
    })));
    const hideSpy = modalRefSpy.hide.and.returnValue();

    component.onSubmit();
    tick();

    expect(hideSpy.calls.count()).toBe(0);
    expect(component.badCredentials).toBeTrue();
  }));

  it('submit other error', fakeAsync(() => {
    securityServiceSpy.login.and.returnValue(throwError(new HttpErrorResponse({
      error: {
        jwtToken: 'other'
      }
    })));
    const hideSpy = modalRefSpy.hide.and.returnValue();

    component.onSubmit();
    tick();

    expect(hideSpy.calls.count()).toBe(0);
    expect(component.badCredentials).toBeUndefined();
  }));
});
