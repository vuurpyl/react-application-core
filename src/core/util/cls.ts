import {
  IClassNameWrapper,
  IFullWrapper,
} from '../definitions.interface';
import { FilterUtils } from './filter';

/**
 * @deprecated
 */
export const fullFlexClassName = (entity: IClassNameWrapper & IFullWrapper): string =>
  (entity.full !== false && !(entity.className || '').includes('rac-flex-')) && 'rac-flex-x1';

/**
 * @stable [30.08.2019]
 * @param {string} parts
 * @returns {string}
 */
export const joinClassName = (...parts: string[]): string =>
  parts.filter(FilterUtils.STRING_VALUE_PREDICATE).join(' ').trim();

/**
 * @stable [20.05.2020]
 */
export class ClsUtils {
  public static readonly joinClassName = joinClassName;                           /* @stable [20.05.2020] */
}
