# NgxBugatlas
<a href="https://bugatlas.com" target="_blank">
    <img src="https://bugatlas.com/assets/images/error-tracker.svg" alt="codecov">
  </a>
  <br>
  The NgxBugatlas is designed to help monitor and manage errors in software applications. This is provides an overview of the system, setup instructions, and usage details to help you integrate this tool into your development angular applications.
 
## Features
- Capture and log errors as they occur in real-time across your applications.
- A user-friendly dashboard to visualize errors and statistics.
- Display exceptions, analytics and logs separately. It more helpful to findout errors
- Can easily findout Applications, HTTP calls and bolckchain Errors.
- Tracked the users how long time spent in each page.

## Dependencies

| ngx-bugatlas | Angular |
| ----------   | ------- |
| 0.0.2        | 14      |
| 0.0.3        | 15      |
| 0.0.7        | 16      |
| 17.1.3       | 17      |
| 18.0.4       | 18      |
## Install

npm i ngx-bugatlas

## Setup

## Module based
```ts
import { NgxBugatlasModule, NgxBugatlasService } from 'ngx-bugatlas';

@NgModule({
  imports: [ NgxBugatlasModule ],
   providers: [
    {
      provide: ErrorHandler,   
      useClass: MyErrorHandler,
    },
  ],
})

export class AppModule {
  constructor(
    private ngxBugatlasService : NgxBugatlasService,
  )
  {
    const data = {
      api_key:'API_KEY',
      secret_key:'SECRET_KEY',
    }
    this.ngxBugatlasService.seConfigKey(data);
  }
 }
 
```
## Standalone
```ts
app.config.ts

import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MyErrorHandler} from 'ngx-bugatlas';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
   {
      provide: ErrorHandler,
      useClass: MyErrorHandler,
    },

  ]
};
 
 app.component.ts
 @Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  protected bugatlasService = inject(NgxBugatlasService)
  constructor() {
    const data = {
      api_key: 'API_KEY',
      secret_key: 'SECRET_KEY',
    };
    this.bugatlasService.seConfigKey(data);
  }
}
```


**Note:** The API_KEY and SECRET_KEY will provided by our team

## License

MIT

## Website
<a href="https://bugatlas.com" target="_blank">bugatlas.com</a>

