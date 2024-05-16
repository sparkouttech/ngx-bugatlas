import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NgxBugatlasService } from '../ngx-bugatlas.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private ngxBugatlasService:NgxBugatlasService,
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
            request_url:request.url,
            request_method:request.method,
            payload:request.body,
            error_message:error.message,
            tag:'Web app',
            meta:{
              status_code:error.status,
              page:this.router.url
            }
          }
          const details = {
            error:error,
            type:'http'
          }
          this.ngxBugatlasService.emitErrors(details);
          this.ngxBugatlasService.httpErrorPost(data).subscribe((response:any) => {
          });
          return throwError(() => error);
      })
      );
  }
}

