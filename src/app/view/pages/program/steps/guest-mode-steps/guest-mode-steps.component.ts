import {Component, EventEmitter, Input, Output} from '@angular/core';
import ro from '../../../../../../assets/text/ro.json';
import {TemplateFileEnum} from '../../../../../models/enums/template-file.enum';
import {UploadedFileEnum} from '../../../../../models/enums/uploaded-file.enum';
import {FileService} from '../../../../../services/file.service';
import {UploadDownloadService} from '../../../../../services/upload-download.service';

@Component({
  selector: 'app-guest-mode-steps',
  templateUrl: './guest-mode-steps.component.html',
  styleUrls: ['../../program.component.scss']
})
export class GuestModeStepsComponent {
  readonly text = ro.PROGRAM;

  @Input() currentStep: number;
  @Input() updateFiles: () => void;
  @Output() isSaved = new EventEmitter();

  constructor(private fileService: FileService,
              private uploadDownloadService: UploadDownloadService) {
  }

  downloadAssetInventoryTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.ASSETS_INVENTORY));
  }

  downloadThreatAnalysisTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.THREAT_ANALYSIS));
  }

  downloadFrameworkCoreTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.NIST_FRAMEWORK_CORE));
  }

  downloadImplementationTiersTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.IMPLEMENTATION_TIERS));
  }

  downloadProfileTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.PROFILE));
  }

  downloadRiskAssessmentTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.RISK_ASSESSMENT));
  }

  downloadActionsPriorityTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.ACTIONS_PRIORITY));
  }

  downloadImpactRatesTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.IMPACT_RATES_PRIORITY_CODES));
  }

  downloadCurrentProfile() {
    this.uploadDownloadService.openDownload(this.fileService.getFileUrl(UploadedFileEnum.CURRENT_PROFILE));
  }

  uploadAssetInventory() {
    this.manageFilesUpload(this.fileService.getUploadFileUrl(UploadedFileEnum.ASSETS_INVENTORY), this.text.STEP_1.UPLOAD_NAME);
  }

  uploadThreatAnalysis() {
    this.manageFilesUpload(this.fileService.getUploadFileUrl(UploadedFileEnum.THREAT_ANALYSIS), this.text.STEP_2.UPLOAD_NAME);
  }

  uploadTargetProfile() {
    this.manageFilesUpload(this.fileService.getUploadFileUrl(UploadedFileEnum.TARGET_PROFILE), this.text.STEP_3.UPLOAD_NAME);
  }

  uploadRiskAssessment() {
    this.manageFilesUpload(this.fileService.getUploadFileUrl(UploadedFileEnum.RISK_ASSESSMENT), this.text.STEP_4.UPLOAD_NAME);
  }

  uploadCurrentProfile() {
    this.manageFilesUpload(this.fileService.getUploadFileUrl(UploadedFileEnum.CURRENT_PROFILE), this.text.STEP_5.UPLOAD_NAME);
  }

  uploadActionsPriority() {
    this.manageFilesUpload(this.fileService.getUploadFileUrl(UploadedFileEnum.ACTIONS_PRIORITY), this.text.STEP_6.UPLOAD_NAME);
  }

  uploadImplementationDocs() {
    this.manageFilesUpload(this.fileService.getUploadFilesUrl(), this.text.STEP_7.UPLOAD_NAME, true);
  }

  private manageFilesUpload(url: string, modalTitle?: string, multiple?: boolean): void {
    this.isSaved.emit(false);
    this.uploadDownloadService.openUploadModal(url, modalTitle, multiple).subscribe(() => this.updateFiles());
  }

}
