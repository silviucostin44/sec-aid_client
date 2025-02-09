import {UploadDownloadService} from './upload-download.service';
import {TestBed} from '@angular/core/testing';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MockEmptyClass} from '../../../test/mocks';

describe('UploadDownloadService', () => {
  let service: UploadDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: BsModalService, useClass: MockEmptyClass}]
    });
    service = TestBed.inject(UploadDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
