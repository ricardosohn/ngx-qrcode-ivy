import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxQRCodeModule } from '@ricardosohn/ngx-qrcode-ivy';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxQRCodeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
