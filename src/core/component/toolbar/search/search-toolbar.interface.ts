import {
  IFilterConfiguration,
  IReactComponentConfiguration,
  IUniversalContainerConfiguration,
  IFilterConfigurationWrapper,
  IWebComponentConfiguration,
  ToolbarActionEnum,
} from '../../../configurations-definitions.interface';
import {
  IQueryFilterEntity,
  IUniversalContainerEntity,
  IQueryFilterWrapperEntity,
} from '../../../entities-definitions.interface';
import {
  IOnApplyWrapper,
  IOnActivateWrapper,
  IOnDeactivateWrapper,
  IOnChangeWrapper,
  IOnOpenWrapper,
  IOnRefreshWrapper,
  IFullWrapper,
} from '../../../definitions.interface';
import { IOnActionClickWrapper } from '../../../react-definitions.interface';

/**
 * @stable [13.09.2018]
 */
export interface IUniversalSearchToolbarConfiguration extends IReactComponentConfiguration,
                                                              IFilterConfiguration,
                                                              IOnActivateWrapper,
                                                              IOnDeactivateWrapper<() => void>,
                                                              IOnOpenWrapper,
                                                              IOnApplyWrapper,
                                                              IFullWrapper,
                                                              IOnRefreshWrapper,
                                                              IOnActionClickWrapper<ToolbarActionEnum>,
                                                              IOnChangeWrapper<string> {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarEntity extends IQueryFilterEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarProps extends IUniversalSearchToolbarEntity,
                                                      IUniversalSearchToolbarConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarConfiguration extends IUniversalSearchToolbarConfiguration,
                                                     IWebComponentConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarEntity extends IUniversalSearchToolbarEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarProps extends ISearchToolbarConfiguration,
                                             ISearchToolbarEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerEntity extends IUniversalContainerEntity,
                                                                IQueryFilterWrapperEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerConfiguration extends IUniversalContainerConfiguration,
                                                                       IFilterConfigurationWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerProps extends IUniversalSearchToolbarContainerEntity,
                                                               IUniversalSearchToolbarContainerConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerEntity extends IUniversalSearchToolbarContainerEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerConfiguration extends IUniversalSearchToolbarContainerConfiguration,
                                                              IWebComponentConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerProps extends ISearchToolbarContainerEntity,
                                                      ISearchToolbarContainerConfiguration {
}
