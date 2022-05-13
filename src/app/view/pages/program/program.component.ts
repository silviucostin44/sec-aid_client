import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ro from 'src/assets/text/ro.json';
import {FileService} from '../../../services/file.service';
import {TemplateFileEnum} from '../../../models/enums/template-file.enum';
import {UploadedFileEnum} from '../../../models/enums/uploaded-file.enum';
import {UploadDownloadService} from '../../../services/upload-download.service';
import {Observable} from 'rxjs';
import {File} from '../../../models/server-api/file';
import ProgramHelper from '../../../helpers/program.helper';
import {IeService} from '../../../services/ie.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  readonly text = ro.PROGRAM;
  readonly pageActionsNames: String[] = [
    ro.PAGE.EXPORT,
    ro.PAGE.ARCHIVE
  ];

  id: string;
  currentStep: number;
  nextStepEvent = new EventEmitter();
  files: Observable<File[]>;
  initialStep: number;

  constructor(private router: ActivatedRoute,
              private fileService: FileService,
              private uploadDownloadService: UploadDownloadService,
              private ieService: IeService) {
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.fileService.isEmptyProgram();
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.fileService.lastProgramStep().subscribe((step) => {
      this.nextStepEvent.emit(step);
    });
  }

  nextStep(): void {
    this.nextStepEvent.emit();
  }

  updateStep(stepIndex: number) {
    this.currentStep = stepIndex + 1;
    this.updateFiles();
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

  export(): void {
    this.uploadDownloadService.openDownload(this.ieService.getProgramJsonUrl());
  }

  archive() {
    this.uploadDownloadService.openDownload(this.ieService.getProgramZipUrl());
  }

  deleteFile(id: any): void {
    this.fileService.deleteFile(id).subscribe(() => this.updateFiles());
  }

  /**
   * Upload step files.
   * @private
   */
  private updateFiles(): void {
    this.files = this.fileService.downloadFilesByType(ProgramHelper.getFileTypeFromStep(this.currentStep));
  }

  private manageFilesUpload(url: string, modalTitle?: string, multiple?: boolean): void {
    this.uploadDownloadService.openUploadModal(url, modalTitle, multiple).subscribe(() => this.updateFiles());
  }
}
