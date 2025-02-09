import {IeService} from './ie.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from '../../environments/environment';
import {Questionnaire} from '../models/questionnaire.model';

describe('IeService', () => {
  let service: IeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IeService, HttpClient]
    });
    service = TestBed.inject(IeService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get quest export', () => {
    const testQuest = new Questionnaire([]);
    service.getQuestionnaireExport(testQuest).subscribe(json =>
      expect(json).toEqual(new ArrayBuffer(3))
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/ie/export/questionnaire');
    expect(req.request.method).toEqual('PUT');
    req.flush(new ArrayBuffer(3));
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
