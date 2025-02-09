import {SecurityService} from './security.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from '../../environments/environment';
import {JwtResponse} from '../models/server-api/jwt-response';
import {CONSTANTS} from '../constants/global-constants';

describe('SecurityService', () => {
  let service: SecurityService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const testResponse: JwtResponse = {
    jwtToken: 'token'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecurityService, HttpClient]
    });
    service = TestBed.inject(SecurityService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', () => {
    service.login('email', 'pass').subscribe(response => {
      expect(response).toEqual(testResponse);
      expect(service.isSignedIn()).toBeTrue();
      expect(service.getUsername()).toBe('email');
      expect(localStorage.getItem(CONSTANTS.jwtToken)).toBe(testResponse.jwtToken);
    });

    const req = httpTestingController.expectOne(environment.baseUrl + '/authenticate');
    expect(req.request.method).toEqual('POST');
    req.flush(testResponse);
  });

  it('logout', () => {
    service.login('email', 'pass').subscribe();

    service.logout();
    expect(service.isSignedIn()).toBeFalse();
    expect(service.getUsername()).toBeNull();

    const req = httpTestingController.expectOne(environment.baseUrl + '/authenticate');
    expect(req.request.method).toEqual('POST');
    req.flush(testResponse);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
