import * as React from 'react';

import { BaseList } from './base-list.component';
import { BasicList } from './basic';
import { IEntity } from '../../definitions.interface';
import { IListProps } from '../../definition';
import {
  isHighlightOdd,
  Mappers,
} from '../../util';
import { ListItem } from './item';

export class List extends BaseList<IListProps, {}, BasicList> {

  /**
   * @stable [08.07.2020]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    return (
      <BasicList
        forwardedRef={this.actualRef}
        {...this.mergedProps}
      >
        {this.dataSource.map(this.getItem, this)}
      </BasicList>
    );
  }

  /**
   * @stable [13.09.2018]
   * @param {IEntity} entity
   * @param {number} index
   * @returns {JSX.Element}
   */
  protected getItem(entity: IEntity, index: number): JSX.Element {
    const props = this.props;
    const rowKey = this.toRowKey(entity);

    return (
      <ListItem
        {...Mappers.selectableHoveredEntity(props)}
        key={rowKey}
        index={index}
        rawData={entity}
        selected={this.isEntitySelected(entity)}
        odd={isHighlightOdd(props, index)}
        onClick={props.onSelect}
        {...props.itemConfiguration}/>
    );
  }
}
