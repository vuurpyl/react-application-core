import * as React from 'react';
import * as CSS from 'csstype';

import {
  AnyT,
  EntityIdT,
  IAccessDeniedWrapper,
  IActionButtonsWrapper,
  IActionedWrapper,
  IActionIconsWrapper,
  IActionIconWrapper,
  IActionsDisabledWrapper,
  IActionsPosition,
  IActionsWrapper,
  IActiveValueWrapper,
  IActiveWrapper,
  IAfterEnterWrapper,
  IAliasWrapper,
  IAlignWrapper,
  IAlwaysDirtyWrapper,
  IApplyGroupWrapper,
  IApplyOddWrapper,
  IAutoCompleteWrapper,
  IAutoFocusWrapper,
  IAvatarWrapper,
  IBackwardRenderedWrapper,
  IBasenameWrapper,
  IBeforeEnterWrapper,
  IBindDictionaryWrapper,
  IBooleanEmptyDataWrapper,
  IBooleanModalWrapper,
  ICallbackWrapper,
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  ICanReturnClearDirtyChangesValueWrapper,
  ICaretBlinkingFrequencyTimeoutWrapper,
  ICenterAlignmentWrapper,
  ICenteredMenuWrapper,
  ICenteredWrapper,
  IChangeableWrapper,
  IChangeFormWrapper,
  IChildrenWrapper,
  IClassNameWrapper,
  IClearActionWrapper,
  IColSpanWrapper,
  IColumnClassNameWrapper,
  IColumnColSpanWrapper,
  IColumnNameWrapper,
  IColumnRenderedWrapper,
  IColumnStylesWrapper,
  IColumnTitleWrapper,
  IColumnWidthWrapper,
  ICompactWrapper,
  IComputedMatchWrapper,
  IContentStyleWrapper,
  IContentWrapper,
  ICssStyleWrapper,
  IDeactivatedWrapper,
  IDefaultValue,
  IDelayTimeoutWrapper,
  IDisabledWrapper,
  IDisplayMessageWrapper,
  IDisplayNameWrapper,
  IDrawerContentStyleWrapper,
  IDrawerContentWrapper,
  IEditableWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IEntity,
  IEntityToClassNameWrapper,
  IEntityWrapper,
  IErrorMessageRenderedWrapper,
  IErrorMessageWrapper,
  IExactWrapper,
  IExpandActionRenderedWrapper,
  IExpandedGroupsWrapper,
  IFactorWrapper,
  IFieldRenderedWrapper,
  IFieldWrapper,
  IFilterFnWrapper,
  IFilterPlaceholderWrapper,
  IFilterRendererWrapper,
  IFilterWrapper,
  IFocusEvent,
  IForwardRenderedWrapper,
  IFullWrapper,
  IGroupByWrapper,
  IHasContentWrapperWrapper,
  IHeaderActionIconStyleWrapper,
  IHeaderActionStyleWrapper,
  IHeaderBackActionEnabledWrapper,
  IHeaderClassNameWrapper,
  IHeaderColSpanWrapper,
  IHeaderContentWrapper,
  IHeaderMenuActionEnabledWrapper,
  IHeaderRenderedWrapper,
  IHeaderRendererWrapper,
  IHeaderStyleWrapper,
  IHeaderTitleStyleWrapper,
  IHeaderWidthWrapper,
  IHideNavBarWrapper,
  IHomeWrapper,
  IHoveredWrapper,
  IIconWrapper,
  IIndexWrapper,
  IInitialWrapper,
  IItemsWrapper,
  IKeyboardConfigurationWrapper,
  IKeyboardEvent,
  IKeyValue,
  IKeyWrapper,
  ILabelWrapper,
  ILayoutWrapper,
  ILinkWrapper,
  ILocalFilterFnWrapper,
  ILogoutWrapper,
  IMappersWrapper,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IMaxCountWrapper,
  IMessageWrapper,
  IMoreOptionsWrapper,
  IMultiWrapper,
  INameWrapper,
  INavigationActionTypeWrapper,
  INotUseFieldWrapper,
  IOnBlurWrapper,
  IOnChangeFilterWrapper,
  IOnChangeGroupingWrapper,
  IOnChangeHeaderWrapper,
  IOnChangeSortingWrapper,
  IOnChangeWrapper,
  IOnClearWrapper,
  IOnClickWrapper,
  IOnCloseWrapper,
  IOnCreateWrapper,
  IOnDeactivateWrapper,
  IOnDelayWrapper,
  IOnEmptyDictionaryWrapper,
  IOnEnterWrapper,
  IOnFilterChangeWrapper,
  IOnFocusWrapper,
  IOnLoadDictionaryWrapper,
  IOnMoreOptionsSelectWrapper,
  IOnScrollWrapper,
  IOnSelectWrapper,
  IParamsWrapper,
  IParentWrapper,
  IPathWrapper,
  IPatternWrapper,
  IPluginsWrapper,
  IPrefixLabelWrapper,
  IPreventFocusWrapper,
  IProfileWrapper,
  IQueryWrapper,
  IReadOnlyWrapper,
  IRegisterWrapper,
  IRenderedWrapper,
  IRendererWrapper,
  IRenderToBodyWrapper,
  IRenderToXWrapper,
  IRenderToYWrapper,
  IRequiredWrapper,
  IResetActionRenderedWrapper,
  IResetIconWrapper,
  IRestoreAuthWrapper,
  IRippableWrapper,
  ISectionNameWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISeparatorsWrapper,
  IShadowStyleWrapper,
  ISignInWrapper,
  ISignUpWrapper,
  ISimpleWrapper,
  ISorterFnWrapper,
  IStepWrapper,
  IStickyHeadWrapper,
  IStringArrayExcludeTargetsClassesWrapper,
  IStyleWrapper,
  ISubBorderWrapper,
  ITightGridWrapper,
  ITitleRendererWrapper,
  ITitleWrapper,
  ITotalEntityWrapper,
  ITplFnWrapper,
  ITplWrapper,
  ITypeWrapper,
  IUnregisterWrapper,
  IUrlWrapper,
  IUseAddActionWrapper,
  IUseDrawerWrapper,
  IUseFilterWrapper,
  IUseGroupingWrapper,
  IUseHeaderWrapper,
  IUseIndicatorWrapper,
  IUseKeyboardWrapper,
  IUseSortingWrapper,
  IUseSyntheticCursorWrapper,
  IValidateWrapper,
  IValidationGroupWrapper,
  IValueWrapper,
  IWarningWrapper,
  IWidthWrapper,
  IWrapperClassNameWrapper,
  StringNumberT,
} from './definitions.interface';
import {
  IFieldChangeEntity,
  IMenuItemEntity,
  ISortDirectionEntity,
  IUniversalApplicationStoreEntity,
  IUniversalComponent,
  IUniversalComponentPluginClassEntity,
  IUniversalContainerClassEntity,
  IXYEntity,
} from './entities-definitions.interface';
import { IGridColumnProps } from './props-definitions.interface';
import {
  IReactOnClickWrapper,
  IOnColumnClickWrapper,
  IOnNavigationActionClickWrapper,
} from './react-definitions.interface';
import {
  IApiEntity,
  IBaseEvent,
  IButtonProps,
  IGenericButtonEntity,
  IGenericFieldEntity,
  IGenericFormEntity,
} from './definition';

