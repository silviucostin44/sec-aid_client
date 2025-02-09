import {TestBed} from '@angular/core/testing';

import {GuestModeStepsComponent} from './guest-mode-steps.component';
import {MockBsModalService} from '../../../../../../../test/mocks';
import {FileService} from '../../../../../services/file.service';
import {BsModalService} from 'ngx-bootstrap/modal';

describe('GuestModeStepsComponent', () => {
  let component: GuestModeStepsComponent;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(() => {
    const fileSpy = jasmine.createSpyObj('FileService', ['getTemplateUrl', 'getUploadFileUrl', 'deleteFile']);

    TestBed.configureTestingModule({
      providers: [
        GuestModeStepsComponent,
        {provide: BsModalService, useClass: MockBsModalService},
        {provide: FileService, useValue: fileSpy},
      ]
    });
    component = TestBed.inject(GuestModeStepsComponent);
    fileServiceSpy = TestBed.inject(FileService) as jasmine.SpyObj<FileService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('download test', () => {
    const downloadSpy = fileServiceSpy.getTemplateUrl.and.returnValue('url');

    component.downloadAssetInventoryTemplate();

    // expect(component.currentStep).toBe(1);
    expect(downloadSpy.calls.count()).toBe(1);
  });

  it('upload test', () => {
    const downloadSpy = fileServiceSpy.getUploadFileUrl.and.returnValue('url');

    component.uploadAssetInventory();

    // expect(component.currentStep).toBe(1);
    expect(downloadSpy.calls.count()).toBe(1);
  });
});
