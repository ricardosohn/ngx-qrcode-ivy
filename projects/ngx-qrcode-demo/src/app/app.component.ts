/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-qrcode-demo';
  elementType = 'url';
  correctionLevel = 'l';
  value = 'ricardosohn';
}
