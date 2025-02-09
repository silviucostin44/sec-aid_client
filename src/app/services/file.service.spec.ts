import {FileService} from './file.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from '../../environments/environment';
import {TemplateFileEnum} from '../models/enums/template-file.enum';
import {UploadedFileEnum} from '../models/enums/uploaded-file.enum';
import {File} from '../models/server-api/file';

describe('FileService', () => {
  let service: FileService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const buffer = new ArrayBuffer(3);
  const file: File = {
    type: '',
    url: 'url',
    id: '99',
    name: 'file'

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService, HttpClient]
    });
    service = TestBed.inject(FileService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('download template', () => {
    service.downloadTemplate(TemplateFileEnum.THREAT_ANALYSIS).subscribe(file =>
      expect(file).toEqual(buffer)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/files/template/THREAT_ANALYSIS');
    expect(req.request.method).toEqual('GET');
    req.flush(buffer);
  });

  it('download file', () => {
    service.downloadFile(UploadedFileEnum.THREAT_ANALYSIS).subscribe(file =>
      expect(file).toEqual(file)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/files/THREAT_ANALYSIS');
    expect(req.request.method).toEqual('GET');
    req.flush(file);
  });

  it('empty program', () => {
    service.isEmptyProgram().subscribe(isEmpty =>
      expect(isEmpty).toEqual(true)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/files');
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });

  it('last program step', () => {
    service.lastProgramStep().subscribe(step =>
      expect(step).toEqual(3)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/files/last-step');
    expect(req.request.method).toEqual('GET');
    req.flush(3);
  });

  it('download files by type', () => {
    service.downloadFilesByType(UploadedFileEnum.THREAT_ANALYSIS).subscribe(files =>
      expect(files[0]).toEqual(file)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/files/many/THREAT_ANALYSIS');
    expect(req.request.method).toEqual('GET');
    req.flush([file]);
  });

  it('delete file', () => {
    service.deleteFile('99').subscribe(none =>
      expect(none).toBeNull()
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/files/99');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });
});
