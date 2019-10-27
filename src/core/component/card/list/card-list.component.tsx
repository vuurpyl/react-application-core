import * as React from 'react';

import { toClassName, calc } from '../../../util';
import { IEntity } from '../../../definitions.interface';
import { BaseList } from '../../list';
import { Card } from '../card.component';
import { ICardListProps } from './card-list.interface';

export class CardList extends BaseList<ICardListProps> {

  /**
   * @stable [02.05.2018]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    return (
      <div
        ref='container'
        className={toClassName('rac-list rac-card-list rac-flex-full', props.className)}>
        {this.dataSource.map((item, index) => this.getItem(item, index))}
      </div>
    );
  }

  /**
   * @stable [12.01.2019]
   * @param {IEntity} entity
   * @param {number} index
   * @returns {JSX.Element}
   */
  protected getItem(entity: IEntity, index: number): JSX.Element {
    const props = this.props;
    const itemConfiguration = props.itemConfiguration || {};
    return (
      <Card
        key={this.toRowKey(entity)}
        entity={entity}
        rippled={itemConfiguration.rippled}
        className={toClassName(`rac-list-item rac-list-item-${index}`, calc(itemConfiguration.className, entity))}
        actionButtons={itemConfiguration.actionButtons && itemConfiguration.actionButtons(entity)}
        actionIcons={itemConfiguration.actionIcons && itemConfiguration.actionIcons(entity)}
        onClick={props.onSelect}
      >
        {itemConfiguration.renderer(entity)}
      </Card>
    );
  }
}
