import {
  AnyT,
  IConverterWrapper,
  IFromWrapper,
  IToWrapper,
  IValueWrapper,
} from '../definitions.interface';

/**
 * @stable [09.01.2020]
 */
export enum FieldConverterTypesEnum {
  DISPLAY_VALUE = 'DISPLAY_VALUE',
  GEO_CODER_RESULT = 'GEO_CODER_RESULT',
  PLACE_ENTITY = 'PLACE_ENTITY',
  PLACE_PARAMETER = 'PLACE_PARAMETER',
  SELECT_OPTION_ENTITY = 'SELECT_OPTION_ENTITY',
  STRING = 'STRING',
}

/**
 * @stable [09.01.2020]
 */
export interface IFieldConverterConfigEntity
  extends IConverterWrapper<(value: AnyT) => AnyT>,
    IFromWrapper<FieldConverterTypesEnum>,
    IToWrapper<FieldConverterTypesEnum>,
    IValueWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IFieldConverter {
  convert<TResult = AnyT>(config: IFieldConverterConfigEntity): TResult;
  converter(config: IFieldConverterConfigEntity): (value: AnyT) => AnyT;
  register(config: IFieldConverterConfigEntity): void;
}
