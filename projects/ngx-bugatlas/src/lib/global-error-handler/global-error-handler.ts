import { ErrorHandler, Injectable } from "@angular/core";
import { NgxBugatlasService } from "../ngx-bugatlas.service";
import { Router } from '@angular/router';

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
    async handleError(error: any) {
        const data = {
            tag:'App error',
            meta:{
                page:this.router.url,
                error:error.toString()
              }
          }
          this.ngxBugatlasService.postError(data).subscribe((response:any) => {
          });
    }
}