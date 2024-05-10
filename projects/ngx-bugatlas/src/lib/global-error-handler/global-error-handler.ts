import { ErrorHandler, Injectable } from "@angular/core";
import { NgxBugatlasService } from "../ngx-bugatlas.service";
import { Router } from '@angular/router';
import { throwError } from "rxjs";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private ngxBugatlasService: NgxBugatlasService,
        private router: Router
    ) { }

    /**
     * Handles error
     * @param {any} error 
     */
    handleError(error: any) {
        const data = {
            tag:'Web app',
            meta:{
                page:this.router.url,
                error:error.toString()
              }
          }
          this.ngxBugatlasService.appErrorPost(data).subscribe((response:any) => {
          });
          return throwError(() => error);
    }
}