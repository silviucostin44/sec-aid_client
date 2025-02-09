import {TestBed} from '@angular/core/testing';

import {UploadModalComponent} from './upload-modal.component';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {AngularFileUploaderComponent} from 'angular-file-uploader';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MockEmptyClass} from '../../../../../test/mocks';

describe('UploadModalComponent', () => {
  let component: UploadModalComponent;
  let modalRefSpy: jasmine.SpyObj<BsModalRef>;
  let httpClient: HttpClient;

  beforeEach(() => {
    const modalSpy = jasmine.createSpyObj('FileService', ['hide']);

    TestBed.configureTestingModule({
      providers: [
        UploadModalComponent,
        {provide: BsModalRef, useValue: modalSpy},
        {provide: HttpClient, useValue: MockEmptyClass},
      ]
    });
    component = TestBed.inject(UploadModalComponent);
    modalRefSpy = TestBed.inject(BsModalRef) as jasmine.SpyObj<BsModalRef>;
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doc upload', () => {
    const hideSpy = modalRefSpy.hide.and.returnValue();

    component.docUpload(new HttpResponse<any>({
      status: 200,
      body: 'response'
    }));

    expect(component.response).toEqual('response');
    expect(hideSpy.calls.count()).toBe(0);
  });

  it('doc upload with close', () => {
    const hideSpy = modalRefSpy.hide.and.returnValue();
    component.closeOnSuccess = true;
    component.uploader = new AngularFileUploaderComponent(httpClient);

    component.docUpload(new HttpResponse<any>({
      status: 200,
      body: 'response'
    }));

    expect(component.response).toEqual('response');
    expect(hideSpy.calls.count()).toBe(1);
  });

  it('doc upload with close, but error', () => {
    const hideSpy = modalRefSpy.hide.and.returnValue();
    component.docUpload(new HttpResponse<any>({
      status: 401,
    }));

    expect(component.response).toBeNull();
    expect(hideSpy.calls.count()).toBe(0);
  });
});
