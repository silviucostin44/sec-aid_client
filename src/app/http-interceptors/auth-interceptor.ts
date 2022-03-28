import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {CONSTANTS} from '../constants/global-constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem(CONSTANTS.jwtToken);

    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        setHeaders: {Authorization: `Bearer ${authToken}`}
      });
    }

    return next.handle(authReq);
  }
}
