import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {CONSTANTS} from '../constants/global-constants';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {SecurityService} from '../services/security.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private securityService: SecurityService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem(CONSTANTS.jwtToken);

    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        setHeaders: {Authorization: `Bearer ${authToken}`}
      });
    }

    return next.handle(authReq)
      .pipe(tap({
        error: (error: HttpErrorResponse) => {
          // if (error.error && !error.error.message) {
          //   // todo v3: display error
          // }
          if (error.status === 401) {
            this.securityService.logout();
            this.router.navigate(['/home']);
          }
        }
      }));
  }
}
