import {Component, Input, ViewChild} from '@angular/core';
import {AngularFileUploaderComponent} from 'angular-file-uploader';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {
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
      selectFileBtn: 'Alege fișier',
      resetBtn: 'Resetează',
      uploadBtn: 'Încarcă',
      dragNDropBox: 'Trage fișierul aici',
      afterUploadMsg_success: 'Fișier încărcat cu succes.',
      afterUploadMsg_error: 'Încărcarea fișierului a eșuat.',
      sizeLimit: 'Dimensiunea maximă a fișierului'
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
