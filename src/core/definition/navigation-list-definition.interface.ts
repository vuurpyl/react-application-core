import {
  IAccessConfigurationWrapper,
  IActiveGroupWrapper,
  IActiveWrapper,
  IChildrenWrapper,
  IFullWrapper,
  IIconWrapper,
  IItemsWrapper,
  ILabelWrapper,
  ILinkWrapper,
  IOnClickWrapper,
  IOnGroupClickWrapper,
  IParentWrapper,
  IRelatedLinksWrapper,
  ITypeWrapper,
  IValueWrapper,
} from '../definitions.interface';
import { IPresetsScrolledEntity } from './scrolled-definition.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';
import { IReduxLayoutEntity } from './layout-definition.interface';

/**
 * @stable [11.09.2019]
 */
export enum NavigationItemTypesEnum {
  GROUP,
  SUB_HEADER,
}

/**
 * @stable [23.03.2020]
 */
export const NAVIGATION_EXTRA_ITEM_TYPES = [
  NavigationItemTypesEnum.SUB_HEADER
];

/**
 * @entity
 * @stable [11.09.2019]
 */
export interface INavigationListItemEntity<TAccessConfiguration = {}>
  extends IAccessConfigurationWrapper<TAccessConfiguration>,
    IActiveWrapper,
    IChildrenWrapper<INavigationListItemEntity[]>,
    IIconWrapper,
    ILabelWrapper,
    ILinkWrapper,
    IParentWrapper<INavigationListItemEntity>,
    IRelatedLinksWrapper<string[]>,
    ITypeWrapper<NavigationItemTypesEnum>,
    IValueWrapper {
}

/**
 * @presets-entity
 * @stable [14.05.2020]
 */
export interface IPresetsNavigationListEntity
  extends IPresetsScrolledEntity,
    IFullWrapper,
    IItemsWrapper<INavigationListItemEntity[]>,
    IOnClickWrapper<INavigationListItemEntity>,
    IOnGroupClickWrapper<INavigationListItemEntity> {
}

/**
 * @redux-entity
 * @stable [14.05.2020]
 */
export interface IReduxNavigationListEntity
  extends IReduxLayoutEntity {
}

/**
 * @generic-entity
 * @stable [14.05.2020]
 */
export interface IGenericNavigationListEntity
  extends IPresetsNavigationListEntity,
    IReduxNavigationListEntity {
}

/**
 * @props
 * @stable [24.03.2020]
 */
export interface INavigationListProps
  extends IEnhancedGenericComponentProps,
    IGenericNavigationListEntity {
}

/**
 * @state
 * @stable [24.03.2020]
 */
export interface INavigationListState
  extends IActiveGroupWrapper<INavigationListItemEntity> {
}

/**
 * @classes
 * @stable [24.03.2020]
 */
export enum NavigationListClassesEnum {
  FULL_NAVIGATION_LIST = 'rac-full-navigation-list',
  MINI_NAVIGATION_LIST = 'rac-mini-navigation-list',
  NAVIGATION_LIST = 'rac-navigation-list',
  NAVIGATION_LIST_ACTIVE_SECTION = 'rac-navigation-list__active-section',
  NAVIGATION_LIST_EXPAND_ICON = 'rac-navigation-list__expand-icon',
  NAVIGATION_LIST_EXPANDED_SECTION = 'rac-navigation-list__expanded-section',
  NAVIGATION_LIST_GROUP_SECTION = 'rac-navigation-list__group-section',
  NAVIGATION_LIST_ITEM_SECTION = 'rac-navigation-list__item-section',
  NAVIGATION_LIST_ITEM_SECTION_ICON = 'rac-navigation-list__item-section-icon',
  NAVIGATION_LIST_SECTION = 'rac-navigation-list__section',
  NAVIGATION_LIST_SECTION_ICON = 'rac-navigation-list__section-icon',
}
