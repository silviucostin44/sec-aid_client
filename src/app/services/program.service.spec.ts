import {ProgramService} from './program.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Program} from '../models/program.model';
import {environment} from '../../environments/environment';

describe('ProgramService', () => {
  let service: ProgramService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const testProgram: Program = new Program('99', 'dummy program');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProgramService, HttpClient]
    });
    service = TestBed.inject(ProgramService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get program', () => {
    // Make an HTTP GET request
    service.getProgram(99).subscribe(program =>
      // When observable resolves, result should match test data
      expect(program).toEqual(testProgram)
    );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(environment.baseUrl + '/program/99');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testProgram);
  });

  it('save program', () => {
    service.saveProgram(testProgram).subscribe(program =>
      expect(program).toEqual(testProgram)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/program/save');
    expect(req.request.method).toEqual('POST');
    req.flush(testProgram);
  });

  it('get all programs', () => {
    service.getAllPrograms().subscribe(programs =>
      expect(programs[0]).toEqual(testProgram)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/program/all');
    expect(req.request.method).toEqual('GET');
    req.flush([testProgram]);
  });

  it('manage program', () => {
    service.manageProgram({
      itemsToDelete: [],
      itemsToEdit: [],
      itemsToAdd: [],
    }).subscribe(programs =>
      expect(programs).toEqual([])
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/program/manage');
    expect(req.request.method).toEqual('POST');
    req.flush([]);
  });

  it('last program step', () => {
    service.lastProgramStep(99).subscribe(lastStep =>
      expect(lastStep).toEqual(3)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/program/99/last-step');
    expect(req.request.method).toEqual('GET');
    req.flush(3);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
