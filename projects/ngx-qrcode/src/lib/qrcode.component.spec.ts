import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import * as QRCode from 'qrcode';

import { QrcodeComponent } from './qrcode.component';
import { DEFAULT_VALUES } from './qrcode.constants';
import { NgxQrcodeElementTypes } from './qrcode.types';

describe('QrcodeComponent', () => {
  let component: TestHostComponent;
  let qrcodeComponent: QrcodeComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let toDataURLSpy: jasmine.Spy;
  let toCanvasSpy: jasmine.Spy;
  const IMAGE_SRC = 'imgSrc';

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      declarations: [QrcodeComponent, TestHostComponent]
    }).compileComponents();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    toDataURLSpy = spyOn<any, string>(QRCode, 'toDataURL').and.returnValue(
      Promise.resolve(IMAGE_SRC)
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    toCanvasSpy = spyOn<any, string>(QRCode, 'toCanvas').and.returnValue(
      Promise.resolve(null)
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    qrcodeComponent = component.qrcodeComponent;
  });

  it('should create', () => {
    void expect(qrcodeComponent).toBeTruthy();
  });

  describe('when has no value', () => {
    beforeEach(() => {
      component.value = null;
      fixture.detectChanges();
    });

    it('should not render nothing', () => {
      void expect(
        (qrcodeComponent.qrcElement.nativeElement as HTMLElement).childNodes
          .length
      ).toBe(0);
    });
  });

  describe('when elementType is url', () => {
    beforeEach(() => {
      component.elementType = NgxQrcodeElementTypes.URL;
    });

    it('should render img element', (done) => {
      fixture.detectChanges();
      void fixture.whenStable().then(() => {
        void expect(
          (
            (qrcodeComponent.qrcElement.nativeElement as HTMLElement)
              .childNodes[0] as HTMLImageElement
          ).tagName.toLowerCase()
        ).toBe('img');
        done();
      });
    });

    it('should not render img alt attribute by default', (done) => {
      const defaultAlt = '';
      fixture.detectChanges();
      void fixture.whenStable().then(() => {
        const imageElement = (
          qrcodeComponent.qrcElement.nativeElement as HTMLElement
        ).childNodes[0] as HTMLImageElement;
        void expect(imageElement.alt).toBe(defaultAlt);
        done();
      });
    });

    it('should render img alt attribute when defined', (done) => {
      const alt = 'hello alt';
      component.alt = alt;
      fixture.detectChanges();
      void fixture.whenStable().then(() => {
        const imageElement = (
          qrcodeComponent.qrcElement.nativeElement as HTMLElement
        ).childNodes[0] as HTMLImageElement;
        void expect(imageElement.alt).toBe(alt);
        done();
      });
    });

    it('should catch QRCode error and have no children', (done) => {
      void fixture.whenStable().then(() => {
        toDataURLSpy.and.returnValue(Promise.reject('error in toDataURL'));
        component.cssClass = 'fire change detection';
        fixture.detectChanges();
        const renderSpy = spyOn<any>(qrcodeComponent, 'renderElement');
        const removeSpy = spyOn<any>(qrcodeComponent, 'removeElementChildren');
        void fixture.whenStable().then(() => {
          void expect(renderSpy).not.toHaveBeenCalled();
          void expect(removeSpy).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  describe('when elementType is canvas', () => {
    beforeEach(() => {
      component.elementType = NgxQrcodeElementTypes.CANVAS;
    });

    it('should render a canvas element', (done) => {
      fixture.detectChanges();
      void fixture.whenStable().then(() => {
        void expect(
          (
            (qrcodeComponent.qrcElement.nativeElement as HTMLElement)
              .childNodes[0] as HTMLImageElement
          ).tagName.toLowerCase()
        ).toBe('canvas');
        done();
      });
    });

    it('should catch QRCode error and have no children', (done) => {
      void fixture.whenStable().then(() => {
        toCanvasSpy.and.returnValue(Promise.reject('error in toCanvas'));
        fixture.detectChanges();
        const renderSpy = spyOn<any>(qrcodeComponent, 'renderElement');
        const removeSpy = spyOn<any>(qrcodeComponent, 'removeElementChildren');
        void fixture.whenStable().then(() => {
          void expect(renderSpy).not.toHaveBeenCalled();
          void expect(removeSpy).toHaveBeenCalled();
          done();
        });
      });
    });
  });
});

@Component({
  template: ` <ngx-qrcode
    #qrcodeComponent
    [elementType]="elementType"
    [cssClass]="cssClass"
    [value]="value"
    [alt]="alt"
  ></ngx-qrcode>`
})
class TestHostComponent {
  @ViewChild('qrcodeComponent') qrcodeComponent: QrcodeComponent;
  elementType = DEFAULT_VALUES.elementType;
  cssClass = DEFAULT_VALUES.cssClass;
  alt;
  value = DEFAULT_VALUES.value;
}
