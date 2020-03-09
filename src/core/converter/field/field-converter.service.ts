import * as R from 'ramda';
import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  DatePeriodsEnum,
  DatesRangeValueT,
  DateTimeLikeTypeT,
  FIELD_DISPLAY_EMPTY_VALUE,
  FieldConverterTypesEnum,
  IDatesRangeEntity,
  IFieldConverter,
  IFieldConverterConfigEntity,
  IPhoneConfigEntity,
  IPlaceEntity,
  ISelectOptionEntity,
  TranslatorT,
} from '../../definition';
import {
  asPlaceEntity,
  isFn,
  isPrimitive,
  join,
  notEmptyValuesArrayFilter,
  notNilValuesArrayFilter,
} from '../../util';
import {
  AnyT,
  EntityIdT,
  StringNumberT,
} from '../../definitions.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';

@injectable()
export class FieldConverter implements IFieldConverter {
  private static readonly logger = LoggerFactory.makeLogger('FieldConverter');

  @lazyInject(DI_TYPES.Translate) protected readonly t: TranslatorT;
  protected readonly converters = new Map<string, (value: AnyT) => AnyT>();

  /**
   * @stable [09.01.2020]
   */
  constructor() {
    this.placeEntityAsDisplayValue = this.placeEntityAsDisplayValue.bind(this);
    this.selectOptionEntityAsDisplayValue = this.selectOptionEntityAsDisplayValue.bind(this);
    this.selectOptionEntityAsId = this.selectOptionEntityAsId.bind(this);
    this.zipCodeEntityAsDisplayValue = this.zipCodeEntityAsDisplayValue.bind(this);

    this.register({
      from: FieldConverterTypesEnum.GEO_CODER_RESULT,
      to: FieldConverterTypesEnum.PLACE_ENTITY,
      converter: asPlaceEntity,
    });
    this.register({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.placeEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.ZIP_CODE_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.zipCodeEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.PLACE_PARAMETER,
      converter: this.placeEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.SELECT_OPTION_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.selectOptionEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.SELECT_OPTION_ENTITY,
      to: FieldConverterTypesEnum.ID,
      converter: this.selectOptionEntityAsId,
    });
    this.register({
      from: FieldConverterTypesEnum.DATES_RANGE_ENTITY,
      to: FieldConverterTypesEnum.DATES_RANGE_VALUE,
      converter: this.datesRangeEntityAsDatesRangeValue,
    });
    this.register({
      from: FieldConverterTypesEnum.DATES_RANGE_VALUE,
      to: FieldConverterTypesEnum.DATES_RANGE_ENTITY,
      converter: this.datesRangeValueAsDatesRangeEntity,
    });
  }

  /**
   * @stable [09.01.2020]
   * @param {IFieldConverterConfigEntity} config
   */
  public register(config: IFieldConverterConfigEntity): void {
    this.converters.set(this.asKey(config), config.converter);

    FieldConverter.logger.debug(`[$FieldConverter][register] The converter has been registered successfully:`, config);
  }

  /**
   * @stable [24.12.2019]
   * @param {IPhoneConfigEntity<libphonenumber.PhoneNumberFormat>} config
   * @returns {string}
   */
  public convert(config: IFieldConverterConfigEntity): AnyT {
    const {value} = config;
    const converter = this.converter(config);
    if (!isFn(converter)) {
      throw new Error(`The converter is not registered! A config ${JSON.stringify(config)}:`);
    }
    return converter(value);
  }

  /**
   * @stable [09.01.2020]
   * @param {IFieldConverterConfigEntity} config
   * @returns {(value: AnyT) => AnyT}
   */
  public converter(config: IFieldConverterConfigEntity): (value: AnyT) => AnyT {
    return this.converters.get(this.asKey(config));
  }

  /**
   * @stable [28.01.2020]
   * @param {IPlaceEntity | string} placeEntity
   * @returns {string}
   */
  protected placeEntityAsDisplayValue(placeEntity: IPlaceEntity | string): string {
    if (R.isNil(placeEntity)) {
      return placeEntity;
    }
    if (isPrimitive(placeEntity)) {
      return placeEntity as string;
    }
    const placeEntityAsObject = placeEntity as IPlaceEntity;

    return join(
      notEmptyValuesArrayFilter(
        ...[
          `${placeEntityAsObject.streetNumber || ''} ${placeEntityAsObject.street || ''}`,
          placeEntityAsObject.city,
          placeEntityAsObject.region,
          placeEntityAsObject.country
        ].map((v) => (v || '').trim())
      ),
      ', '
    ) || placeEntityAsObject.formattedName || FIELD_DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [28.01.2020]
   * @param {IPlaceEntity | string} placeEntity
   * @returns {string}
   */
  protected zipCodeEntityAsDisplayValue(placeEntity: IPlaceEntity | string): string {
    if (R.isNil(placeEntity)) {
      return placeEntity;
    }
    if (isPrimitive(placeEntity)) {
      return placeEntity as string;
    }
    const placeEntityAsObject = placeEntity as IPlaceEntity;
    return placeEntityAsObject.zipCode || FIELD_DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [28.01.2020]
   * @param {ISelectOptionEntity | StringNumberT} option
   * @returns {StringNumberT}
   */
  protected selectOptionEntityAsDisplayValue(option: ISelectOptionEntity | StringNumberT): StringNumberT {
    if (R.isNil(option)) {
      return option;
    }
    if (isPrimitive(option)) {
      return option as StringNumberT;
    }
    const optionAsObject = option as ISelectOptionEntity;
    return R.isNil(optionAsObject.label)
      ? optionAsObject.value
      : this.t(optionAsObject.label, option);
  }

  /**
   * @stable [28.01.2020]
   * @param {ISelectOptionEntity | StringNumberT} option
   * @returns {EntityIdT}
   */
  protected selectOptionEntityAsId(option: ISelectOptionEntity | StringNumberT): EntityIdT {
    if (R.isNil(option)) {
      return option;
    }
    if (isPrimitive(option)) {
      return option as StringNumberT;
    }
    const optionAsObject = option as ISelectOptionEntity;
    return optionAsObject.value;
  }

  /**
   * @stable [07.03.2020]
   * @param {IDatesRangeEntity} entity
   * @returns {DatesRangeValueT}
   */
  protected datesRangeEntityAsDatesRangeValue(entity: IDatesRangeEntity): DatesRangeValueT {
    if (R.isNil(entity)) {
      return entity;
    }
    return notNilValuesArrayFilter<DateTimeLikeTypeT | DatePeriodsEnum>(
      entity.from,
      entity.to,
      entity.periodMode
    );
  }

  /**
   * @stable [07.03.2020]
   * @param {DatesRangeValueT} value
   * @returns {IDatesRangeEntity}
   */
  protected datesRangeValueAsDatesRangeEntity(value: DatesRangeValueT): IDatesRangeEntity {
    if (R.isNil(value)) {
      return value;
    }
    return {
      from: value[0] as DateTimeLikeTypeT,
      to: value[1] as DateTimeLikeTypeT,
      periodMode: value[2] as DatePeriodsEnum,
    };
  }

  /**
   * @stable [09.01.2020]
   * @param {IFieldConverterConfigEntity} config
   * @returns {string}
   */
  private asKey(config: IFieldConverterConfigEntity): string {
    return `${config.from}-${config.to}`;
  }
}
