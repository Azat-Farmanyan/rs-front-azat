import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { userKey } from '../constants/authconstants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userDataJson = localStorage.getItem(userKey);
    const userData = JSON.parse(userDataJson as string);
    if (userData?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
