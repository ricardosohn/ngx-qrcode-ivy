import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
  NgxQrcodeVersionType
} from './qrcode.types';

export const DEFAULT_VALUES = {
  elementType: NgxQrcodeElementTypes.URL,
  cssClass: 'qrcode',
  value: 'https://www.ricardosohn.com',
  version: undefined as NgxQrcodeVersionType,
  errorCorrectionLevel: NgxQrcodeErrorCorrectionLevels.MEDIUM,
  margin: 4,
  scale: 4,
  width: 10,
  colorDark: '#000',
  colorLight: '#FFF'
};
