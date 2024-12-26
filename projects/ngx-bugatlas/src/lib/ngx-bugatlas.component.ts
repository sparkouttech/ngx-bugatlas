import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BUGATLAS_PROVIDERS } from './shared/bugatlas.provider';

@Component({
  selector: 'lib-ngx-bugatlas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      ngx-bugatlas works!
    </p>
  `,
  styles: [
  ],
  providers: BUGATLAS_PROVIDERS
})
export class NgxBugatlasComponent {

}
