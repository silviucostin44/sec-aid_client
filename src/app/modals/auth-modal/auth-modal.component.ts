import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {

  @ViewChild('authForm', {static: true}) authForm: NgForm;

  email: string;
  password: string;

  constructor() {
  }

  onSubmit() {
    // todo: auth form submission
  }

  closeModal() {
    this.authForm.form.reset();
  }
}
