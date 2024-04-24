import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxBugatlasService } from '../ngx-bugatlas.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private ngxBugatlasService:NgxBugatlasService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request)
      .pipe(
        catchError(async (error: HttpErrorResponse) => {
          const data = {
            request_url:request.url,
            request_method:request.method,
            payload:request.body,
            error_message:error.message,
            tag:'Http error',
            meta:'',
          }
          this.ngxBugatlasService.postError(data).subscribe((response:any) => {
          })
      })
      );
  }
}

