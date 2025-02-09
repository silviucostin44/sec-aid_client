import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CONSTANTS} from '../constants/global-constants';
import {JwtResponse} from '../models/server-api/jwt-response';
import {JwtRequest} from '../models/server-api/jwt-request';
import {tap} from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';

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
      localStorage.setItem(CONSTANTS.username, email);
      this.authEvents.next(this.events.login);
    }));
  }

  logout(): void {
    localStorage.removeItem(CONSTANTS.jwtToken);
    localStorage.removeItem(CONSTANTS.username);
    this.authEvents.next(this.events.logout);
  }

  isSignedIn(): boolean {
    return localStorage.getItem(CONSTANTS.jwtToken) !== null;
  }

  getUsername(): string {
    return localStorage.getItem(CONSTANTS.username);
  }

  register(email: string, password: string): Observable<any> {
    const body: JwtRequest = {
      username: email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(this.saltRounds))
    };
    return this.http.post(this.routesApi.register, body);
  }
}
