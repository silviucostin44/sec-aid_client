import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import ro from 'src/assets/text/ro.json';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  text = ro;

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
