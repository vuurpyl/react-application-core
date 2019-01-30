import {
  AnyT,
  IMAGE_JPG_FORMAT,
  IMAGE_JPEG_FORMAT,
  IMAGE_PNG_FORMAT,
  APPLICATION_PDF_FORMAT,
} from '../definitions.interface';

export function isDef(value: AnyT): boolean {
  return !isUndef(value);
}

export function isUndef(value: AnyT): boolean {
  return typeof value === 'undefined';
}

export function isNull(value: AnyT): boolean {
  return value === null;
}

export function isFn(value: AnyT): boolean {
  return typeof value === 'function';
}

/**
 * @stable [01.08.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isNumber = (value: AnyT): boolean => typeof value === 'number';

/**
 * @stable [01.08.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isNumberLike = (value: AnyT): boolean => /^-?[0-9]\d*(\.\d+)?$/.test(String(value));

export function isBoolean(value: AnyT): boolean {
  return typeof value === 'boolean';
}

export function isString(value: AnyT): boolean {
  return typeof value === 'string';
}

export const isPrimitive = (v: AnyT): boolean => {
  return isNumber(v)
      || isString(v)
      || isBoolean(v);
};

export const isObject = (v: AnyT): boolean => {
  return Object.prototype.toString.call(v) === '[object Object]';
};

/**
 * @stable [06.12.2018]
 * @param {TResult} result
 * @returns {TResult}
 */
export const toType = <TResult>(result: TResult): TResult => result;

/**
 * @stable [29.01.2019]
 * @param {string} format
 * @returns {boolean}
 */
export const isImageFileFormat = (format: string): boolean => [
  IMAGE_JPG_FORMAT,
  IMAGE_JPEG_FORMAT,
  IMAGE_PNG_FORMAT
].includes(format);

/**
 * @stable [29.01.2019]
 * @param {string} format
 * @returns {boolean}
 */
export const isPdfFileFormat = (format: string): boolean => [
  APPLICATION_PDF_FORMAT
].includes(format);
