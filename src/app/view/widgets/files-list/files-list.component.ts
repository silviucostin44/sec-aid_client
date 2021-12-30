import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {FileService} from '../../../services/file.service';
import {File} from '../../../models/server-api/file';
import {faFileAlt, faFileExcel, faFilePdf, faFileWord, IconDefinition} from '@fortawesome/free-regular-svg-icons';
import {DownloadService} from '../../../services/download.service';

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

  // make it @Input if reused
  @Input() files: Observable<File[]>;

  constructor(private fileService: FileService,
              private downloadService: DownloadService) {
  }

  getIcon(name: string): IconDefinition {
    const extension = name.split('.')[1];
    return this.iconList[extension];
  }

  downloadFile(url: string): void {
    this.downloadService.openDownload(url);
  }
}
