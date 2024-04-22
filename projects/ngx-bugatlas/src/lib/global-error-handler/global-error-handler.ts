import { ErrorHandler, Injectable } from "@angular/core";
import { NgxBugatlasService } from "../ngx-bugatlas.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private ngxBugatlasService: NgxBugatlasService
    ) { }

    async handleError(error: any) {
        const projectId = await this.ngxBugatlasService.getProjectId();
        if(projectId == ''){
            console.log("Please set private key");
            return
           }
        console.log("projectId", projectId);
        console.log("app error", error);

    }
}