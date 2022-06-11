import {ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ro from 'src/assets/text/ro.json';
import {FileService} from '../../../services/file.service';
import {UploadDownloadService} from '../../../services/upload-download.service';
import {Observable} from 'rxjs';
import {File} from '../../../models/server-api/file';
import {IeService} from '../../../services/ie.service';
import ProgramHelper from '../../../helpers/program.helper';
import {SecurityService} from '../../../services/security.service';
import {ProgramService} from '../../../services/program.service';
import {ElementStartEnum} from '../../../models/enums/element-start.enum';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  readonly text = ro.PROGRAM;

  id: string;
  currentStep: number;
  nextStepEvent = new EventEmitter();
  files: Observable<File[]>;
  initialStep: number;
  saveActionEvent = new EventEmitter();
  pageActionsNames: String[];

  isSignedIn: boolean;
  isStepCompletedInteractiveMode: boolean = true;

  constructor(private router: ActivatedRoute,
              private fileService: FileService,
              private uploadDownloadService: UploadDownloadService,
              private securityService: SecurityService,
              private ieService: IeService,
              private programService: ProgramService,
              private cdr: ChangeDetectorRef) {
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.fileService.isEmptyProgram();
  }

  ngOnInit(): void {
    this.checkSignedUser();
    this.id = this.router.snapshot.paramMap.get('id');
    this.pageActionsNames = [
      this.primaryActionName(),
      ro.PAGE.ARCHIVE
    ];
    setTimeout(() => this.nextStepEvent.emit(1), 1);
    this.getLatestStep();
  }

  nextStep(): void {
    this.nextStepEvent.emit();
  }

  updateStep(stepIndex: number) {
    this.currentStep = stepIndex + 1;
    if (!this.isSignedIn) {
      this.updateFiles();
    }
  }

  primaryAction(): void {
    return this.isSignedIn
      ? this.save()
      : this.export();
  }

  primaryActionName(): string {
    return this.isSignedIn
      ? ro.PAGE.SAVE
      : ro.PAGE.EXPORT;
  }

  // FILES mode specific methods
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
  updateFiles(): void {
    this.files = this.fileService.downloadFilesByType(ProgramHelper.getFileTypeFromStep(this.currentStep));
  }

  // INTERACTIVE mode specific methods
  save() {
    this.saveActionEvent.emit();
  }

  updateStepValidityInteractiveMode(value: boolean) {
    this.isStepCompletedInteractiveMode = value;
    this.cdr.detectChanges();
  }

  // private methods
  private checkSignedUser(): void {
    this.isSignedIn = this.securityService.isSignedIn();

    this.securityService.authEvents.subscribe(() => {
      this.isSignedIn = this.securityService.isSignedIn();
    });
  }

  private getLatestStep(): void {
    if (this.isSignedIn) {
      if (this.id === ElementStartEnum.NEW) {
        this.nextStepEvent.emit(1);
      } else {
        this.programService.lastProgramStep(Number(this.id)).subscribe(this.nextStepEvent.emit);
      }
    } else {
      this.fileService.lastProgramStep().subscribe(this.nextStepEvent.emit);
    }
  }
}
