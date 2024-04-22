# NgxBugatlas

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## npm install

npm i ngx-bugatlas

## configure in module

import { NgxBugatlasModule, NgxBugatlasService } from 'ngx-bugatlas';

imports: [ NgxBugatlasModule ]

## project id configure in module

export class AppModule {
  constructor(
    private ngxBugatlasService : NgxBugatlasService,
  ) 
  {
    this.ngxBugatlasService.setProjectId('PROJECT_ID');
  }
 }
