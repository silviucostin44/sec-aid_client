import {Injectable} from '@angular/core';
import {BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {UploadModalComponent} from '../view/modals/upload-modal/upload-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UploadDownloadService {

  constructor(private modalService: BsModalService,) {
  }

  openDownload(url: string): void {  // todo refactor: move to service
    window.open(url, '_blank');
  }

  openUploadModal(url: string, name = '', multiple = false) {
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
