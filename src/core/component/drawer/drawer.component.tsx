import * as React from 'react';

import { IDrawerProps } from './drawer.interface';
import { toClassName } from '../../util';
import { BaseComponent } from '../base';

export class Drawer extends BaseComponent<Drawer, IDrawerProps> {

  /**
   * @stable [17.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const opened = this.props.opened;
    return (
      <aside ref='self'
             className={toClassName(
                         'rac-drawer-wrapper',
                         this.uiFactory.drawerPermanent,
                         this.uiFactory.drawerOpen,
                         !opened && 'rac-drawer-wrapper-short',
                       )}>
        <nav className={toClassName('rac-drawer', this.uiFactory.drawer)}>
          {this.props.children}
        </nav>
      </aside>
    );
  }
}
