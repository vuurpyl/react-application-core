import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import {
  FormClassesEnum,
  IApiEntity,
  IBaseEvent,
  IButtonProps,
  IconsEnum,
  IField,
  IFieldProps,
  IFieldsPresets,
  IFormProps,
  IReduxFormEntity,
  ITextFieldProps,
  UniversalIdProviderContext,
} from '../../definition';
import {
  CalcUtils,
  cloneReactNodes,
  ClsUtils,
  ConditionUtils,
  defValuesFilter,
  FilterUtils,
  FormUtils,
  getFormFieldValue,
  ifNotNilThanValue,
  isFormFieldDisabled,
  isFormFieldReadOnly,
  isFormResettable,
  isFormSubmittable,
  isNewEntity,
  isObjectNotEmpty,
  mapApiEntity,
  notNilValuesFilter,
  ObjectUtils,
  orNull,
  selectChanges,
  TypeUtils,
  WrapperUtils,
} from '../../util';
import {
  AnyT,
  IEntity,
} from '../../definitions.interface';
import { GenericComponent } from '../base';
import { Button } from '../button';
import { Field2 } from '../field';
import { IFieldProps2 } from '../../configurations-definitions.interface';  // TODO
import {
  DI_TYPES,
  lazyInject,
} from '../../di';

export class Form extends GenericComponent<IFormProps, {}, HTMLFormElement> {

  public static readonly defaultProps: IFormProps = {
    actionsRendered: true,
    validateOnMount: true,
  };

  private static readonly logger = LoggerFactory.makeLogger('Form');

  @lazyInject(DI_TYPES.FieldsPresets) private readonly fieldsPresets: IFieldsPresets;

  /**
   * @stable [30.06.2020]
   * @param {IFormProps} originalProps
   */
  constructor(originalProps: IFormProps) {
    super(originalProps);

    this.doSubmit = this.doSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @stable [30.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      actionsRendered,
      compact,
      formId,
      style,
    } = this.originalProps;
    const nodes = this.formNodes;

    const formElement = (
      <form
        ref={this.actualRef}
        style={style}
        autoComplete='off'
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        className={this.className}
      >
        {
          compact
            ? nodes
            : (
              <div className={FormClassesEnum.FORM_BODY}>
                {nodes}
              </div>
            )
        }
        {
          actionsRendered && (
            <div className={FormClassesEnum.FORM_ACTIONS}>
              {this.formActionsElement}
            </div>
          )
        }
      </form>
    );

    if (R.isNil(formId)) {
      return formElement;
    }

    return (
      <UniversalIdProviderContext.Provider
        value={formId}
      >
        {formElement}
      </UniversalIdProviderContext.Provider>
    );
  }

  /**
   * @stable [30.06.2020]
   */
  public componentDidMount(): void {
    if (this.originalProps.validateOnMount) {
      this.throwOnValid();
    }
  }

