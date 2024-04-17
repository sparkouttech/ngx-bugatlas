import { ErrorHandler, Injectable } from "@angular/core";
import { NgxBugatlasService } from "../ngx-bugatlas.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private ngxBugatlasService: NgxBugatlasService
    ) { }

    async handleError(error: any) {
        const privateKey = await this.ngxBugatlasService.getPrivateKey();
        if(privateKey == ''){
            console.log("Please set private key");
            return
           }
        console.log("privateKey", privateKey);
        console.log("app error", error);

    }
}