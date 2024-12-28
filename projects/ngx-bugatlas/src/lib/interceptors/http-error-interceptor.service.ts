import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NgxBugatlasService } from '../ngx-bugatlas.service';
import { ErrorInterceptorHelper } from './helper/http-error-interceptor.helper';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorHelper: ErrorInterceptorHelper,
    private bugatlasService: NgxBugatlasService
  ) { }

  /**
   * Intercepts http error interceptor
   * @param request 
   * @param next 
   * @returns intercept 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHelper.constructPayload(error, request).pipe(
          switchMap(payload => {
            const service = error instanceof HttpErrorResponse
              ? this.bugatlasService.httpErrorPost(payload)
              : this.bugatlasService.appErrorPost(payload);

            return service.pipe(
              // Transform the response into an HttpEvent
              map((response: any) => new HttpResponse({ body: response })),
              catchError(err => {
                console.error('Error reporting to Bugatlas:', err);
                return throwError(() => error);
              })
            );
          }),
          catchError(() => throwError(() => error))
        );
      })
    );
  }
}
