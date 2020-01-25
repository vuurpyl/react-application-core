import * as React from 'react';

import { joinClassName } from '../../../util';
import {
  ILayoutBuilderConfigEntity,
  LayoutBuilderChildrenT,
  LayoutFactorsEnum,
} from '../../../definition';
import { UniversalLayoutViewBuilder } from './universal-layout-view.builder';

export class LayoutViewBuilder
  extends UniversalLayoutViewBuilder<React.ReactNode, React.DetailedHTMLProps<React.HTMLAttributes<{}>, {}>> {

  /**
   * @stable [22.10.2018]
   * @param {React.HTMLAttributes<{}>} props
   * @param {LayoutBuilderChildrenT[]} children
   * @param {ILayoutBuilderConfigEntity} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildRowView(props: React.HTMLAttributes<{}>,
                      children: LayoutBuilderChildrenT[],
                      layoutConfig: ILayoutBuilderConfigEntity): React.ReactNode {
    return (
      <div
        {...props}
        className={
          joinClassName(
            'rac-layout-builder-row-view',
            layoutConfig.className,
            this.asFactorClassName(layoutConfig),
          )}
      >
        {children}
      </div>
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {React.HTMLAttributes<{}>} props
   * @param {LayoutBuilderChildrenT[]} children
   * @param {ILayoutBuilderConfigEntity} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildColumnView(props: React.HTMLAttributes<{}>,
                         children: LayoutBuilderChildrenT[],
                         layoutConfig: ILayoutBuilderConfigEntity): React.ReactNode {
    return (
      <div
        {...props}
        className={
          joinClassName(
            'rac-layout-builder-column-view',
            layoutConfig.className,
            this.asFactorClassName(layoutConfig),
          )}
      >
        {children}
      </div>
    );
  }

  /**
   * @stable [23.01.2020]
   * @param {React.ReactNode} item
   * @param {React.ClassAttributes<{}>} props
   * @returns {React.ReactNode}
   */
  public cloneItem(item: React.ReactNode, props: React.ClassAttributes<{}>): React.ReactNode {
    return React.cloneElement(item as React.ReactElement<{}>, props);
  }

  /**
   * @stable [23.01.2020]
   * @param {ILayoutBuilderConfigEntity} config
   * @returns {string}
   */
  private asFactorClassName(config: ILayoutBuilderConfigEntity): string {
    if (config.full === false) {
      return '';
    }
    switch (config.factor) {
      case LayoutFactorsEnum.FACTOR_0_5:
        return 'rac-layout-builder-1-2';
      case LayoutFactorsEnum.FACTOR_0_75:
        return 'rac-layout-builder-3-4';
      case LayoutFactorsEnum.FACTOR_2:
        return 'rac-layout-builder-x2';
      case LayoutFactorsEnum.FACTOR_4:
        return 'rac-layout-builder-x4';
      case LayoutFactorsEnum.FACTOR_8:
        return 'rac-layout-builder-x8';
      default:
        return 'rac-layout-builder-x1';
    }
  }
}