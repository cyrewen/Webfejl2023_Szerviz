import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private httpErrorHandler: HttpErrorHandlerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse, caught) => {
          if(error instanceof HttpErrorResponse) {
            this.httpErrorHandler.handleError(error);
          }
          return caught;
      }));
  }
}
