import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({ imports: [RouterModule.forRoot([])], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppConfig { }