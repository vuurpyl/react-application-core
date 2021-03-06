import { AnyT } from '../definitions.interface';
import { RegexpConstants } from '../definition/regexp-definition.interface';

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isDef = (value: AnyT): boolean => !isUndef(value);

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isUndef = (value: AnyT): boolean => typeof value === 'undefined';

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isFn = (value: AnyT): boolean => typeof value === 'function';

/**
 * @stable [01.08.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
const isNumber = (value: AnyT): boolean => typeof value === 'number' && !isNaN(value);

/**
 * @stable [17.04.2020]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isNotNumber = (value: AnyT): boolean => !isNumber(value);

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isDigit = (value: AnyT): boolean => isNumber(value) && RegexpConstants.DIGITAL.test(String(value));

/**
 * @stable [01.08.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isNumberLike = (value: AnyT): boolean => /^-?[0-9]\d*(\.\d+)?$/.test(String(value));

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isPriceLike = (value: AnyT): boolean => RegexpConstants.PRICE.test(String(value));

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
const isBoolean = (value: AnyT): boolean => typeof value === 'boolean';

/**
 * @stable [17.05.2020]
 * @param {AnyT} value
 * @returns {boolean}
 */
const isString = (value: AnyT): boolean => typeof value === 'string';

/**
 * @stable [17.05.2020]
 * @param {AnyT} v
 * @returns {boolean}
 */
export const isPrimitive = (v: AnyT): boolean => isNumber(v) || isString(v) || isBoolean(v);

/**
 * @stable [18.05.2020]
 * @param {AnyT} v
 * @returns {boolean}
 */
const isObject = (v: AnyT): boolean => Object.prototype.toString.call(v) === '[object Object]';

/**
 * @stable [03.04.2020]
 * @param {AnyT} v
 * @returns {boolean}
 */
export const isEvent = (v: AnyT): boolean => v instanceof Event;

/**
 * @stable [06.12.2018]
 * @param {TResult} result
 * @returns {TResult}
 */
export const toType = <TResult>(result: TResult): TResult => result;

/**
 * @stable [16.05.2020]
 */
export class TypeUtils {
  public static readonly isBoolean = isBoolean;                                   /* @stable [12.06.2020] */
  public static readonly isDef = isDef;                                           /* @stable [16.05.2020] */
  public static readonly isFn = isFn;                                             /* @stable [16.05.2020] */
  public static readonly isNumber = isNumber;                                     /* @stable [16.05.2020] */
  public static readonly isObject = isObject;                                     /* @stable [16.05.2020] */
  public static readonly isPrimitive = isPrimitive;                               /* @stable [16.05.2020] */
  public static readonly isString = isString;                                     /* @stable [16.05.2020] */
  public static readonly isUndef = isUndef;                                       /* @stable [16.05.2020] */
}
