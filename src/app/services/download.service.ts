import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() {
  }

  public openDownload(url: string): void {  // todo refactor: move to service
    window.open(url, '_blank');
  }
}
