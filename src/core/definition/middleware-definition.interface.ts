import { IEffectsAction } from 'redux-effects-promise';

import {
  IContainerSectionWrapper,
  IDefaultChangesWrapper,
  IFormSectionWrapper,
  ILazyLoadingWrapper,
  IListAccessorWrapper,
  IListSectionWrapper,
  INavigateBackWrapper,
  INextSectionWrapper,
  IPathWrapper,
  IPayloadWrapper,
  IStateWrapper,
  ICustomActionsWrapper,
  IFiltersSectionsWrapper,
  IFormsSectionsWrapper,
  ITabPanelsSectionsWrapper,
  ITypeWrapper,
  IListsSectionsWrapper,
  ISectionNameWrapper,
  ISucceedTextWrapper,
  ITabPanelSectionWrapper,
} from '../definitions.interface';
import { IEffectsActionEntity } from './redux-definition.interface';
import { IGenericListEntity } from './list-definition.interface';

/**
 * @stable [19.10.2019]
 */
export type ChainedMiddlewarePayloadFnT<TState, TPayload> =
  ((payload: TPayload, state: TState, action: IEffectsAction) => string);

/**
 * @stable [19.10.2019]
 */
export type ChainedMiddlewarePayloadT<TState, TPayload> = string | ChainedMiddlewarePayloadFnT<TState, TPayload>;

/**
 * @stable [29.03.2020]
 */
export type SectionT<TState> = string | ((cfg: IActionStateEntity<TState>) => string);

/**
 * @entity
 * @stable [29.03.2020]
 */
export interface IActionStateEntity<TState = {}>
  extends IEffectsActionEntity,
    IStateWrapper<TState> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IFormMiddlewareConfigEntity<TState = {}>
  extends IFormSectionWrapper<SectionT<TState>> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface ITabPanelMiddlewareConfigEntity<TState = {}>
  extends ITabPanelSectionWrapper<SectionT<TState>> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IContainerMiddlewareConfigEntity<TState = {}>
  extends IContainerSectionWrapper<SectionT<TState>> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IListMiddlewareConfigEntity<TState = {}>
  extends IListSectionWrapper<SectionT<TState>> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface ILoadedListMiddlewareConfigEntity<TState = {}>
  extends IActionStateEntity<TState>,
    IListMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface ILoadedListOnTabActivateMiddlewareConfigEntity<TState = {}>
  extends ILoadedListMiddlewareConfigEntity<TState>,
    ITabPanelMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [15.06.2020]
 */
export interface ILoadedListOnNavigateToPageMiddlewareConfigEntity<TState = {}>
  extends ILoadedListMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [11.04.2020]
 */
export interface ILoadedListOnToolbarToolsRefreshConfigEntity<TState = {}>
  extends ILoadedListMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface ILoadedListOnFormValidMiddlewareConfigEntity<TState = {}>
  extends ILoadedListMiddlewareConfigEntity<TState>,
    IFormMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IUntouchedListMiddlewareConfigEntity<TState = {}, TDefaultChanges = {}>
  extends IContainerMiddlewareConfigEntity<TState>,
    IDefaultFormChangesMiddlewareConfigEntity<TDefaultChanges, TState>,
    IListAccessorWrapper<(state: TState) => IGenericListEntity>,
    ILoadedListMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IDefaultFormChangesMiddlewareConfigEntity<TDefaultChanges = {}, TState = {}>
  extends IDefaultChangesWrapper<TDefaultChanges | (() => TDefaultChanges)>,
    IFormMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [26.03.2020]
 */
export interface IChainedMiddlewareConfigEntity<TState, TPayload = {}>
  extends IActionStateEntity<TState>,
    INextSectionWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IPayloadWrapper<TPayload> {
}

/**
 * @config-entity
 * @stable [26.03.2020]
 */
export interface IEditedListMiddlewareConfigEntity<TPayload = {}, TState = {}, TDefaultChanges = {}>
  extends IDefaultFormChangesMiddlewareConfigEntity<TDefaultChanges, TState>,
    ILazyLoadingWrapper,
    ILoadedListMiddlewareConfigEntity<TState>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TPayload>> {
}

/**
 * @config-entity
 * @stable [11.04.2020]
 */
export interface ISucceedEditedListMiddlewareConfigEntity<TState = {}>
  extends ILoadedListMiddlewareConfigEntity<TState>,
    IContainerMiddlewareConfigEntity<TState>,
    IFormMiddlewareConfigEntity<TState>,
    INavigateBackWrapper,
    ISucceedTextWrapper<string | boolean> {
}

/**
 * @config-entity
 * @stable [11.04.2020]
 */
export interface ISucceedFormMiddlewareConfigEntity<TState = {}>
  extends IFormMiddlewareConfigEntity<TState>,
    INavigateBackWrapper,
    ISucceedTextWrapper<string | boolean> {
}

/**
 * @config-entity
 * @stable [23.04.2020]
 */
export interface IFilterFormDialogMiddlewareConfigEntity<TState = {}>
  extends IFormMiddlewareConfigEntity<TState>,
    ILoadedListMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [27.04.2020]
 */
export interface IFilteredListMiddlewareConfigEntity<TState = {}>
  extends IFormMiddlewareConfigEntity<TState>,
    ILoadedListMiddlewareConfigEntity {
}

/**
 * @stable [27.04.2020]
 */
export enum DestroyedContainerTypesEnum {
  FILTER,
  FORM,
  LIST,
  TAB_PANEL,
}

/**
 * @config-entity
 * @stable [27.04.2020]
 */
export interface IDestroyedContainerMiddlewareConfigEntity
  extends ICustomActionsWrapper<string[]>,
    IFiltersSectionsWrapper<string[]>,
    IFormsSectionsWrapper<string[]>,
    IListsSectionsWrapper<string[]>,
    ISectionNameWrapper,
    ITabPanelsSectionsWrapper<string[]>,
    ITypeWrapper<DestroyedContainerTypesEnum> {
}
