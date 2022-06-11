import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFileUploaderComponent} from 'angular-file-uploader';
import ro from 'src/assets/text/ro.json';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
  text = ro;

  responseEmitter: Subject<any> = new Subject();
  response: any;

  objectNameInput: string;
  urlInput: string;
  multipleFiles: boolean = false;
  closeOnSuccess: boolean = false;

  configs = {
    uploadAPI: {
      url: 'https://example-file-upload-api'
    },
    multiple: false,
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

  constructor(private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.configs.uploadAPI.url = this.urlInput;
    this.configs.multiple = this.multipleFiles;
  }

  closeModalHandler() {
    this.uploader.resetFileUpload();
    this.responseEmitter.next(this.response);
    this.bsModalRef.hide();
  }

  fileSelected($event: any) {
    // handle file selection
    // maximum 6 file allowed at a time
  }

  /**
   * Upload HTTP request response handler.
   * @param $response the response.
   */
  docUpload($response: HttpResponse<any>) { // todo v3: add toast
    // to do: handle upload response
    this.response = $response.body;
    if (this.closeOnSuccess && $response.ok) {
      this.closeModalHandler();
    }
  }
}
