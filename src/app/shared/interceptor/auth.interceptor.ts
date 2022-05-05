import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    static accessToken ='';
  constructor() {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
const req=request.clone(
    {
setHeaders:{
    authorization: `Bearer ${ AuthInterceptor.accessToken}`
}
    }
);
    return next.handle(req);
  }
}
