import {Component, OnInit} from '@angular/core';
import ro from 'src/assets/text/ro.json';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthModalComponent} from '../../modals/auth-modal/auth-modal.component';
import {RegisterModalComponent} from '../../modals/register-modal/register-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  text = ro.HOME;

  questionnaireId = '0';
  programId = '0';

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  openAuthModal() {
    this.modalService.show(AuthModalComponent, {class: 'modal-dialog-centered'});
  }

  openRegisterModal() {
    this.modalService.show(RegisterModalComponent, {class: 'modal-dialog-centered'});
  }
}

