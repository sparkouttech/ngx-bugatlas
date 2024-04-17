import { ErrorHandler, NgModule } from '@angular/core';
import { NgxBugatlasComponent } from './ngx-bugatlas.component';
import { HttpErrorInterceptorService } from './interceptors/http-error-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';


@NgModule({
  declarations: [
    NgxBugatlasComponent
  ],
  imports: [
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
   },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    }
  ],
  exports: [
    NgxBugatlasComponent
  ]
})
export class NgxBugatlasModule { }
