import {QuestionnaireService} from './questionnaire.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from '../../environments/environment';
import {QuestionnaireServer} from '../models/server-api/questionnaire-server';
import {Questionnaire} from '../models/questionnaire.model';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const testQuestionnaire = new Questionnaire([]);
  const testQuest: QuestionnaireServer = {
    id: '99',
    sections: [],
    name: 'dummy quest'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionnaireService, HttpClient]
    });
    service = TestBed.inject(QuestionnaireService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get default quest', () => {
    service.getDefaultQuestionnaire().subscribe(quest =>
      expect(quest).toEqual(testQuest.sections)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/questionnaire/default');
    expect(req.request.method).toEqual('GET');
    req.flush(testQuest.sections);
  });

  it('compute scores', () => {
    service.computeScores(testQuestionnaire).subscribe(quest =>
      expect(quest).toEqual(testQuestionnaire.sections)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/questionnaire/update-rating');
    expect(req.request.method).toEqual('PUT');
    req.flush([]);
  });

  it('get quest', () => {
    service.getQuestionnaire('99').subscribe(quest =>
      expect(quest).toEqual(testQuest)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/questionnaire/99');
    expect(req.request.method).toEqual('GET');
    req.flush(testQuest);
  });

  it('save quest', () => {
    service.saveQuestionnaire('99', testQuestionnaire, testQuest.name).subscribe(quest =>
      expect(quest).toEqual(testQuest)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/questionnaire/save');
    expect(req.request.method).toEqual('POST');
    req.flush(testQuest);
  });

  it('get all quests', () => {
    service.getAllQuestionnaires().subscribe(quests =>
      expect(quests[0]).toEqual(testQuest)
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/questionnaire/all');
    expect(req.request.method).toEqual('GET');
    req.flush([testQuest]);
  });

  it('manage quest', () => {
    service.manageQuestionnaires({
      itemsToDelete: [],
      itemsToEdit: [],
      itemsToAdd: [],
    }).subscribe(quests =>
      expect(quests).toEqual([])
    );

    const req = httpTestingController.expectOne(environment.baseUrl + '/questionnaire/manage');
    expect(req.request.method).toEqual('POST');
    req.flush([]);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
