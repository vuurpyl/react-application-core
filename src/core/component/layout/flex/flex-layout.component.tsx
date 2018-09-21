import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';
import { IFlexLayoutProps } from './flex-layout.interface';

export class FlexLayout extends BaseComponent<FlexLayout, IFlexLayoutProps> {

  public static defaultProps: IFlexLayoutProps = {
    full: true,
  };

  /**
   * @stable [17.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
        <div className={toClassName(
                            props.className,
                            'rac-flex',
                            props.row ? 'rac-flex-row' : 'rac-flex-column',
                            props.full && 'rac-flex-full',
                            props.separator && 'rac-flex-separator',
                            props.alignItemsCenter && 'rac-flex-align-items-center',
                            props.alignItemsEnd && 'rac-flex-align-items-end',
                            props.justifyContentCenter && 'rac-flex-justify-content-center',
                            props.justifyContentEnd && 'rac-flex-justify-content-end'
                        )}
             style={props.style}
             onClick={props.onClick}>
          {props.children}
        </div>
    );
  }
}
