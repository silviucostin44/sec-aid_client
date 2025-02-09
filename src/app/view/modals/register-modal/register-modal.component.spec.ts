import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {RegisterModalComponent} from './register-modal.component';
import {SecurityService} from '../../../services/security.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MockActivatedRoute} from '../../../../../test/mocks';
import {ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ServerErrors} from '../../../constants/server-errors';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fb: FormBuilder;
  let securityServiceSpy: jasmine.SpyObj<SecurityService>;
  let modalRefSpy: jasmine.SpyObj<BsModalRef>;

  beforeEach(() => {
    const securitySpy = jasmine.createSpyObj('SecurityService', ['register']);
    const modalSpy = jasmine.createSpyObj('BsModalRef', ['hide']);

    TestBed.configureTestingModule({
      providers: [
        RegisterModalComponent,
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: SecurityService, useValue: securitySpy},
        {provide: BsModalRef, useValue: modalSpy},
        {provide: FormBuilder, useValue: new FormBuilder()},
      ]
    });
    component = TestBed.inject(RegisterModalComponent);
    fb = TestBed.inject(FormBuilder);
    securityServiceSpy = TestBed.inject(SecurityService) as jasmine.SpyObj<SecurityService>;
    modalRefSpy = TestBed.inject(BsModalRef) as jasmine.SpyObj<BsModalRef>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init', () => {
    expect(component.registerForm.get('email')).toBeInstanceOf(AbstractControl);
    expect(component.registerForm.get('email').validator).toBeDefined();
    expect(component.registerForm.get('password')).toBeInstanceOf(AbstractControl);
    expect(component.registerForm.get('password').validator).toBeDefined();
    expect(component.registerForm.get('confirmPass')).toBeInstanceOf(AbstractControl);
    expect(component.registerForm.get('confirmPass').validator).toBeDefined();
  });

  it('submit', fakeAsync(() => {
    securityServiceSpy.register.and.returnValue(of('ok'));
    const hideSpy = modalRefSpy.hide;

    component.onSubmit();
    tick();

    expect(hideSpy.calls.count()).toBe(1);
    expect(component.registerForm.get('email').value).toBeNull();
  }));

  it('submit error', fakeAsync(() => {
    securityServiceSpy.register.and.returnValue(throwError(new HttpErrorResponse({
      error: {
        message: ServerErrors.EXISTING_ACCOUNT
      }
    })));
    const hideSpy = modalRefSpy.hide.and.returnValue();

    component.onSubmit();
    tick();

    expect(hideSpy.calls.count()).toBe(0);
    expect(component.existingAccountError).toBeTrue();
  }));

  it('submit other error', fakeAsync(() => {
    securityServiceSpy.register.and.returnValue(throwError(new HttpErrorResponse({
      error: {
        message: 'other'
      }
    })));
    const hideSpy = modalRefSpy.hide.and.returnValue();

    component.onSubmit();
    tick();

    expect(hideSpy.calls.count()).toBe(0);
    expect(component.existingAccountError).toBeUndefined();
  }));
});
