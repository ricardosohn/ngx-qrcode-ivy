# @ricardosohn/ngx-qrcode-ivy

`@ricardosohn/ngx-qrcode-ivy` An Angular Component library for Generating QR (Quick Response ) Codes.

You can use the `@ricardosohn/ngx-qrcode-ivy` to easily generate QR codes inside your Angular 16

## How to install @ricardosohn/ngx-qrcode-ivy?

To use ngx-qrcode-ivy in your project, install it via npm or yarn:

```bash
$ npm install @ricardosohn/ngx-qrcode-ivy --save
or
$ yarn add @ricardosohn/ngx-qrcode-ivy
```

## How to use @ricardosohn/ngx-qrcode-ivy?

Import `NgxQRCodeModule` from `@ricardosohn/ngx-qrcode-ivy`  into your `app.module.ts`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxQRCodeModule } from '@ricardosohn/ngx-qrcode';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


Once the library has been imported, you can use the ngx-qrcode component in your Angular application.

In `app.component.html`, add:
```html

<div style="text-align:center">
  <h1>
    @ricardosohn/ngx-qrcode-ivy demo 
  </h1>
</div>

<ngx-qrcode 
  [elementType]="elementType" 
  [value]="value"
  cssClass="aclass"
  errorCorrectionLevel="L">
</ngx-qrcode>

```
In `app.component.ts`, add:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  elementType = 'url';
  value = 'ricardosohn';
}
```

# Contributing
Please see [Contributing Guidelines](.github/CONTRIBUTING.md).

## How to develop @ricardosohn/ngx-qrcode-ivy?

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
or
$ yarn build

```

To lint all `*.ts` files:

```bash
$ npm run lint
or
$ yarn lint
```

## How to run unit tests?

In development mode:

```bash
$ npm run test:watch ngx-qrcode
or
$ yarn test:watch ngx-qrcode
```
Add `--codeCoverage` option to see code coverage in `coverage` folder.

## How to publish libraries?

```bash
$ npm run lib:publish
or
$ yarn lib:publish
```

# Code of Conduct
Please see [Code of Conduct](.github/CODE_OF_CONDUCT.md).

## License
[MIT](/LICENSE)

## Troubleshoots

With Angular CLI 8.X.X you should add this lines to polyfills.ts

```typescript
// Needed by Buffer needed by QRCode
// tslint:disable-next-line:no-string-literal
(window as any)['global'] = window;
```
