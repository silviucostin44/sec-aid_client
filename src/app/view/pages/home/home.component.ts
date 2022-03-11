import {Component, OnInit} from '@angular/core';
import ro from 'src/assets/text/ro.json';
import {BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {AuthModalComponent} from '../../modals/auth-modal/auth-modal.component';
import {RegisterModalComponent} from '../../modals/register-modal/register-modal.component';
import {IeService} from '../../../services/ie.service';
import {UploadDownloadService} from '../../../services/upload-download.service';
import {FileService} from '../../../services/file.service';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {SelectableElement, SelectModalComponent, SelectType} from '../../modals/select-modal/select-modal.component';

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

  openAuthModal(): void {
    this.modalService.show(AuthModalComponent, {class: 'modal-dialog-centered'});
  }

  openRegisterModal(): void {
    this.modalService.show(RegisterModalComponent, {class: 'modal-dialog-centered'});
  }

  uploadProgramImportFile(): void {
    this.uploadService.openUploadModal(this.ieService.getProgramImportUrl(), this.text.PROGRAM, false, true)
      .subscribe((response) => response ? this.router.navigate([`/program/0`]) : noop(),
        () => console.log('Program import failed.'));
  }

  uploadQuestionnaireImportFile(): void {
    this.uploadService.openUploadModal(this.ieService.getQuestionnaireImportUrl(), this.text.QUESTIONNAIRE, false, true)
      .subscribe((questionnaire) => questionnaire ? this.router.navigate([`/questionnaire/0`], {state: {questionnaire: questionnaire}}) : noop(),
        () => console.log('Questionnaire import failed.'));
  }

  selectProgram(): void {
    this.openSelectModal(SelectType.PROGRAM);
  }

  selectQuestionnaire(): void {
    this.openSelectModal(SelectType.QUESTIONNAIRE);
  }

  private openSelectModal(type: SelectType): void {
    const initialState: ModalOptions = {
      initialState: {
        objectNameInput: this.text[type.toUpperCase()],
        type: type,
        elementsToSelectInput: [
          {
            id: '1',
            name: 'First item'
          },
          {
            id: '2',
            name: 'Second item'
          }
        ] as SelectableElement[]
      } as Object,
      class: 'modal-dialog-centered'
    };
    this.modalService.show(SelectModalComponent, initialState);
  }
}

