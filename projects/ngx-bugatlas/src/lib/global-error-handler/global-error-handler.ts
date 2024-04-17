import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  handleError(error: any) {
console.log("app error",error);

  }
}