  /**
   * @stable [30.06.2020]
   */
  public submit(): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onSubmit, (onSubmit) => onSubmit(this.apiEntity));
  }

  /**
   * @stable [23.04.2020]
   * @param {string} name
   * @param {AnyT} value
   */
  private onChange(name: string, value: AnyT): void {
    const {onChange} = this.mergedProps;

    if (TypeUtils.isFn(onChange)) {
      if (isObjectNotEmpty(name)) {
        onChange({[name]: value});
        this.throwOnValid();
      } else {
        Form.logger.warn('[$Form][onChange] The field has no name. The field value:', value);
      }
    }
  }

  /**
   * @stable [09.05.2020]
   * @param {IField} field
   */
  private onFieldDictionaryEmpty(field: IField): void {
    const {onDictionaryEmpty} = this.mergedProps;

    if (TypeUtils.isFn(onDictionaryEmpty)) {
      onDictionaryEmpty(field.props.bindDictionary, this.apiEntity);
    }
  }

  /**
   * @stable [09.05.2020]
   * @param {IField} field
   * @param {AnyT} items
   */
  private onFieldDictionaryLoad(field: IField, items: AnyT): void {
    const {onDictionaryLoad} = this.mergedProps;

    if (TypeUtils.isFn(onDictionaryLoad)) {
      onDictionaryLoad(items, field.props.bindDictionary);
    }
  }

  /**
   * @stable [12.06.2020]
   */
  private throwOnValid(): void {
    const {
      valid,
    } = this.originalProps;

    ConditionUtils.ifNotNilThanValue(
      this.mergedProps.onValid,
      (onValid) => onValid(
        TypeUtils.isBoolean(valid) || this.actualRef.current.checkValidity()
      )
    );
  }

  /**
   * @stable [30.01.2020]
   */
  private doSubmit(): void {
    this.onSubmit();
  }

  /**
   * @stable [12.06.2020]
   * @param {IBaseEvent} event
   */
  private onSubmit(event?: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);

    const {onBeforeSubmit} = this.mergedProps;

    if (TypeUtils.isFn(onBeforeSubmit)) {
      const apiEntity = this.apiEntity;

      if (onBeforeSubmit(apiEntity) !== false) {
        this.submit();
      }
    } else {
      this.submit();
    }
  }

  /**
   * @stable [12.06.2020]
   * @param {IBaseEvent} event
   */
  private onReset(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);

    ConditionUtils.ifNotNilThanValue(this.mergedProps.onReset, (onReset) => onReset());
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isFormValid(): boolean {
    return FormUtils.isValid(this.props);
  }

  /**
   * @stable [23.03.2020]
   * @returns {boolean}
   */
  private get isFormSubmittable(): boolean {
    return isFormSubmittable(this.props);
  }

  /**
   * @stable [23.03.2020]
   * @returns {boolean}
   */
  private get isFormResettable(): boolean {
    return isFormResettable(this.props);
  }

  /**
   * @stable [03.02.2020]
   * @returns {boolean}
   */
  private get isFormOfNewEntity(): boolean {
    return isNewEntity(this.props.entity);
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isFormBusy(): boolean {
    return FormUtils.inProgress(this.props);
  }

  /**
   * @stable [25.09.2019]
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldReadOnly(field: IField): boolean {
    return isFormFieldReadOnly(this.props, field.props);
  }

  /**
   * @stable [23.03.2020]
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldDisabled(field: IField): boolean {
    return isFormFieldDisabled(this.props, field.props);
  }

  /**
   * @stable [23.03.2020]
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldChangeable(field: IField): boolean {
    return FormUtils.isFieldChangeable(this.originalProps, field.props);
  }

  /**
   * @stable [16.11.2019]
   * @param {IField} field
   * @returns {AnyT}
   */
  private getFieldValue(field: IField): AnyT {
    return getFormFieldValue(this.originalProps, field.props);
  }

  /**
   * @stable [11.05.2020]
   * @param {IField} field
   * @returns {AnyT}
   */
  private getFieldOriginalValue(field: IField): AnyT {
    return FormUtils.fieldOriginalValue(this.originalProps, field.props);
  }

  /**
   * @stable [11.05.2020]
   * @param {IField} field
   * @param {IFieldProps} defaultProps
   * @returns {AnyT}
   */
  private getFieldDisplayValue(field: IField, defaultProps: IFieldProps): AnyT {
    return FormUtils.fieldDisplayValue(this.originalProps, field.props, defaultProps);
  }

  /**
   * @stable [03.02.2020]
   * @param {IField} field
   * @returns {IFieldProps2}
   */
  private getPredefinedFieldProps(field: IField): IFieldProps2 {
    const props = this.fieldsPresets[field.props.name];

    let resultProps: IFieldProps2;
    if (TypeUtils.isString(props)) {
      resultProps = {label: props as string};
    } else if (TypeUtils.isFn(props)) {
      resultProps = (props as (field) => IFieldProps2)(field);
    } else {
      resultProps = props as IFieldProps2;
    }
    return resultProps;
  }

  /**
   * @stable [13.02.2020]
   * @returns {JSX.Element}
   */
  private get formActionsElement(): JSX.Element {
    const props = this.props;
    const actions = this.actions;
    const actualActions = TypeUtils.isFn(props.actionsFactory) ? props.actionsFactory(actions) : actions;

    return (
      <React.Fragment>
        {actualActions
          .map(
            (action, index) => (
              <Button
                key={`form-action-${action.text || index}`}
                {...action}
                onClick={ifNotNilThanValue(action.onClick, () => () => action.onClick(this.apiEntity))}/>
            )
          )}
      </React.Fragment>
    );
  }

  /**
   * @stable [03.02.2020]
   * @returns {React.ReactNode[]}
   */
  private get formNodes(): React.ReactNode[] {
    return (
      cloneReactNodes<IFieldProps2>(
        this,
        (field: IField) => {
          const fieldProps: ITextFieldProps = field.props; // TODO Props
          const predefinedOptions = this.getPredefinedFieldProps(field);

          return defValuesFilter<ITextFieldProps, ITextFieldProps>(
            {
              value: this.getFieldValue(field),
              originalValue: this.getFieldOriginalValue(field),
              displayValue: this.getFieldDisplayValue(field, predefinedOptions),
              readOnly: this.isFieldReadOnly(field),
              disabled: this.isFieldDisabled(field),
              changeable: this.isFieldChangeable(field),
              onFormChange: this.onChange,

              ...(
                fieldProps.bindDictionary && ({
                  ...(
                    !TypeUtils.isFn(fieldProps.onDictionaryEmpty)
                      ? ({onDictionaryEmpty: () => this.onFieldDictionaryEmpty(field)})
                      : {}
                  ),
                  ...(
                    !TypeUtils.isFn(fieldProps.onDictionaryLoad)
                      ? ({onDictionaryLoad: (itms) => this.onFieldDictionaryLoad(field, itms)})
                      : {}
                  ),
                })
              ),

              ...predefinedOptions,

              // The fields props have a higher priority
              ...defValuesFilter<ITextFieldProps, ITextFieldProps>({
                label: fieldProps.label,
                placeholder: fieldProps.placeholder,
                prefixLabel: fieldProps.prefixLabel,
                type: fieldProps.type,
              }),
            }
          );
        },
        (child) => Field2.isPrototypeOf(child.type),
        (child) => (child.props as IFieldProps).rendered,
      )
    );
  }

  /**
   * @stable [12.06.2020]
   * @returns {boolean}
   */
  private get hasError(): boolean {
    return ObjectUtils.isObjectNotEmpty(this.form.error);
  }

  /**
   * @stable [13.02.2020]
   * @returns {IButtonProps[]}
   */
  private get actions(): IButtonProps[] {
    const props = this.props;
    const {
      buttonConfiguration = {},
      resetConfiguration = {},
      submitConfiguration = {},
    } = props;
    const messages = this.settings.messages;

    return FilterUtils.objectValuesArrayFilter(
      props.resetActionRendered && notNilValuesFilter<IButtonProps, IButtonProps>({
        type: 'reset',
        icon: props.resetIcon || IconsEnum.TIMES,
        disabled: !this.isFormResettable,
        text: props.resetText || messages.RESET,
        ...buttonConfiguration,
        ...resetConfiguration,
        onClick: null,
      }),
      notNilValuesFilter<IButtonProps, IButtonProps>({
        type: 'submit',
        icon: this.isFormValid ? (props.submitIcon || IconsEnum.CHECK_CIRCLE) : 'exclamation',
        raised: true,
        disabled: !this.isFormSubmittable,
        progress: this.isFormBusy,
        error: this.hasError,
        text: props.submitText || (this.isFormOfNewEntity ? messages.CREATE : messages.SAVE),
        ...buttonConfiguration,
        ...submitConfiguration,
        onClick: orNull(submitConfiguration.type === 'button', () => this.doSubmit),
      })
    );
  }

  /**
   * @stable [18.04.2020]
   * @returns {IApiEntity}
   */
  public get apiEntity(): IApiEntity {
    return mapApiEntity({
      changes: selectChanges(this.form),
      entity: this.entity,
      originalEntity: this.originalEntity,
    });
  }

  /**
   * @stable [12.06.2020]
   * @returns {string}
   */
  private get className(): string {
    const originalProps = this.originalProps;
    const {
      className,
    } = originalProps;

    return ClsUtils.joinClassName(
      FormClassesEnum.FORM,
      WrapperUtils.isFull(originalProps) && FormClassesEnum.FULL_FORM,
      CalcUtils.calc(className)
    );
  }

  /**
   * @stable [12.06.2020]
   * @returns {IReduxFormEntity<IEntity>}
   */
  private get form(): IReduxFormEntity<IEntity> {
    return this.originalProps.form;
  }

  /**
   * @stable [12.06.2020]
   * @returns {IEntity}
   */
  private get originalEntity(): IEntity {
    return this.originalProps.originalEntity;
  }

  /**
   * @stable [12.06.2020]
   * @returns {IEntity}
   */
  private get entity(): IEntity {
    return this.originalProps.entity;
  }
}
