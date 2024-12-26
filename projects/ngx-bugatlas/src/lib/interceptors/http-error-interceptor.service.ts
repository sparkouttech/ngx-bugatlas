import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxBugatlasService } from '../ngx-bugatlas.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private ngxBugatlasService: NgxBugatlasService,
    private router: Router
  ) { }

  /**
   * Intercepts http error interceptor service
   * @param {quest<any>} request 
   * @param {HttpHandler} next 
   * @returns 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const data = {
            request_url: request.url,
            request_method: request.method,
            payload: request.body,
            error_message: error.message,
            tag: 'Web app',
            meta: {
              status_code: error.status,
              page: this.router.url,
              short_error: error.error.message
            }
          }
          const details = {
            error: error,
            type: 'http'
          }
          this.ngxBugatlasService.emitErrors(details);
          this.ngxBugatlasService.httpErrorPost(data).subscribe((response: any) => {
          });
          return throwError(() => error);
        })
      );
  }
}
// Provide a function version for standalone apps
export function httpErrorInterceptorFn(req: HttpRequest<any>, next: HttpHandler) {
  const ngxBugatlasService = inject(NgxBugatlasService);
  const router = inject(Router);

  return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const data = {
          request_url: req.url,
          request_method: req.method,
          payload: req.body,
          error_message: error.message,
          tag: 'Web app',
          meta: {
            status_code: error.status,
            page: router.url,
            short_error: error.error?.message
          }
        };

        const details = {
          error: error,
          type: 'http'
        };

        ngxBugatlasService.emitErrors(details);
        ngxBugatlasService.httpErrorPost(data).subscribe((response: any) => {
        });

        return throwError(() => error);
      })
    );
}

// Export providers that will work for both module and standalone
export const HTTP_ERROR_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptorService,
  multi: true
};



