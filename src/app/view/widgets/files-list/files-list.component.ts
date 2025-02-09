import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {File} from '../../../models/server-api/file';
import {faFileAlt, faFileExcel, faFilePdf, faFileWord, faTimesCircle, IconDefinition} from '@fortawesome/free-regular-svg-icons';
import {UploadDownloadService} from '../../../services/upload-download.service';

@Component({
  selector: 'widget-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent {
  readonly iconList = {
    xlsx: faFileExcel,
    pdf: faFilePdf,
    docx: faFileWord,
    txt: faFileAlt
  };
  readonly xIcon = faTimesCircle;

  // make it @Input if reused
  @Input() files: Observable<File[]>;
  @Output() deleteEvent = new EventEmitter();

  constructor(private downloadService: UploadDownloadService) {
  }

  getIcon(name: string): IconDefinition {
    const extension = name.split('.')[1];
    return this.iconList[extension];
  }

  downloadFile(url: string): void {
    this.downloadService.openDownload(url);
  }

  delete(id: string) {
    this.deleteEvent.emit(id);
  }
}
