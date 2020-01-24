import * as React from 'react';

import { BaseList } from './base-list.component';
import { IEntity } from '../../definitions.interface';
import { IListProps } from '../../definition';
import {
  ifNotNilThanValue,
  isHighlightOdd,
} from '../../util';
import { ListItem } from './item';
import { BasicList } from './basic';

export class List extends BaseList<IListProps, {}, BasicList> {

  /**
   * @stable [25.10.2019]
   * @param {IListProps} props
   */
  constructor(props: IListProps) {
    super(props);
    this.getItem = this.getItem.bind(this);
  }

  /**
   * @stable [25.10.2019]
   * @returns {Element}
   */
  public getSelf(): Element {
    return ifNotNilThanValue(this.selfRef.current, (simpleList) => simpleList.getSelf());
  }

  /**
   * @stable [25.10.2019]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    return (
      <BasicList
        ref={this.selfRef}
        {...this.props}>
        {this.dataSource.map(this.getItem)}
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
