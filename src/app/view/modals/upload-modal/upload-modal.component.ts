import {Component, Input, ViewChild} from '@angular/core';
import {AngularFileUploaderComponent} from 'angular-file-uploader';
import ro from 'src/assets/text/ro.json';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {
  text = ro;

  @Input() objectName: string;
  configs = {
    uploadAPI: {
      url: 'https://example-file-upload-api'
    },
    formatsAllowed: '.txt',
    theme: 'dragNDrop',
    hideSelectBtn: false,
    hideResetBtn: false,
    replaceTexts: {
      selectFileBtn: this.text.MODAL.UPLOAD_CONFIG.CHOOSE_FILE,
      resetBtn: this.text.MODAL.UPLOAD_CONFIG.RESET,
      uploadBtn: this.text.MODAL.UPLOAD,
      dragNDropBox: this.text.MODAL.UPLOAD_CONFIG.DRAG_N_DROP,
      afterUploadMsg_success: this.text.MODAL.UPLOAD_CONFIG.SUCCESS,
      afterUploadMsg_error: this.text.MODAL.UPLOAD_CONFIG.FAIL,
      sizeLimit: this.text.MODAL.UPLOAD_CONFIG.LIMIT
    }
  };
  @ViewChild('uploader') private uploader: AngularFileUploaderComponent;

  constructor() {
  }

  closeModal() {
    this.uploader.resetFileUpload();
  }

  fileSelected($event: any) {
    // todo: handle upload
  }

  docUpload($event: any) {
    // todo: handle upload
    // todo: close modal
  }
}
