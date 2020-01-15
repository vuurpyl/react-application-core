import * as React from 'react';
import * as R from 'ramda';

import { BaseComponent } from '../base';
import {
  fullFlexClassName,
  handlerPropsFactory,
  ifNotNilThanValue,
  joinClassName,
  nvl,
} from '../../util';
import {
  DEFAULT_FLEX_BUTTON_CLASS_NAMES,
  IButtonProps,
} from '../../definition';
import {
  getButtonIcon,
  getButtonText,
  hasIconButton,
  isButtonDisabled,
} from './button.support';
import { Link } from '../link';

export class Button extends BaseComponent<IButtonProps> {

  public static readonly defaultProps: IButtonProps = {
    full: false,
    touched: false,
    type: 'button',
  };

  private readonly buttonRef = React.createRef<HTMLButtonElement>();

  /**
   * @stable [27.01.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const buttonText = getButtonText(props);
    const hasContent = !R.isNil(props.children) || (!R.isNil(buttonText) && !R.isEmpty(buttonText));
    const hasIcon = hasIconButton(props);

    const className = joinClassName(
      ...DEFAULT_FLEX_BUTTON_CLASS_NAMES,
      props.className,
      fullFlexClassName(props),
      hasContent ? 'rac-button-filled' : 'rac-button-not-filled',
      hasIcon ? 'rac-button-decorated' : 'rac-button-not-decorated',
      props.mini && 'rac-button-mini',
      props.outlined && 'rac-button-outlined',
      props.raised && 'rac-button-raised',
      this.isButtonRippled && this.uiFactory.rippleSurface
    );

    if (props.to) {
      return (
        <Link
          to={props.to}
          style={props.style}
          className={className}
        >
          {buttonText}
        </Link>
      );
    }
    const disabled = isButtonDisabled(props);

    return (
      <button
        ref={this.buttonRef}
        type={props.type}
        title={props.title}
        style={props.style}
        className={className}
        disabled={disabled}
        {...handlerPropsFactory(props.onClick, !disabled, props.touched)}
      >
        {hasIcon && this.uiFactory.makeIcon(getButtonIcon(props, 'spinner', 'error'))}
        {
          hasContent && (
            <div className='rac-button-content'>
              {buttonText && this.t(buttonText)}
              {props.children}
            </div>
          )
        }
      </button>
    );
  }

  /**
   * @stable [23.02.2019]
   */
  public blur(): void {
    this.buttonEl.blur(); // document.activeElement === body
  }

  /**
   * @stable [23.02.2019]
   * @returns {HTMLButtonElement}
   */
  private get buttonEl(): HTMLButtonElement {
    return this.buttonRef.current;
  }

  /**
   * @stable [23.02.2019]
   * @returns {IButtonProps}
   */
  private get globalButtonSettings(): IButtonProps {
    return ifNotNilThanValue(this.settings.components, (components) => components.button) || {};
  }

  /**
   * @stable [23.02.2019]
   * @returns {boolean}
   */
  private get isButtonRippled(): boolean {
    const props = this.props;
    return nvl(props.rippled, this.globalButtonSettings.rippled) !== false;
  }
}
