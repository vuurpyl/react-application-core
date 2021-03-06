import * as React from 'react';

import {
  GridClassesEnum,
  IconsEnum,
  IGridColumnProps,
  SortDirectionsEnum,
} from '../../../definition';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  ifNotFalseThanValue,
  NvlUtils,
  TypeUtils,
} from '../../../util';
import { BaseGridColumn } from '../base-column';

export class GridHeadColumn extends BaseGridColumn {

  /**
   * @stable [17.10.2019]
   * @param {IGridColumnProps} props
   */
  constructor(props: IGridColumnProps) {
    super(props);
    this.onChangeAscSortingActionClick = this.onChangeAscSortingActionClick.bind(this);
    this.onChangeDescSortingActionClick = this.onChangeDescSortingActionClick.bind(this);
  }

  /**
   * @stable [17.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return ifNotFalseThanValue(
      props.headerRendered,
      () => (
        <th
          style={{
            ...this.styles,
            ...CalcUtils.calc(props.headerStyles, props),
          }}
          colSpan={NvlUtils.nvl(props.headerColSpan, props.colSpan)}
          className={this.getClassName(CalcUtils.calc(props.headerClassName, props), 'rac-no-user-select')}>
          {this.columnContentElement}
        </th>
      )
    );
  }

  /**
   * @stable [22.10.2019]
   * @param {React.ReactNode} children
   * @returns {React.ReactNode}
   */
  protected getColumnContentElement(children: React.ReactNode): React.ReactNode {
    return (
      <React.Fragment>
        {
          this.props.sortable && (
            <div className='rac-grid-column-sort'>
              {
                this.uiFactory.makeIcon({
                  className: ClsUtils.joinClassName(
                    GridClassesEnum.GRID_HEAD_COLUMN_SORT_ICON,
                    GridClassesEnum.GRID_HEAD_COLUMN_SORT_DESC_ACTION,
                    this.isDescSortingEnabled && GridClassesEnum.GRID_HEAD_COLUMN_ACTIVE_SORT_ICON
                  ),
                  type: IconsEnum.ARROW_DOWN,
                  onClick: this.onChangeDescSortingActionClick,
                })
              }
              {
                this.uiFactory.makeIcon({
                  className: ClsUtils.joinClassName(
                    GridClassesEnum.GRID_HEAD_COLUMN_SORT_ICON,
                    GridClassesEnum.GRID_HEAD_COLUMN_SORT_ASC_ACTION,
                    this.isAscSortingEnabled && GridClassesEnum.GRID_HEAD_COLUMN_ACTIVE_SORT_ICON
                  ),
                  type: IconsEnum.ARROW_UP,
                  onClick: this.onChangeAscSortingActionClick,
                })
              }
            </div>
          )
        }
        {children}
      </React.Fragment>
    );
  }

  /**
   * @stable [18.10.2019]
   */
  private onChangeAscSortingActionClick(): void {
    this.doSortingDirectionChange(ConditionUtils.orNull(!this.isAscSortingEnabled, SortDirectionsEnum.ASC));
  }

  /**
   * @stable [18.10.2019]
   */
  private onChangeDescSortingActionClick(): void {
    this.doSortingDirectionChange(ConditionUtils.orNull(!this.isDescSortingEnabled, SortDirectionsEnum.DESC));
  }

  /**
   * @stable [18.10.2019]
   * @param {SortDirectionsEnum} direction
   */
  private doSortingDirectionChange(direction: SortDirectionsEnum): void {
    const props = this.props;
    if (TypeUtils.isFn(props.onSortingDirectionChange)) {
      props.onSortingDirectionChange({name: props.name, direction});
    }
  }

  /**
   * @stable [18.10.2019]
   * @returns {boolean}
   */
  private get isDescSortingEnabled(): boolean {
    return this.props.direction === SortDirectionsEnum.DESC;
  }

  /**
   * @stable [18.10.2019]
   * @returns {boolean}
   */
  private get isAscSortingEnabled(): boolean {
    return this.props.direction === SortDirectionsEnum.ASC;
  }

  /**
   * @stable [18.10.2019]
   * @returns {React.CSSProperties}
   */
  private get styles(): React.CSSProperties {
    return this.getStyle({width: this.props.headerWidth});
  }
}
