import { NgModule } from '@angular/core';
import { provideGlobalErrorHandler } from './global-error-handler/global-error-handler';

@NgModule({

  providers: [
    provideGlobalErrorHandler()
  ],

})
export class NgxBugatlasModule { }
// Export everything needed
export * from './global-error-handler/global-error-handler';
