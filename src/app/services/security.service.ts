import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CONSTANTS} from '../constants/global-constants';
import {JwtResponse} from '../models/server-api/jwt-response';
import {JwtRequest} from '../models/server-api/jwt-request';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public authEvents: EventEmitter<any> = new EventEmitter<any>();
  private readonly urlPrefix = environment.baseUrl;
  private readonly routesApi = {
    authenticate: this.urlPrefix + `/authenticate`,
    register: this.urlPrefix + `/register`
  };
  private readonly events = {
    login: 'login',
    logout: 'logout'
  };
  private readonly bcrypt = require('bcryptjs');
  private readonly saltRounds = 10;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<JwtResponse> {
    const body: JwtRequest = {
      username: email,
      password: password
    };
    return this.http.post<JwtResponse>(this.routesApi.authenticate, body).pipe(tap((response: JwtResponse) => {
      localStorage.setItem(CONSTANTS.jwtToken, response.jwtToken);
      this.authEvents.next(this.events.login);
    }));
  }

  logout(): void {
    localStorage.removeItem(CONSTANTS.jwtToken);
    this.authEvents.next(this.events.logout);
  }

  isSignedIn(): boolean {
    return localStorage.getItem(CONSTANTS.jwtToken) !== null;
  }

  register(email: string, password: string): Observable<any> {
    const body: JwtRequest = {
      username: email,
      password: this.bcrypt.hashSync(password, this.bcrypt.genSaltSync(this.saltRounds))
    };
    return this.http.post(this.routesApi.register, body);
  }
}
