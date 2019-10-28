import * as R from 'ramda';

import { isDef, calc } from '../../../util';
import {
  IFieldActualChangedValueConfigEntity,
} from './field.interface';
import { AnyT } from '../../../definitions.interface';
import { IUniversalFieldProps } from '../../../props-definitions.interface';
import { FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES } from '../../../definition';

/**
 * @stable [31.07.2018]
 * @param {IFieldActualChangedValueConfigEntity} config
 * @returns {AnyT}
 */
export const toActualChangedValue = (config: IFieldActualChangedValueConfigEntity): AnyT => {
  const hasOriginalValue = isDef(config.originalValue);

  if (
    ((hasOriginalValue && R.equals(config.value, config.originalValue))
      || (!hasOriginalValue && R.equals(config.value, config.emptyValue)))
    && config.returnValueToClearDirtyChanges !== false
  ) {
    return FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES;
  }
  return config.value;
};

/**
 * @stable [05.10.2018]
 * @param {IUniversalFieldProps} props
 * @returns {boolean}
 */
export const isFieldRequired = (props: IUniversalFieldProps): boolean => calc<boolean>(props.required);
