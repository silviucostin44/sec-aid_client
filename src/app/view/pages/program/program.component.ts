import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ro from 'src/assets/text/ro.json';
import {FileService} from '../../../services/file.service';
import {TemplateFileEnum} from '../../../models/enums/template-file.enum';
import {UploadedFileEnum} from '../../../models/enums/uploaded-file.enum';
import {BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {UploadModalComponent} from '../../modals/upload-modal/upload-modal.component';
import {DownloadService} from '../../../services/download.service';
import {Observable} from 'rxjs';
import {File} from '../../../models/server-api/file';
import ProgramHelper from '../../../helpers/program.helper';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  text = ro.PROGRAM;

  id: string;
  currentStep: number;
  nextStepEvent = new EventEmitter();
  files: Observable<File[]>;

  constructor(private router: ActivatedRoute,
              private fileService: FileService,
              private modalService: BsModalService,
              private downloadService: DownloadService) {
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.updateStep(0);
  }

  isStepComplete(): boolean {
    // todo program steps: next step
    return true;
  }

  nextStep(): void {
    this.nextStepEvent.emit();
  }

  updateStep(stepIndex: number) {
    this.currentStep = stepIndex + 1;
    // update step files
    this.files = this.fileService.downloadFilesByType(ProgramHelper.getFileTypeFromStep(this.currentStep));
  }

  downloadAssetInventoryTemplate() {
    this.downloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.ASSETS_INVENTORY));
  }

  downloadThreatAnalysisTemplate() {
    this.downloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.THREAT_ANALYSIS));
  }

  downloadFrameworkCoreTemplate() {
    this.downloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.NIST_FRAMEWORK_CORE));
  }

  downloadImplementationTiersTemplate() {
    this.downloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.IMPLEMENTATION_TIERS));
  }

  downloadProfileTemplate() {
    this.downloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.PROFILE));
  }

  downloadRiskAssessmentTemplate() {
    this.downloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.RISK_ASSESSMENT));
  }

  downloadActionsPriorityTemplate() {
    this.downloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.ACTIONS_PRIORITY));
  }

  downloadImpactRatesTemplate() {
    this.downloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.IMPACT_RATES_PRIORITY_CODES));
  }

  downloadCurrentProfile() {
    this.downloadService.openDownload(this.fileService.getFileUrl(UploadedFileEnum.CURRENT_PROFILE));
  }

  uploadAssetInventory() {
    this.openUploadModal(this.fileService.getUploadFileUrl(UploadedFileEnum.ASSETS_INVENTORY), this.text.STEP_1.UPLOAD_NAME);
  }

  uploadThreatAnalysis() {
    this.openUploadModal(this.fileService.getUploadFileUrl(UploadedFileEnum.THREAT_ANALYSIS), this.text.STEP_2.UPLOAD_NAME);
  }

  uploadTargetProfile() {
    this.openUploadModal(this.fileService.getUploadFileUrl(UploadedFileEnum.TARGET_PROFILE), this.text.STEP_3.UPLOAD_NAME);
  }

  uploadRiskAssessment() {
    this.openUploadModal(this.fileService.getUploadFileUrl(UploadedFileEnum.RISK_ASSESSMENT), this.text.STEP_4.UPLOAD_NAME);
  }

  uploadCurrentProfile() {
    this.openUploadModal(this.fileService.getUploadFileUrl(UploadedFileEnum.CURRENT_PROFILE), this.text.STEP_5.UPLOAD_NAME);
  }

  uploadActionsPriority() {
    this.openUploadModal(this.fileService.getUploadFileUrl(UploadedFileEnum.ACTIONS_PRIORITY), this.text.STEP_6.UPLOAD_NAME);
  }

  uploadImplementationDocs() {
    this.openUploadModal(this.fileService.getUploadFilesUrl(), this.text.STEP_7.UPLOAD_NAME);
  }

  private openUploadModal(url: string, name = '', multiple = false) {   // todo refactor: make abstract from it (service or smth)
    const initialState: ModalOptions = {
      initialState: {
        objectNameInput: name,
        urlInput: url,
        multipleFiles: multiple
      } as Object,
      class: 'modal-dialog-centered'
    };
    this.modalService.show(UploadModalComponent, initialState);
  }
}
