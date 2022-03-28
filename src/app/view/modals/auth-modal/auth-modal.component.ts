import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import ro from 'src/assets/text/ro.json';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SecurityService} from '../../../services/security.service';

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

  constructor(private bsModalRef: BsModalRef, private securityService: SecurityService) {
  }

  onSubmit() {
    this.securityService.login(this.email, this.password)
      .subscribe(() => this.closeModal());
  }

  closeModal() {
    this.authForm.form.reset();
    this.bsModalRef.hide();
  }
}
