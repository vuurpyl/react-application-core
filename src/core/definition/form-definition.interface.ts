import { EffectsActionBuilder } from 'redux-effects-promise';

import {
  AnyT,
  IActionsFactoryWrapper,
  IActionsRenderedWrapper,
  IAlwaysDirtyWrapper,
  IAlwaysResettableWrapper,
  IChangeableWrapper,
  IChangesWrapper,
  ICompactWrapper,
  IDefaultChangesWrapper,
  IDirtyWrapper,
  IDisabledWrapper,
  IEntity,
  IFormConfigurationWrapper,
  IFormIdWrapper,
  IFormWrapper,
  IFullWrapper,
  IKeyValue,
  IOnBeforeSubmitWrapper,
  IOnChangeWrapper,
  IOnDictionaryEmptyWrapper,
  IOnDictionaryLoadWrapper,
  IOnResetWrapper,
  IOnSubmitWrapper,
  IOnValidWrapper,
  IPrimaryFilterWrapper,
  IReadOnlyWrapper,
  IResetActionRenderedWrapper,
  IResetConfigurationWrapper,
  IResetIconWrapper,
  IResetTextWrapper,
  ISecondaryFilterWrapper,
  ISubmitConfigurationWrapper,
  ISubmitIconWrapper,
  ISubmitTextWrapper,
  IValidateOnMountWrapper,
  IValidWrapper,
} from '../definitions.interface';
import {
  IExtendedEntity,
  IReduxHolderActiveValueEntity,
  IReduxLifeCycleEntity,
} from './entity-definition.interface';
import { IApiEntity } from './api-definition.interface';
import {
  IButtonConfigurationEntity,
  IButtonProps,
  IGenericButtonEntity,
} from './button-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxFormEntity<TChanges = IKeyValue>
  extends IReduxHolderActiveValueEntity,
    IReduxLifeCycleEntity,
    IChangesWrapper<TChanges>,
    IDefaultChangesWrapper<TChanges>,
    IDirtyWrapper,
    IValidWrapper {
}

/**
 * @redux-holder-entity
 * @stable [12.06.2020]
 */
export interface IReduxHolderFormEntity<TEntity = IEntity>
  extends IFormWrapper<IReduxFormEntity<TEntity>> {
}

/**
 * @entity
 * @stable [08.05.2020]
 */
export interface IExtendedFormEntity<TEntity = IEntity>
  extends IReduxHolderFormEntity<TEntity>,
    IExtendedEntity<TEntity> {
}

/**
 * @flux-entity
 * @stable [08.05.2020]
 */
export interface IFluxValidEntity
  extends IValidWrapper {
}

/**
 * @entity
 * @stable [10.05.2020]
 */
export interface ISecondaryFilterReduxFormEntity<TEntity = IEntity>
  extends ISecondaryFilterWrapper<IReduxFormEntity<TEntity>> {
}

/**
 * @entity
 * @stable [10.05.2020]
 */
export interface IPrimaryFilterReduxFormEntity<TEntity = IEntity>
  extends IPrimaryFilterWrapper<IReduxFormEntity<TEntity>> {
}

/**
 * @entity
 * @stable [10.05.2020]
 */
export interface IPrimaryFilterFormEntity<TEntity = IEntity>
  extends IPrimaryFilterWrapper<IReduxHolderFormEntity<TEntity>> {
}

/**
 * @entity
 * @stable [10.05.2020]
 */
export interface ISecondaryFilterFormEntity<TEntity = IEntity>
  extends ISecondaryFilterWrapper<IReduxHolderFormEntity<TEntity>> {
}

/**
 * @entity
 * @stable [10.05.2020]
 */
export interface IPrimaryFilterExtendedFormEntity<TEntity = IEntity>
  extends IPrimaryFilterWrapper<IExtendedFormEntity<TEntity>> {
}

/**
 * @entity
 * @stable [10.05.2020]
 */
export interface ISecondaryFilterExtendedFormEntity<TEntity = IEntity>
  extends ISecondaryFilterWrapper<IExtendedFormEntity<TEntity>> {
}

/**
 * @presets-entity
 * @stable [08.05.2020]
 */
