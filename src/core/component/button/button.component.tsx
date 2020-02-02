import * as React from 'react';

import { BaseComponent } from '../base';
import {
  calc,
  handlerPropsFactory,
  hasIcon,
  ifNotNilThanValue,
  inProgress,
  isDecorated,
  isDisabled,
  isFull,
  isObjectNotEmpty,
  isRippled,
  joinClassName,
  nvl,
} from '../../util';
import { IButtonProps } from '../../definition';
import { Link } from '../link';

export class Button extends BaseComponent<IButtonProps> {

  public static readonly defaultProps: IButtonProps = {
    full: false,
    touched: false,
    type: 'button',
  };

  /**
   * @stable [02.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {iconRight} = props;
    const $text = this.text;
    const $hasContent = this.hasContent($text);
    const $hasIcon = hasIcon(props);

    const className = joinClassName(
      'rac-button',
      calc(props.className),
      $hasContent ? 'rac-button-filled' : 'rac-button-not-filled',
      this.isFull && 'rac-button-full',
      this.isDecorated && $hasIcon && 'rac-button-decorated',
      props.mini && 'rac-button-mini',
      props.outlined && 'rac-button-outlined',
      props.raised && 'rac-button-raised',
      this.isRippled && this.uiFactory.rippleSurface
    );

    if (props.to) {
      return (
        <Link
          to={props.to}
          style={props.style}
          className={className}
        >
          {$text}
        </Link>
      );
    }
    const disabled = this.isDisabled;
    const iconElement = $hasIcon && this.iconElement;

    return (
      <button
        ref={this.selfRef}
        type={props.type}
        title={props.title as string}
        style={props.style}
        className={className}
        disabled={disabled}
        {...handlerPropsFactory(props.onClick, !disabled, props.touched)}
      >
        {!iconRight && iconElement}
        {
          $hasContent && (
            <div className='rac-button__content'>
              {$text && this.t($text)}
              {props.children}
            </div>
          )
        }
        {iconRight && iconElement}
      </button>
    );
  }

  /**
   * @stable [23.02.2019]
   */
  public blur(): void {
    this.getSelf().blur(); // document.activeElement === body
  }

  /**
   * @stable [24.01.2020]
   * @returns {boolean}
   */
  private get isRippled(): boolean {
    return isRippled(this.props) && isRippled(this.systemButtonSettings);
  }

  /**
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isDecorated(): boolean {
    return isDecorated(this.props);
  }

  /**
   * @stable [02.02.2020]
   * @param text
   * @returns {boolean}
   */
  private hasContent(text): boolean {
    return isObjectNotEmpty(this.props.children) || isObjectNotEmpty(text);
  }

  /**
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isDisabled(): boolean {
    return isDisabled(this.props) || inProgress(this.props);
  }

  /**
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isFull(): boolean {
    return isFull(this.props);
  }

  /**
   * @stable [02.02.2020]
   * @returns {JSX.Element}
   */
  private get iconElement(): JSX.Element {
    const {
      error,
      icon,
      progress,
    } = this.props;

    return this.uiFactory.makeIcon({
      type: progress
        ? 'spinner'
        : (error ? 'error' : icon as string),
    });
  }

  /**
   * @stable [02.02.2020]
   * @returns {string}
   */
  private get text(): string {
    const {
      error,
      errorMessage,
      icon,
      progress,
      progressMessage,
      text,
    } = this.props;

    return (
      progress
        ? nvl(progressMessage, this.settings.messages.WAITING)
        : (
          error
            ? nvl(errorMessage, this.settings.messages.ERROR)
            : text
        )
    );
  }

  /**
   * @stable [24.01.2020]
   * @returns {IButtonProps}
   */
  private get systemButtonSettings(): IButtonProps {
    return ifNotNilThanValue(this.settings.components, (components) => components.button || {}, {});
  }
}
