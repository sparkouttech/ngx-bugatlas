import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, Provider } from '@angular/core';
import { GlobalErrorHandler } from '../global-error-handler/global-error-handler';
import { HttpErrorInterceptor } from '../interceptors/http-error-interceptor.service';

export const BUGATLAS_PROVIDERS: Provider[] = [
    {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true,
    },
];
