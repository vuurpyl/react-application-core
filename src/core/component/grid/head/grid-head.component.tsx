import * as React from 'react';

import {
  GridClassesEnum,
  IGridHeadProps,
  UniversalStickyContext,
} from '../../../definition';
import {
  ClsUtils,
  PropsUtils,
} from '../../../util';
import { GenericBaseComponent } from '../../base/generic-base.component';

/**
 * @component-impl
 * @stable [20.05.2020]
 */
export class GridHead extends GenericBaseComponent<IGridHeadProps> {

  /**
   * @stable [20.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;

    return (
      <UniversalStickyContext.Consumer>
        {(stickyElementClassName) => (
          <thead className={
            ClsUtils.joinClassName(
              GridClassesEnum.GRID_HEAD,
              mergedProps.stickyHead && stickyElementClassName
            )
          }>
            {this.props.children}
          </thead>
        )}
      </UniversalStickyContext.Consumer>
    );
  }

  /**
   * @stable [20.05.2020]
   * @returns {IGridHeadProps}
   */
  private get mergedProps(): IGridHeadProps {
    return PropsUtils.mergeWithSystemProps(this.originalProps, this.componentsSettings.gridHead);
  }
}
