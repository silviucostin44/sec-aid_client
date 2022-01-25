import {Component, OnInit} from '@angular/core';
import ro from 'src/assets/text/ro.json';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthModalComponent} from '../../modals/auth-modal/auth-modal.component';
import {RegisterModalComponent} from '../../modals/register-modal/register-modal.component';
import {IeService} from '../../../services/ie.service';
import {UploadDownloadService} from '../../../services/upload-download.service';
import {FileService} from '../../../services/file.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  text = ro.HOME;

  questionnaireId = '0';
  programId = '0';

  constructor(private modalService: BsModalService,
              private router: Router,
              private ieService: IeService,
              private uploadService: UploadDownloadService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.fileService.resetSessionDb();
  }

  openAuthModal() {
    this.modalService.show(AuthModalComponent, {class: 'modal-dialog-centered'});
  }

  openRegisterModal() {
    this.modalService.show(RegisterModalComponent, {class: 'modal-dialog-centered'});
  }

  uploadProgramImportFile() {
    this.uploadService.openUploadModal(this.ieService.getProgramImportUrl(), this.text.UPLOAD_IMPORT_PROGRAM_NAME, false, true)
      .subscribe(() => this.router.navigate([`/program/0`]));
  }

  uploadQuestionnaireImportFile() {
    this.uploadService.openUploadModal(this.ieService.getQuestionnaireImportUrl(), this.text.UPLOAD_IMPORT_QUEST_NAME, false, true)
      .subscribe((questionnaire) => this.router.navigate([`/questionnaire/0`], {state: {questionnaire: questionnaire}}));
  }
}

