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
import {SecurityService} from '../../../services/security.service';
import QuestionnaireHelper from '../../../helpers/questionnaire.helper';
import {QuestionnaireService} from '../../../services/questionnaire.service';
import {ElementStartEnum} from '../../../models/enums/element-start.enum';
import {ProgramService} from '../../../services/program.service';
import ProgramHelper from '../../../helpers/program.helper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly text = ro.HOME;

  readonly new = ElementStartEnum.NEW;

  isSignedIn: boolean;

  constructor(private modalService: BsModalService,
              private router: Router,
              private ieService: IeService,
              private uploadService: UploadDownloadService,
              private fileService: FileService,
              private securityService: SecurityService,
              private questService: QuestionnaireService,
              private programService: ProgramService) {
  }

  ngOnInit(): void {
    this.fileService.resetSessionDb();
    this.checkAuthStatus();
  }

  openAuthModal(): void {
    this.modalService.show(AuthModalComponent, {class: 'modal-dialog-centered'});
  }

  openRegisterModal(): void {
    this.modalService.show(RegisterModalComponent, {class: 'modal-dialog-centered'});
  }

  uploadProgramImportFile(): void {
    this.uploadService.openUploadModal(this.ieService.getProgramImportUrl(), this.text.PROGRAM, false, true)
      .subscribe((response) => response ? this.router.navigate([`/program/${ElementStartEnum.IMPORTED}`]) : noop(),
        () => console.log('Program import failed.'));
  }

  uploadQuestionnaireImportFile(): void {
    this.uploadService.openUploadModal(this.ieService.getQuestionnaireImportUrl(), this.text.QUESTIONNAIRE, false, true)
      .subscribe((questionnaire) => questionnaire
          ? this.router.navigate([`/questionnaire/${ElementStartEnum.IMPORTED}`], {state: {defaultQuestionnaire: questionnaire}})
          : noop(),
        () => console.log('Questionnaire import failed.'));
  }

  selectProgram(): void {
    this.programService.getAllPrograms().subscribe((programs) => {
      const selectablePrograms = ProgramHelper.buildSelectableElemsFromProgramList(programs);

      this.openSelectModal(SelectType.PROGRAM, selectablePrograms);
    });
  }

  selectQuestionnaire(): void {
    this.questService.getAllQuestionnaires().subscribe((questionnaires) => {
      const selectableQuests = QuestionnaireHelper.buildSelectableElemsFromQuestionnaireServerList(questionnaires);

      this.openSelectModal(SelectType.QUESTIONNAIRE, selectableQuests);
    });
  }

  private openSelectModal(type: SelectType, inputElements: SelectableElement[]): void {
    const initialState: ModalOptions = {
      initialState: {
        objectNameInput: this.text[type.toUpperCase()],
        typeInput: type,
        elementsToSelectInput: inputElements
      } as Object,
      class: 'modal-dialog-centered'
    };

    this.modalService.show(SelectModalComponent, initialState);
  }

  private checkAuthStatus(): void {
    this.isSignedIn = this.securityService.isSignedIn();

    this.securityService.authEvents.subscribe(() => {
      this.isSignedIn = this.securityService.isSignedIn();
    });
  }
}

