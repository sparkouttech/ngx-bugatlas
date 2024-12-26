import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'ngx-bugatlas-library';
  constructor(@Inject('APP_CONFIG') private config: any) {
    console.log(this.config.apiEndpoint);
  }
}
