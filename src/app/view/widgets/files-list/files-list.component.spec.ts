import {TestBed} from '@angular/core/testing';

import {FilesListComponent} from './files-list.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MockBsModalService} from '../../../../../test/mocks';

describe('FilesListComponent', () => {
  let component: FilesListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilesListComponent,
        {provide: BsModalService, useClass: MockBsModalService},
      ]
    });
    component = TestBed.inject(FilesListComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get icon', () => {
    expect(component.getIcon('file.xlsx')).toEqual(component.iconList.xlsx);
    expect(component.getIcon('file.pdf')).toEqual(component.iconList.pdf);
    expect(component.getIcon('file.docx')).toEqual(component.iconList.docx);
    expect(component.getIcon('file.txt')).toEqual(component.iconList.txt);
  });

  it('delete', () => {
    component.deleteEvent.subscribe((id) =>
      expect(id).toEqual('99')
    );
    component.delete('99');

    expect(component.getIcon('file.xlsx')).toEqual(component.iconList.xlsx);
    expect(component.getIcon('file.pdf')).toEqual(component.iconList.pdf);
    expect(component.getIcon('file.docx')).toEqual(component.iconList.docx);
    expect(component.getIcon('file.txt')).toEqual(component.iconList.txt);
  });
});
