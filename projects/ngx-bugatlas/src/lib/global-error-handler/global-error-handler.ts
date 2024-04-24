import { ErrorHandler, Injectable } from "@angular/core";
import { NgxBugatlasService } from "../ngx-bugatlas.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private ngxBugatlasService: NgxBugatlasService
    ) { }

    async handleError(error: any) {
        const data = {
            tag:'App error',
            meta:error,
          }
          this.ngxBugatlasService.postError(data).subscribe((response:any) => {
          })

    }
}