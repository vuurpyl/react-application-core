import { IUniversalUIIconConfiguration } from '../../configurations-definitions.interface';
import { IUiFactory } from '../../definition';

export interface IUIFactory
  extends IUiFactory {
  snackbar?: string;
  snackbarText?: string;
  snackbarActionWrapper?: string;
  snackbarActionButton?: string;
  icons?: string;
  toolbar?: string;
  tabBarScrollerScrollArea?: string;
  tabBarScrollerScrollAreaScroll?: string;
  tabBarScrollerScrollContent?: string;
  tabBar?: string;
  tab?: string;
  tabContent?: string;
  tabIcon?: string;
  tabIconText?: string;
  tabActive?: string;
  tabIndicator?: string;
  tabIndicatorActive?: string;
  tabIndicatorContent?: string;
  tabIndicatorContentUnderline?: string;
  tabBarScroller?: string;
  card?: string;
  cardActions?: string;
  cardActionButtons?: string;
  cardActionIcons?: string;
  rippleSurface?: string;

  /**
   * @stable [15.12.2018]
   * @param {IUniversalUIIconConfiguration | string} config
   * @returns {JSX.Element}
   */
  makeIcon?(config: IUniversalUIIconConfiguration | string): JSX.Element;
}
