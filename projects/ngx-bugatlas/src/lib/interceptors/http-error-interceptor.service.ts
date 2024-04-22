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
         const projectId = await this.ngxBugatlasService.getProjectId();
         if(projectId == ''){
          console.log("Please set private key");
          return
         }
          console.log("projectId",projectId);
          console.log("http error",error);
          
      })
      );
  }
}

