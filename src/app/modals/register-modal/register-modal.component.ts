import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {matchingPassValidator} from '../../shared/customValidators';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent {

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('.+@.+\..+')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,24}$')]],
    confirmPass: ['', Validators.required]
  }, {validators: [matchingPassValidator]});

  constructor(private fb: FormBuilder) {
  }

  get passField() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    // todo: auth form submission
  }

  closeModal() {
    this.registerForm.reset();
  }

}