/**
 * @stable [16.06.2018]
 */
export interface IButtonConfigurationWrapper<TButtonConfiguration = IButtonProps> {
  buttonConfiguration?: TButtonConfiguration;
}

/**
 * @stable [31.05.2018]
 */
export interface IHeaderConfigurationWrapper<THeaderConfiguration = ISubHeaderConfiguration> {
  headerConfiguration?: THeaderConfiguration;
}

/**
 * @stable [14.05.2018]
 */
export interface IItemConfigurationWrapper<TItemConfiguration> {
  itemConfiguration?: TItemConfiguration;
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterConfigurationWrapper<TFilterConfiguration = IFilterConfiguration> {
  filterConfiguration?: IFilterConfiguration;
}

/**
 * @stable [18.05.2018]
 */
export interface IFieldConfigurationWrapper<TFieldConfiguration = IFieldConfiguration> {
  fieldConfiguration?: TFieldConfiguration;
}

/**
 * @stable [14.05.2018]
 */
export interface IMenuConfigurationWrapper<TMenuConfiguration = IMenuConfiguration> {
  menuConfiguration?: TMenuConfiguration;
}

/**
 * @stable [14.05.2018]
 */
export interface IColumnsConfigurationWrapper<TColumnsConfiguration = IGridColumnConfiguration[]> {
  columnsConfiguration?: TColumnsConfiguration;
}

/**
 * @stable [14.05.2018]
 */
export interface IListConfigurationWrapper<TListConfiguration = IListConfiguration> {
  listConfiguration?: TListConfiguration;
}

/**
 * @stable [02.06.2018]
 */
export interface IGridConfigurationWrapper<TGridConfiguration = IGridConfiguration> {
  gridConfiguration?: TGridConfiguration;
}

/**
 * @stable [31.08.2018]
 */
export interface ITabPanelConfigurationWrapper<TabPanelConfiguration = ITabPanelConfiguration> {
  tabPanelConfiguration?: TabPanelConfiguration;
}

/* @stable - 14.04.2018 */
export interface IRouteConfigurationWrapper<TRouteConfiguration> {
  routeConfiguration?: TRouteConfiguration;
}

/**
 * @stable [14.04.2018]
 */
export interface IAccessConfigurationWrapper<TAccessConfiguration> {
  accessConfiguration?: TAccessConfiguration;
}

/**
 * @stable [18.06.2018]
 */
export interface IUniversalKeyboardHandlersConfiguration<TKeyboardEvent> {
  onKeyTab?(event: TKeyboardEvent): void;
  onKeyEnter?(event: TKeyboardEvent): void;
  onKeyUp?(event: TKeyboardEvent): void;
  onKeyDown?(event: TKeyboardEvent): void;
  onKeyEscape?(event: TKeyboardEvent): void;
  onKeyArrowDown?(event: TKeyboardEvent): void;
  onKeyArrowUp?(event: TKeyboardEvent): void;
  onKeyBackspace?(event: TKeyboardEvent): void;
}

/**
 * @stable [16.05.2018]
 */
export interface INavigationHandlersConfiguration {
  onPrevious?(): void;
  onNext?(): void;
  onFirst?(): void;
  onLast?(): void;
}

/**
 * @stable [27.05.2018]
 */
export interface IBootstrapConfiguration {
  rootId?: string;
  needToPrepareBody?: boolean;
  needToDefineErrorHandler?: boolean;
}

/**
 * @stable [27.05.2018]
 */
export const DEFAULT_BOOTSTRAP_CONFIGURATION: IBootstrapConfiguration = {
  rootId: 'root',
  needToPrepareBody: true,
  needToDefineErrorHandler: true,
};

/**
 * @stable [24.04.2018]
 */
export interface IWebComponentConfiguration<TClassName = string>
  extends IClassNameWrapper<TClassName>,
          ICssStyleWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IWebContainerConfiguration extends IWebComponentConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface IReactComponentConfiguration
  extends React.ClassAttributes<AnyT>,
          ITitleWrapper,
          IOnScrollWrapper<IXYEntity>,
          IPluginsWrapper<IUniversalComponentPluginClassEntity | IUniversalComponentPluginClassEntity[]>,
          IRegisterWrapper<(component: IUniversalComponent) => void>,
          IUnregisterWrapper<(component: IUniversalComponent) => void> {
}

/**
 * @stable [27.04.2018]
 */
export interface IUniversalContainerConfiguration extends ITitleWrapper,
                                                          ISectionNameWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IContainerConfiguration extends IUniversalContainerConfiguration,
                                                 IWebContainerConfiguration {
}

/**
 * @stable [24.04.2018]
 */
export interface IUniversalListItemConfiguration extends IReactComponentConfiguration,
                                                         IRendererWrapper,
                                                         IIndexWrapper,
                                                         ITplFnWrapper,
                                                         IWarningWrapper {
}

/* @stable [24.04.2018] */
export interface IRnListItemConfiguration extends IUniversalListItemConfiguration,
                                                  IAvatarWrapper<string | ((data: IKeyValue) => string)>,
                                                  ISeparatorsWrapper<IKeyValue> {
}

/* @stable - 31.03.2018 */
export interface IListItemConfiguration extends IUniversalListItemConfiguration,
                                                IWebComponentConfiguration,
                                                IEntityToClassNameWrapper,
                                                IIconWrapper<UIIconConfigurationT> {
}

/**
 * @stable [04.05.2018]
 */
export interface ICardListItemConfiguration extends IUniversalListItemConfiguration,
                                                    IWebComponentConfiguration<string | ((...args) => string)>,
                                                    IActionButtonsWrapper<(entity: IEntity) => React.ReactNode>,
                                                    IActionIconsWrapper<(entity: IEntity) => React.ReactNode> {
  rippable?: boolean; // TODO
  rippled?: boolean; // TODO
}

/**
 * @stable [05.10.2018]
 */
export type GroupValueRendererT = (groupedRowValue: EntityIdT, groupedRows: IEntity[]) => React.ReactNode;

/* @stable [23.04.2018] */
export interface IUniversalListConfiguration
    <TItemConfiguration extends IUniversalListItemConfiguration = IUniversalListItemConfiguration>
  extends IReactComponentConfiguration,
          IFilterAndSorterConfiguration,
          IEmptyMessageWrapper,
          IEmptyDataMessageWrapper,
          IUseAddActionWrapper,
          IOnCreateWrapper,
          IOnSelectWrapper,
          IOnChangeWrapper<IFieldChangeEntity>,
          IOnChangeHeaderWrapper<IFieldChangeEntity>,
          IOnChangeFilterWrapper<IFieldChangeEntity>,
          IItemConfigurationWrapper<TItemConfiguration>,
          IDeactivatedWrapper,
          IApplyOddWrapper,
          IApplyGroupWrapper,
          IHoveredWrapper,
          IFullWrapper,
          ISelectableWrapper,
          IGroupByWrapper<{
            columnName: string,
            groupValue: GroupValueRendererT | GroupValueRendererT[]
          }> {
  useLocalFiltering?: boolean;
  useLocalSorting?: boolean;
}

/* @stable [24.04.2018] */
export interface IRnListConfiguration extends IUniversalListConfiguration<IRnListItemConfiguration> {
}

/* @stable - 04.04.2018 */
export interface ICardListConfiguration extends IUniversalListConfiguration<ICardListItemConfiguration>,
  IWebComponentConfiguration {
}

/* @stable - 04.04.2018 */
export interface IListConfiguration extends IUniversalListConfiguration<IListItemConfiguration>,
                                            IWebComponentConfiguration {
}

/**
 * @stable [04.08.2018]
 */
export interface IUniversalFormConfiguration extends IGenericFormEntity,
                                                     IReactComponentConfiguration,
                                                     IResetActionRenderedWrapper,
                                                     IEditableWrapper,
                                                     IDisabledWrapper,
                                                     IAlwaysDirtyWrapper,
                                                     IActionIconWrapper,
                                                     IResetIconWrapper,
                                                     IChangeableWrapper,
                                                     IFullWrapper,
                                                     IOnEmptyDictionaryWrapper<IApiEntity> {
}

export interface IFormExtraActionProps
  extends IGenericButtonEntity,
    IOnClickWrapper<(apiEntity: IApiEntity) => void> {
}

export interface IFormConfigurationEntity extends IUniversalFormConfiguration,
                                            IWebComponentConfiguration,
                                            IButtonConfigurationWrapper,
                                            IReadOnlyWrapper,
                                            ICompactWrapper {
  actionsProvider?: (defaultActions: IFormExtraActionProps[]) => IFormExtraActionProps[];
  progress?: boolean; // TODO
  alwaysResettable?: boolean; // TODO
  validateOnMount?: boolean; // TODO
  submitActionConfiguration?: IButtonProps;
  resetActionConfiguration?: IButtonProps;
}

/**
 * @stable [10.09.2018]
 */
export interface IBaseGridColumnConfiguration
  extends IComponentConfiguration,
    IAlignWrapper,
    IWidthWrapper,
    IColSpanWrapper,
    IIndexWrapper,
    IColumnStylesWrapper<((props: IGridColumnProps) => CSS.Properties<string | number>)> {
}

/* @stable - 04.04.2018 */
export interface IGridColumnConfiguration extends IBaseGridColumnConfiguration,
                                                  IOnColumnClickWrapper<{event: IBaseEvent, props: IGridColumnProps}>,
                                                  IColumnColSpanWrapper,
                                                  IColumnTitleWrapper,
                                                  IColumnWidthWrapper,
                                                  IColumnClassNameWrapper<string | ((props: IGridColumnProps) => string)>,
                                                  IColumnRenderedWrapper,
                                                  ILocalFilterFnWrapper<IGridFilterConfiguration>,
                                                  IReactOnClickWrapper<ISortDirectionEntity>,
                                                  IUseGroupingWrapper,
                                                  IUseSortingWrapper,
                                                  ITplWrapper<((entity: IEntity, column?: IGridColumnProps, rowNum?: number) => StringNumberT)>,
                                                  INameWrapper,
                                                  IRenderedWrapper,
                                                  IRendererWrapper<IEntity, IGridColumnConfiguration>,
                                                  IActionedWrapper,
                                                  IHeaderRendererWrapper<IGridColumnConfiguration>,
                                                  IFilterRendererWrapper<IGridColumnConfiguration> {
  sorter?(entity1: IEntity, entity2: IEntity): number;  // TODO
}

/**
 * @stable [03.07.2018]
 */
export interface IGridFilterConfiguration<TEntity extends IEntity = IEntity> extends IQueryWrapper,
                                                                                     IColumnNameWrapper,
                                                                                     IEntityWrapper<TEntity> {
}

/* @stable - 04.04.2018 */
export interface IGridConfiguration extends IUniversalListConfiguration,
                                            IWebComponentConfiguration,
                                            IWrapperClassNameWrapper,
                                            IOnChangeGroupingWrapper<IFieldChangeEntity>,
                                            IOnChangeSortingWrapper<ISortDirectionEntity>,
                                            IColumnsConfigurationWrapper,
                                            IExpandActionRenderedWrapper,
                                            IExpandedGroupsWrapper,
                                            ITightGridWrapper,
                                            IStickyHeadWrapper,
                                            ITotalEntityWrapper<IEntity> {
  topTotal?: boolean; // TODO
  groupedDataSorter?: (groupedValue1, groupedValue2, entity1: IEntity, entity2: IEntity) => number;
}

/* @stable - 03.04.2018 */
export interface IGridHeaderColumnConfiguration extends IGridColumnConfiguration,
                                                        IHeaderColSpanWrapper,
                                                        IHeaderWidthWrapper,
                                                        IHeaderClassNameWrapper,
                                                        IHeaderRenderedWrapper {
}

/**
 * @stable [10.09.2018]
 */
export type GridColumnConfigurationT = IGridColumnConfiguration | IGridHeaderColumnConfiguration;

/**
 * @stable [31.08.2018]
 */
export interface ITabConfiguration extends IValueWrapper,
                                           IClassNameWrapper,
                                           IActiveWrapper,
                                           INameWrapper,
                                           ISelectedWrapper,
                                           IUrlWrapper,
                                           IIconWrapper,
                                           IAliasWrapper,
                                           IActiveValueWrapper {
}

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelConfiguration extends IComponentConfiguration,
                                                IUseIndicatorWrapper,
                                                IRippableWrapper,
                                                ICenteredWrapper,
                                                IBackwardRenderedWrapper,
                                                IForwardRenderedWrapper,
                                                IOnCloseWrapper<ITabConfiguration>,
                                                IReactOnClickWrapper<ITabConfiguration>,
                                                IOnDeactivateWrapper<(value: AnyT) => void>,
                                                IItemsWrapper<ITabConfiguration[]> {
}

/**
 * @stable [02.08.2018]
 */
export interface IWebCameraConfiguration extends IComponentConfiguration,
                                                 ICameraWidthWrapper,
                                                 ICameraHeightWrapper,
                                                 IOnSelectWrapper<Blob> {
}

/* @stable - 25.04.2018 */
export interface IRnApplicationConfiguration extends IReactComponentConfiguration,
                                                     IHideNavBarWrapper {
}

/* @stable - 11.04.2018 */
export interface IApplicationConfiguration extends IBasenameWrapper,
                                                   IHideNavBarWrapper {
}

/**
 * @stable [18.04.2018]
 */
export enum FieldActionPositionEnum {
  LEFT,
  RIGHT,
}

/**
 * @stable [08.05.2018]
 */
export enum KeyboardKeyEnum {
  UPPERCASE,
  CHANGE_LAYOUT,
  LOWERCASE,
  BACKSPACE,
  CLOSE,
  SPACE,
  ENTER,
}

export type KeyboardKeyT = string | IKeyboardKey;
export type KeyboardLayoutT = KeyboardKeyT[][];

// TODO Fix class name
export interface IKeyboardKey extends IValueWrapper<string>,
                                                   ITypeWrapper<KeyboardKeyEnum>,
                                                   IClassNameWrapper<string | ((...args) => string)>, // TODO
                                                   IWidthWrapper {
}

export interface IKeyboardKeyConfiguration extends IDisabledWrapper {
  // TODO
  renderer?: any;
  className?: any;
}

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardConfiguration extends IComponentConfiguration,
                                                IFieldWrapper<HTMLInputElement | HTMLTextAreaElement>,
                                                ILayoutWrapper<KeyboardLayoutT[]>,
                                                IOnCloseWrapper,
                                                IRenderToBodyWrapper {
  keyboardKeyConfiguration?: IKeyboardKeyConfiguration; // TODO
}

/**
 * @stable [31.07.2018]
 */
export interface IUniversalFieldConfiguration<TKeyboardEvent, TFocusEvent, TBasicEvent>
  extends IGenericFieldEntity,
          IReactComponentConfiguration,
          IUniversalKeyboardHandlersConfiguration<TKeyboardEvent>,
          IDelayedChangesFieldPluginConfiguration,
          IOnFocusWrapper<TFocusEvent>,
          IOnBlurWrapper<TFocusEvent>,
          IReactOnClickWrapper<TBasicEvent>,
          IOnChangeWrapper,
          IOnClearWrapper,
          IChangeFormWrapper<(name: string, value: AnyT, validationGroup?: string) => void>,
          IAutoFocusWrapper,
          IErrorMessageRenderedWrapper,
          IActionsWrapper<IFieldActionConfiguration[]>,
          IDisplayMessageWrapper,
          IValidationGroupWrapper,
          IRenderedWrapper,
          IPreventFocusWrapper,
          IRequiredWrapper,
          ICanReturnClearDirtyChangesValueWrapper,
          IMessageWrapper,
          IUseKeyboardWrapper,
          IKeyboardConfigurationWrapper<IKeyboardConfiguration>,
          ICaretBlinkingFrequencyTimeoutWrapper,
          IValidateWrapper<string>,
          IFieldRenderedWrapper,
          IFullWrapper,
          IUseSyntheticCursorWrapper,
          IChangeableWrapper,
          IDefaultValue {
  bufferValue?: boolean;
  preventManualChanges?: boolean; // TODO
  dispatchValue?(rawValue: AnyT); // TODO
}

/* @stable - 11.04.2018 */
export interface IFieldConfiguration extends IUniversalFieldConfiguration<IKeyboardEvent,
                                                                          IFocusEvent,
                                                                          IBaseEvent>,
                                             IWebComponentConfiguration,
                                             IAutoCompleteWrapper,
                                             IActionsPosition<FieldActionPositionEnum>,
                                             IBindDictionaryConfiguration,
                                             IMaskGuideWrapper,
                                             IMaskPlaceholderCharWrapper,
                                             IPrefixLabelWrapper,
                                             IDisplayNameWrapper,
                                             ITypeWrapper<StringNumberT>,
                                             IClearActionWrapper,
                                             IStepWrapper {
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldsConfigurations {
  [fieldName: string]: string | IFieldConfiguration | ((field) => IFieldConfiguration | string);
}

/* @stable - 14.04.2018 */
export interface IRoutesConfiguration extends IRestoreAuthWrapper<string>,
                                              IHomeWrapper<string>,
                                              IProfileWrapper<string>,
                                              ILogoutWrapper<string>,
                                              IAccessDeniedWrapper<string>,
                                              ISignInWrapper<string>,
                                              ISignUpWrapper<string> {
}

/* @stable - 14.04.2018 */
export interface IRouteComputedMatchConfiguration extends IParamsWrapper,
                                                          IUrlWrapper,
                                                          IPathWrapper {
}

/* @stable - 14.04.2018 */
export enum ContainerVisibilityTypeEnum {
  PUBLIC,
  PRIVATE,
}

/* @stable - 14.04.2018 */
export interface IRouteConfiguration extends IPathWrapper,
                                             IBooleanModalWrapper,
                                             ITitleWrapper,
                                             IInitialWrapper<boolean | ((store: IUniversalApplicationStoreEntity) => boolean)>,
                                             IExactWrapper,
                                             IKeyWrapper,
                                             IOnEnterWrapper<() => void>,
                                             IAfterEnterWrapper<() => void>,
                                             IBeforeEnterWrapper<() => void>,
                                             IComputedMatchWrapper<IRouteComputedMatchConfiguration>,
                                             ITypeWrapper<ContainerVisibilityTypeEnum> {
}

/* @stable - 14.04.2018 */
export type RouteConfigurationT = IRouteConfiguration | ((routes: IRoutesConfiguration) => IRouteConfiguration);

/* @stable - 14.04.2018 */
export type ConnectorMapperT<TStoreEntity> = (state: TStoreEntity) => IKeyValue;

/* @stable - 14.04.2018 */
export interface IBasicConnectorConfiguration<TStoreEntity>
  extends ICallbackWrapper<(ctor: IUniversalContainerClassEntity) => void>,
          IRouteConfigurationWrapper<RouteConfigurationT>,
          IMappersWrapper<Array<ConnectorMapperT<TStoreEntity>>> {
}

/* @stable - 14.04.2018 */
export interface IConnectorConfiguration<TAppState = {}, TApplicationAccessConfig = {}>
  extends IBasicConnectorConfiguration<TAppState>,
          IAccessConfigurationWrapper<TApplicationAccessConfig> {
}

/**
 * @stable [22.10.2018]
 */
export enum LayoutBuilderTypeEnum {
  VERTICAL,
  HORIZONTAL,
}

/* @stable - 16.04.2018 */
export const LAYOUT_BUILDER_TYPES = {
  VERTICAL: LayoutBuilderTypeEnum.VERTICAL,
  HORIZONTAL: LayoutBuilderTypeEnum.HORIZONTAL,
};

/* @stable - 16.04.2018 */
export enum LayoutBuilderFactorEnum {
  FACTOR_0_5,
  FACTOR_0_75,
  FACTOR_1,
  FACTOR_2,
  FACTOR_4,
  FACTOR_8,
}

/* @stable - 16.04.2018 */
export const LAYOUT_BUILDER_FACTOR_TYPES = {
  FACTOR_0_5: LayoutBuilderFactorEnum.FACTOR_0_5,
  FACTOR_0_75: LayoutBuilderFactorEnum.FACTOR_0_75,
  FACTOR_1: LayoutBuilderFactorEnum.FACTOR_1,
  FACTOR_2: LayoutBuilderFactorEnum.FACTOR_2,
  FACTOR_4: LayoutBuilderFactorEnum.FACTOR_4,
  FACTOR_8: LayoutBuilderFactorEnum.FACTOR_8,
};

/**
 * @stable [22.10.2018]
 */
export type UniversalLayoutBuilderChildrenT<TNode> = IUniversalLayoutBuilderConfiguration<TNode> | TNode;

/**
 * @stable [22.10.2018]
 */
export interface IUniversalLayoutBuilderConfiguration<TNode>
  extends ILayoutWrapper<LayoutBuilderTypeEnum>,
          IStyleWrapper<IKeyValue>,
          IFullWrapper,
          IChildrenWrapper<Array<UniversalLayoutBuilderChildrenT<TNode>>>,
          IFactorWrapper<LayoutBuilderFactorEnum> {
}

/* @stable [23.04.2018] */
export interface IRnModalConfiguration extends IReactComponentConfiguration,
                                               IShadowStyleWrapper<IKeyValue>,
                                               IHasContentWrapperWrapper,
                                               ICenterAlignmentWrapper {
}

/* @stable [23.04.2018] */
export interface IGridRowConfiguration extends IComponentConfiguration,
                                               IStringArrayExcludeTargetsClassesWrapper {
}

/* @stable [24.04.2018] */
export interface IComponentConfiguration extends IReactComponentConfiguration,
                                                 IWebComponentConfiguration {
}

/* @stable - 08.04.2018 */
export interface IUniversalMessageConfiguration extends IReactComponentConfiguration,
                                                        IEmptyDataMessageWrapper,
                                                        IErrorMessageWrapper,
                                                        IEmptyMessageWrapper<React.ReactNode>,
                                                        IBooleanEmptyDataWrapper {
}

/* @stable [27.04.2018] */
export interface IRnDrawerConfiguration extends IReactComponentConfiguration,
                                                IContentWrapper {
}

/* @stable [27.04.2018] */
export interface IRnDefaultLayoutContainerConfiguration extends IUniversalContainerConfiguration,
                                                                IHeaderBackActionEnabledWrapper,
                                                                IHeaderMenuActionEnabledWrapper,
                                                                IDrawerContentWrapper,
                                                                IHeaderContentWrapper,
                                                                IHeaderActionIconStyleWrapper,
                                                                IHeaderActionStyleWrapper,
                                                                IHeaderActionStyleWrapper,
                                                                IHeaderTitleStyleWrapper,
                                                                IHeaderStyleWrapper,
                                                                IContentStyleWrapper,
                                                                IDrawerContentStyleWrapper,
                                                                IUseDrawerWrapper,
                                                                IUseHeaderWrapper {
}

/**
 * @stable [27.04.2018]
 */
export interface ICardConfiguration extends IComponentConfiguration,
                                            IReactOnClickWrapper,
                                            IRippableWrapper,
                                            IActionButtonsWrapper<React.ReactNode>,
                                            IActionIconsWrapper<React.ReactNode> {
}

/**
 * @stable [04.05.2018]
 */
export interface IAccessConfiguration {
}

/**
 * @stable [04.05.2018]
 */
export enum NavigationListItemTypeEnum {
  GROUP,
  SUB_HEADER,
  DIVIDER,
  LINK,
}

/**
 * @stable [04.05.2018]
 */
export interface INavigationListItemConfiguration extends IActiveWrapper,
                                                          IIconWrapper,
                                                          ILinkWrapper,
                                                          ILabelWrapper,
                                                          IValueWrapper,
                                                          IParentWrapper<INavigationListItemConfiguration>,
                                                          IChildrenWrapper<INavigationListItemConfiguration[]>,
                                                          IAccessConfigurationWrapper<IAccessConfiguration>,
                                                          ITypeWrapper<NavigationListItemTypeEnum> {
  relatedLinks?: string[];
}

/**
 * @stable [04.05.2018]
 */
export interface IDelayedChangesFieldPluginConfiguration extends IDelayTimeoutWrapper,
                                                                 IOnDelayWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IBindDictionaryConfiguration extends IBindDictionaryWrapper,
                                                      IOnEmptyDictionaryWrapper<IApiEntity>,
                                                      IOnLoadDictionaryWrapper {
}

/**
 * @stable [31.07.2018]
 */
export interface IMenuConfiguration extends IComponentConfiguration,
                                            IMaxCountWrapper,
                                            IRenderToXWrapper,
                                            IRenderToYWrapper,
                                            IFilterPlaceholderWrapper,
                                            IMultiWrapper,
                                            IUseFilterWrapper,
                                            IWidthWrapper<number | (() => number)>,
                                            ICenteredMenuWrapper,
                                            IRendererWrapper<IMenuItemEntity>,
                                            IFilterWrapper<(valueToFilter: string, item: IMenuItemEntity) => boolean>,
                                            ITplFnWrapper<IMenuItemEntity>,
                                            IOnSelectWrapper<IMenuItemEntity>,
  IOnCloseWrapper,
  IOnFilterChangeWrapper<(query: string) => void> {
  remoteFilter?: boolean; // TODO
  overlayRendered?: boolean; // TODO
}

/**
 * @stable [13.09.2018]
 */
export enum ToolbarActionEnum {
  OPEN_FILTER,
  CLEAR_FILTER,
  REFRESH_DATA,
  DOWNLOAD_DATA,
}

/**
 * @stable [15.05.2018]
 */
export interface IFieldActionConfiguration extends IClassNameWrapper,
                                                   ITitleWrapper,
                                                   IDisabledWrapper<boolean | (() => boolean)>,
                                                   ITypeWrapper,
                                                   IReactOnClickWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterActionConfiguration extends IClassNameWrapper,
                                                    IDisabledWrapper,
                                                    ITypeWrapper<ToolbarActionEnum> {
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterConfiguration extends IActionsDisabledWrapper,
                                              INotUseFieldWrapper,
                                              IIconWrapper,
                                              IFullWrapper,
                                              IActionsWrapper<IFilterActionConfiguration[]>,
                                              IFieldConfigurationWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalUIIconConfiguration extends IReactComponentConfiguration,
                                                       IDisabledWrapper,
                                                       ITypeWrapper,
                                                       IClassNameWrapper,
                                                       ISimpleWrapper,
                                                       IReactOnClickWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUIIconConfiguration extends IUniversalUIIconConfiguration,
                                              IWebComponentConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export type UniversalUIIconConfigurationT = IUniversalUIIconConfiguration | string;

/**
 * @stable [18.05.2018]
 */
export type UIIconConfigurationT = IUIIconConfiguration | string;

/**
 * @stable [08.08.2018]
 */
export interface ISubHeaderConfiguration extends IComponentConfiguration,
                                                 IMoreOptionsWrapper<IMenuItemEntity[]>,
                                                 IItemsWrapper<JSX.Element>,
                                                 INavigationActionTypeWrapper,
                                                 IOnNavigationActionClickWrapper,
                                                 IOnMoreOptionsSelectWrapper<IMenuItemEntity>,
                                                 ITitleRendererWrapper<JSX.Element>,
                                                 ISubBorderWrapper {
}

/**
 * @stable [05.06.2018]
 */
export interface IFilterAndSorterConfiguration extends IFilterFnWrapper,
                                                       ISorterFnWrapper {
}
