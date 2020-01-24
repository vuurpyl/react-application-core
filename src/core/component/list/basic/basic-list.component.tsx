import * as React from 'react';

import {
  isFull,
  joinClassName,
} from '../../../util';
import { BaseComponent } from '../../base';
import { IBasicListProps } from './basic-list.interface';

export class BasicList extends BaseComponent<IBasicListProps> {

  /**
   * @stable [24.01.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <ul
        ref={this.selfRef}
        className={joinClassName(
          'rac-list',
          isFull(props) && 'rac-full-list',
          props.className
        )}>
        {props.children}
      </ul>
    );
  }
}
