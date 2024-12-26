import { ErrorHandler, Injectable, Provider } from "@angular/core";
import { Router } from '@angular/router';
import { throwError } from "rxjs";
import { NgxBugatlasService } from "../ngx-bugatlas.service";

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
            tag: 'Web app',
            meta: {
                page: this.router.url,
                error: error.toString()
            }
        }
        const details = {
            error: error,
            type: 'app'
        }
        this.ngxBugatlasService.emitErrors(details);
        this.ngxBugatlasService.appErrorPost(data).subscribe((response: any) => {
            console.log('error', response);

        });
        return throwError(() => error);
    }
}
// Add the provider function in the same file
export function provideGlobalErrorHandler(): Provider {
    return {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
    };
}