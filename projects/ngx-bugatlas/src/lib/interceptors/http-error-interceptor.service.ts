import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxBugatlasService } from '../ngx-bugatlas.service';
import { HttpErrorInterceptorHelper } from './helper/http-error-interceptor.helper';
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private ngxBugatlasService: NgxBugatlasService,
    private router: Router, private http: HttpClient,
    private helper: HttpErrorInterceptorHelper
  ) { }
  /**
 * Intercepts HTTP requests and catches any errors that occur.
 * 
 * This method is responsible for handling HTTP errors and reporting them to the NgxBugatlasService.
 * 
 * @param request The outgoing HTTP request.
 * @param next The next HTTP handler in the chain.
 * @returns An observable of the HTTP response.
 */
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const data = this.helper.constructPayload(error, request);
          if (error instanceof HttpErrorResponse) {
            // API error
            this.ngxBugatlasService.httpErrorPost(data).subscribe((response: any) => {
              console.log('http error response', response);
            });

          }
          else {
            // Client error
            this.ngxBugatlasService.appErrorPost(data).subscribe((response: any) => {
              console.log('app error response', response);
            });
          }
          return throwError(() => error);
        })
      );
  }
}
/**
 * A standalone HTTP error interceptor function.
 * 
 * This function intercepts HTTP requests and catches any errors that occur.
 * It then constructs an error payload and reports the error to the NgxBugatlasService.
 * 
 * @param req The outgoing HTTP request.
 * @param next The next HTTP handler in the chain.
 * @returns An observable of the HTTP response.
 */export function httpErrorInterceptorFn(req: HttpRequest<any>, next: HttpHandler) {
  const ngxBugatlasService = inject(NgxBugatlasService);
  const router = inject(Router);
  const helper = new HttpErrorInterceptorHelper(ngxBugatlasService as any, router, inject(HttpClient));
  return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const data = helper.constructPayload(error, req);
        if (error instanceof HttpErrorResponse) {
          // API error
          ngxBugatlasService.httpErrorPost(data).subscribe((response: any) => {
            console.log('http error response', response);
          });
        }
        else {
          // Client error
          ngxBugatlasService.appErrorPost(data).subscribe((response: any) => {
            console.log('app error response', response);
          });
        }
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



