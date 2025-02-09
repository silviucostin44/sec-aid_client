import {Injectable} from '@angular/core';
import {BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {UploadModalComponent} from '../view/modals/upload-modal/upload-modal.component';
import * as fileSaver from 'file-saver';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadDownloadService {

  constructor(private modalService: BsModalService) {
  }

  openDownload(url: string): void {
    window.open(url, '_blank');
  }

  openUploadModal(url: string,
                  name = '',
                  multiple = false,
                  closeOnSuccess = false): Subject<any> {
    const initialState: ModalOptions = {
      initialState: {
        objectNameInput: name,
        urlInput: url,
        multipleFiles: multiple,
        closeOnSuccess: closeOnSuccess
      } as Object,
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true
    };
    const modalRef = this.modalService.show(UploadModalComponent, initialState);
    return (modalRef.content as UploadModalComponent).responseEmitter;
  }

  saveAs(blob: Blob, json: string): void {
    fileSaver.saveAs(blob, json);
  }
}
