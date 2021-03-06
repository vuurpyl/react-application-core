import { isFn } from './type';
import { AnyT } from '../definitions.interface';

/**
 * @stable [24.01.2020]
 * @param {((payload?: TPayload) => TResult) | TResult} result
 * @param {TPayload} payload
 * @returns {TResult}
 */
export const calc = <TResult, TPayload = AnyT>(result: TResult | ((payload?: TPayload) => TResult), payload?: TPayload): TResult =>
  isFn(result)
    ? (result as (payload?: TPayload) => TResult)(payload)
    : result as TResult;

/**
 * @stable [04.10.2018]
 * @param {number} value
 * @returns {boolean}
 */
export const isOddNumber = (value: number): boolean => value % 2 !== 0;

/**
 * @stable [18.05.2020]
 */
export class CalcUtils {
  public static readonly calc = calc;                                       /* @stable [18.05.2020] */
}
