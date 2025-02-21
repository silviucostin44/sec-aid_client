import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {matchingPassValidator} from '../../../shared/customValidators';
import ro from 'src/assets/text/ro.json';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SecurityService} from '../../../services/security.service';
import {ServerErrors} from '../../../constants/server-errors';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent {
  text = ro;

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('.+@.+\..+')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,24}$')]],
    confirmPass: ['', Validators.required]
  }, {validators: [matchingPassValidator]});
  existingAccountError: boolean;

  constructor(private fb: FormBuilder,
              private bsModalRef: BsModalRef,
              private securityService: SecurityService) {
  }

  get passField() {
    return this.registerForm.get('password');
  }

  onSubmit(): void {
    this.securityService.register(this.registerForm.get('email').value, this.registerForm.get('password').value)
      .subscribe(() => this.closeModal(),
        ((response: HttpErrorResponse) => {
          if (response.error && ServerErrors.EXISTING_ACCOUNT === response.error.message) {
            this.existingAccountError = true;
          }
        }));
  }

  closeModal(): void {
    this.registerForm.reset();
    this.bsModalRef.hide();
  }

}