export interface IPresetsFormEntity<TEntity = IEntity>
  extends IActionsFactoryWrapper<(defaultActions: IFormExtraButtonEntity[]) => IFormExtraButtonEntity[]>,
    IActionsRenderedWrapper,
    IAlwaysDirtyWrapper,
    IAlwaysResettableWrapper,
    IButtonConfigurationEntity,
    IChangeableWrapper,
    ICompactWrapper,
    IDisabledWrapper,
    IFormIdWrapper,
    IFullWrapper,
    IOnBeforeSubmitWrapper<IApiEntity<TEntity>, boolean>,
    IOnChangeWrapper,
    IOnDictionaryEmptyWrapper<string, IApiEntity<TEntity>>,
    IOnDictionaryLoadWrapper<(items: AnyT, dictionary?: string) => void>,
    IOnResetWrapper,
    IOnSubmitWrapper<IApiEntity<TEntity>>,
    IOnValidWrapper,
    IReadOnlyWrapper,
    IResetActionRenderedWrapper,
    IResetConfigurationWrapper<IButtonProps>,
    IResetIconWrapper,
    IResetTextWrapper,
    ISubmitConfigurationWrapper<IButtonProps>,
    ISubmitIconWrapper,
    ISubmitTextWrapper,
    IValidateOnMountWrapper,
    IValidWrapper {
}

/**
 * @generic-entity
 * @stable [09.05.2020]
 */
interface IGenericFormEntity<TEntity = IEntity>
  extends IExtendedFormEntity<TEntity>,
    IPresetsFormEntity {
}

/**
 * @generic-container-entity
 * @stable [09.05.2020]
 */
export interface IGenericFormContainerEntity<TEntity = IEntity>
  extends IExtendedFormEntity<TEntity>,
    IFormConfigurationEntity {
}

/**
 * @props
 * @stable [09.05.2020]
 */
export interface IFormProps<TEntity = IEntity>
  extends IGenericComponentProps,
    IGenericFormEntity<TEntity> {
}

/**
 * @props
 * @stable [09.05.2020]
 */
export interface IFormContainerProps<TEntity = IEntity, TDictionaries = {}>
  extends IGenericContainerProps<TDictionaries>,
    IGenericFormContainerEntity<TEntity> {
}

/**
 * @configuration-entity
 * @stable [09.05.2020]
 */
export interface IFormConfigurationEntity<TProps extends IFormProps = IFormProps>
  extends IFormConfigurationWrapper<TProps> {
}

/**
 * TODO Replace with IPressetsButtonEntity
 * @deprecated
 */
export interface IFormExtraButtonEntity
  extends IGenericButtonEntity {
}

/**
 * @default-entity
 * @stable [09.06.2020]
 */
export const DEFAULT_COMPACT_FORM_ENTITY = Object.freeze<IPresetsFormEntity>({
  actionsRendered: false,
  compact: true,
});

/**
 * @default-entity
 * @stable [21.02.2020]
 */
export const DEFAULT_FORM_FIELD_CONTROLLER_ENTITY = Object.freeze<IGenericFormEntity>({
  actionsRendered: false,
  compact: true,
  full: false,
});

/**
 * @default-entity
 * @stable [21.02.2020]
 */
export const DEFAULT_FULL_FORM_FIELD_CONTROLLER_ENTITY = Object.freeze<IGenericFormEntity>({
  ...DEFAULT_FORM_FIELD_CONTROLLER_ENTITY,
  full: true,
});

/**
 * @initial-redux-entity
 * @stable [08.05.2020]
 */
export const INITIAL_REDUX_FORM_ENTITY = Object.freeze<IReduxFormEntity>({
  changes: {},
  defaultChanges: {},
});

/**
 * @classes
 * @stable [23.03.2020]
 */
export enum FormClassesEnum {
  FORM = 'rac-form',
  FORM_ACTIONS = 'rac-form__actions',
  FORM_BODY = 'rac-form__body',
  FULL_FORM = 'rac-full-form',
}

/**
 * @stable [01.04.2020]
 */
export const FORM_ACTIVE_VALUE_ACTION_TYPE = 'form.active.value';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
export const FORM_CLEAR_ACTION_TYPE = 'form.clear';
export const FORM_DEFAULT_CHANGE_ACTION_TYPE = 'form.default.change';
export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_INACTIVE_VALUE_ACTION_TYPE = 'form.inactive.value';
export const FORM_PROGRESS_ACTION_TYPE = 'form.progress';
export const FORM_RESET_ACTION_TYPE = 'form.reset';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_FINISH_ACTION_TYPE = 'form.submit.finish';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
