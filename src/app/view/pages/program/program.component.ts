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
import {finalize} from 'rxjs/operators';

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
  isSaved: boolean = true;

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
    return this.isSaved || (!this.isSignedIn && this.fileService.isEmptyProgram());
  }

  ngOnInit(): void {
    this.checkSignedUser();
    this.id = this.router.snapshot.paramMap.get('id');
    this.pageActionsNames = [
      this.primaryActionName(),
      ro.PAGE.ARCHIVE
    ];
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
    this.isSaved = true;
  }

  archive() {
    this.uploadDownloadService.openDownload(this.ieService.getProgramZipUrl());
  }

  deleteFile(id: any): void {
    this.fileService.deleteFile(id)
      .pipe(finalize(() => this.isSaved = false))
      .subscribe(() => this.updateFiles());
  }

  /**
   * Upload step files.
   * @private
   */
  updateFiles = () => {
    this.files = this.fileService.downloadFilesByType(ProgramHelper.getFileTypeFromStep(this.currentStep));
  };

  // INTERACTIVE mode specific methods
  save() {
    this.saveActionEvent.emit();
    this.isSaved = true;
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
        setTimeout(() => this.nextStepEvent.emit(1), 1);
      } else {
        this.programService.lastProgramStep(Number(this.id)).subscribe((lastStep) => this.nextStepEvent.emit(lastStep));
      }
    } else {
      this.fileService.lastProgramStep().subscribe((lastStep) => this.nextStepEvent.emit(lastStep));
    }
  }
}
