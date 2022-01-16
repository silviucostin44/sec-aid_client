import {TestBed} from '@angular/core/testing';

import {IeService} from './ie.service';

describe('IeService', () => {
  let service: IeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
