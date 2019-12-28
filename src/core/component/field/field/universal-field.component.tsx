import * as React from 'react';
import * as R from 'ramda';
import * as Printf from 'sprintf-js';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import {
  buildActualFieldValue,
  calc,
  DelayedTask,
  ifNilThanValue,
  ifNotNilThanValue,
  inProgress,
  isChangeable,
  isDef,
  isDisabled,
  isDisplayValueOnly,
  isFieldInactive,
  isFn,
  isFocused,
  isFocusPrevented,
  isKeyboardOpen,
  isKeyboardUsed,
  isReadOnly,
  isRequired,
  isSyntheticCursorUsed,
  isValuePresent,
  isVisible,
  notNilValuesFilter,
  orNull,
} from '../../../util';
import { IUniversalField } from '../../../entities-definitions.interface';
import { IUniversalFieldProps } from '../../../configurations-definitions.interface';
import {
  AnyT,
  CLEAR_DIRTY_CHANGES_VALUE,
  IFocusEvent,
  IKeyboardEvent,
} from '../../../definitions.interface';
import {
  FIELD_EMPTY_ERROR_VALUE,
  IUniversalFieldState,
} from './field.interface';
import {
  FIELD_DISPLAY_EMPTY_VALUE,
  IGenericFieldEntity,
} from '../../../definition';
import { UniversalComponent } from '../../base/universal.component';

export abstract class UniversalField<TProps extends IUniversalFieldProps,
                                     TState extends IUniversalFieldState>
  extends UniversalComponent<TProps, TState>
  implements IUniversalField<TProps, TState> {

  protected static logger = LoggerFactory.makeLogger('UniversalField');
  private static DEFAULT_CARET_BLINKING_FREQUENCY_TIMEOUT = 400;

  private caretBlinkingTask: DelayedTask; // Used with a synthetic keyboard together

  /**
   * @stable [17.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onChangeManually = this.onChangeManually.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.closeVirtualKeyboard = this.closeVirtualKeyboard.bind(this);
    this.onCloseVirtualKeyboard = this.onCloseVirtualKeyboard.bind(this);

    this.state = {} as TState;

    if (this.isKeyboardUsed && this.isSyntheticCursorUsed) {
      this.caretBlinkingTask = new DelayedTask(
        this.setCaretVisibility.bind(this),
        props.caretBlinkingFrequencyTimeout || UniversalField.DEFAULT_CARET_BLINKING_FREQUENCY_TIMEOUT,
        true
      );
    }
  }

  /**
   * @stable [20.08.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    // Need to invoke a user validator if it exists (After F5, etc...)
    this.validateValueAndSetCustomValidity(this.value);

    if (this.props.autoFocus) {
      this.setFocus();
    }
  }

  /**
   * @stable [04.09.2018]
   * @param {TProps} prevProps
   * @param {TState} prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    super.componentDidUpdate(prevProps, prevState);

    const keyboardUsed = this.isKeyboardUsed;
    if (keyboardUsed && this.isKeyboardOpen() && !R.equals(this.value, prevProps.value)) {
      this.refreshCaretPosition();
    }
    if (isKeyboardUsed(prevProps) && !keyboardUsed) {
      this.closeVirtualKeyboard();
    }
  }

  /**
   * @stable [17.06.2018]
   */
  public resetError(): void {
    this.validateField(CLEAR_DIRTY_CHANGES_VALUE);
  }

  /**
   * @stable [20.08.2018]
   */
  public clearValue(): void {
    this.setFocus();    // UX

    if (this.isValuePresent) {
      this.onChangeManually(this.emptyValue);
    }

    const props = this.props;
    if (isFn(props.onClear)) {
      props.onClear();
    }
  }

  /**
   * @stable [27.07.2018]
   * @param {AnyT} event
   */
  public onChange(event: AnyT): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  /**
   * @stable [07.01.2018]
   * @param {AnyT} currentRawValue
   */
  public onChangeManually(currentRawValue: AnyT): void {
    if (this.props.preventManualChanges !== true) {
      this.onChangeValue(currentRawValue);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyBackspace(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyBackspace)) {
      props.onKeyBackspace(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyUp(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyUp)) {
      props.onKeyUp(event);
    }
  }

  /**
   * @stable [03.09.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyDown(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyDown)) {
      props.onKeyDown(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyEnter(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyEnter)) {
      props.onKeyEnter(event);
    }
  }

  /**
   * @stable [04.09.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyTab(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyTab)) {
      props.onKeyTab(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyEscape(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyEscape)) {
      props.onKeyEscape(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyArrowDown(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyArrowDown)) {
      props.onKeyArrowDown(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyArrowUp(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyArrowUp)) {
      props.onKeyArrowUp(event);
    }
  }

  /**
   * @stable [21.12.2019]
   * @returns {AnyT}
   */
  public get value(): AnyT {
    const value = this.props.value;
    return this.isValueDefined(value) ? value : this.defaultValue;
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} event
   * @returns {AnyT}
   */
  public abstract getRawValueFromEvent(event: AnyT): AnyT;

  /**
   * @stable [06.06.2018]
   */
  public abstract setFocus(): void;

  /**
   * @stable [29.10.2019]
   * @param {boolean} usePrintf
   * @param {AnyT} args
   * @returns {string}
   */
  protected buildDisplayMessage(usePrintf: boolean, ...args: AnyT[]): string {
    return usePrintf
      ? Printf.sprintf(this.t(this.props.displayMessage), ...args)
      : FIELD_DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [30.10.2019]
   * @returns {boolean}
   */
  protected get isValueNotPresent(): boolean {
    return !this.isValuePresent;
  }

  /**
   * @stable [29.10.2019]
   * @returns {boolean}
   */
  protected get isRequired(): boolean {
    return isRequired(this.props);
  }

  /**
   * @stable [05.10.2018]
   * @returns {boolean}
   */
  protected isFieldInvalid(): boolean {
    return !R.isNil(this.error);
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValueAndSetCustomValidity(value: AnyT): string {
    const props = this.props;
    let error = FIELD_EMPTY_ERROR_VALUE;

    this.setNativeInputValidity('');

    if (this.isInputValid()) {
      error = isFn(props.validate) ? props.validate(value) : error;
      if (R.isNil(error)) {
        error = this.validateValue(value); // The custom internal validator
      }

      if (!R.isNil(error)) {
        this.setNativeInputValidity(error);
      }
    } else {
      error = this.getNativeInputValidationMessage();
    }
    return error;
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValue(value: AnyT): string {
    return FIELD_EMPTY_ERROR_VALUE;
  }

  /**
   * @stable [03.09.2018]
   * @returns {boolean}
   */
  protected isInputValid(): boolean {
    return true;
  }

  /**
   * @stable [31.07.2018]
   * @returns {string}
   */
  protected getNativeInputValidationMessage(): string {
    return FIELD_EMPTY_ERROR_VALUE;
  }

  /**
   * @stable [31.07.2018]
   * @param {string} error
   */
  protected setNativeInputValidity(error: string): void {
    // Do nothing
  }

  /**
   * @stable [17.06.2018]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string | RegExp> {
    return this.props.mask;
  }

  /**
   * @stable [17.06.2018]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return this.props.pattern;
  }

  /**
   * @stable [12.02.2019]
   * @param {AnyT} value
   * @param {boolean} returnDisplayValue
   * @returns {AnyT}
   */
  protected getDecoratedValue(value: AnyT, returnDisplayValue = true): AnyT {
    const props = this.props;
    const displayValue = props.displayValue;
    const decoratedValue = this.decorateValueBeforeDisplaying(value);
    return isFn(displayValue)
      ? calc(displayValue, decoratedValue)
      : (
        returnDisplayValue
          ? (R.isNil(displayValue) ? decoratedValue : this.decorateValueBeforeDisplaying(displayValue))
          : decoratedValue
      );
  }

  /**
   * @stable [07.01.2018]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected decorateValueBeforeDisplaying(value: AnyT): AnyT {
    return value;
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected get isInactive(): boolean {
    return isFieldInactive(this.props);
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected get isActive(): boolean {
    return !this.isInactive;
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected get isDisabled(): boolean {
    return isDisabled(this.props);
  }

  /**
   * @stable [29.10.2019]
   * @returns {boolean}
   */
  protected get isReadOnly(): boolean {
    return isReadOnly(this.props);
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected get isChangeable(): boolean {
    return isChangeable(this.props);
  }

  /**
   * @stable [30.10.2019]
   * @returns {boolean}
   */
  protected get isFocused(): boolean {
    return this.isKeyboardUsed ? this.isKeyboardOpen() : isFocused(this.state);
  }

  /**
   * @stable [25.10.2019]
   * @returns {boolean}
   */
  protected get isVisible(): boolean {
    return isVisible(this.props);
  }

  /**
   * @stable [25.10.2019]
   * @returns {boolean}
   */
  protected get inProgress(): boolean {
    return inProgress(this.props);
  }

  /**
   * @stable [30.10.2019]
   * @param {IFocusEvent} event
   */
  protected onFocus(event: IFocusEvent): void {
    if (this.isFocusPrevented || this.isKeyboardUsed) {
      this.removeFocus(); // Prevent native keyboard opening during use of a synthetic keyboard

      if (this.isKeyboardUsed) {
        this.openVirtualKeyboard();
      }
    } else {
      this.setState({focused: true});
    }

    const props = this.props;
    if (isFn(props.onFocus)) {
      props.onFocus(event);
    }
  }

  /**
   * @stable [30.10.2019]
   * @param {IFocusEvent} event
   */
  protected onBlur(event: IFocusEvent): void {
    this.setState({focused: false});

    const props = this.props;
    if (isFn(props.onBlur)) {
      props.onBlur(event);
    }
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [23.12.2019]
   * @react-native-compatible
   * @returns {React.ReactNode}
   */
  protected getDisplayValueElement(): React.ReactNode {
    return orNull(
      this.isDisplayValueOnly,
      () => this.inProgress
        ? (this.decoratedValue || this.getWaitMessageElement())
        : this.decoratedValue
    );
  }

  /**
   * @stable [23.12.2019]
   * @react-native-compatible
   * @returns {React.ReactNode}
   */
  protected getWaitMessageElement(): React.ReactNode {
    return this.settings.messages.PLEASE_WAIT;
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected openVirtualKeyboard(): boolean {
    if (this.isKeyboardOpen()) {
      return false;
    }
    this.setState({keyboardOpen: true}, () => {
      if (isDef(this.caretBlinkingTask)) {
        this.caretBlinkingTask.start();

        /**
         * @bugfix [08.05.2019]
         * Need to refresh a caret position right after keyboard opening
         */
        this.refreshCaretPosition();
      }
    });
    return true;
  }

  /**
   * @stable [28.10.2019]
   */
  protected closeVirtualKeyboard(): void {
    this.setState({keyboardOpen: false}, this.onCloseVirtualKeyboard);
  }

  /**
   * @stable [28.10.2019]
   */
  protected onCloseVirtualKeyboard(): void {
    if (isDef(this.caretBlinkingTask)) {
      this.caretBlinkingTask.stop();
    }
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected isKeyboardOpen(): boolean {
    return isKeyboardOpen(this.state);
  }

  /**
   * @stable [24.10.2019]
   * @returns {boolean}
   */
  protected get isFocusPrevented() {
    return isFocusPrevented(this.props);
  }

  /**
   * @stable [24.10.2019]
   * @returns {boolean}
   */
  protected get isKeyboardUsed() {
    return isKeyboardUsed(this.props);
  }

  /**
   * @stable [21.12.2019]
   * @returns {boolean}
   */
  protected get isDisplayValueOnly() {
    return isDisplayValueOnly(this.props);
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getErrorMessageElement(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.errorMessageRendered !== false,
      () => this.toMessageElement(this.error, 'rac-field-error-text')
    );
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getMessageElement(): JSX.Element {
    return ifNotNilThanValue(this.props.message, (message) => this.toMessageElement(message));
  }

  /**
   * @stable [03.09.2018]
   * @returns {string}
   */
  protected get error(): string {
    return this.state.error;
  }

  /**
   * @stable [04.09.2018]
   */
  protected refreshCaretPosition(): void {
    const caretPosition = this.getCaretPosition();
    this.setState({caretPosition});

    UniversalField.logger.debug(
      `[$UniversalField][refreshCaretPosition] A caret position ${caretPosition} for the field ${
        this.props.name} had been refreshed.`
    );
  }

  /**
   * @stable [04.09.2018]
   * @returns {number}
   */
  protected getCaretPosition(): number {
    // Need to implement
    return 0;
  }

  /**
   * @stable [30.10.2019]
   * @returns {boolean}
   */
  protected get isSyntheticCursorUsed(): boolean {
    return isSyntheticCursorUsed(this.props);
  }

  /**
   * @stable [21.12.2019]
   * @param value
   * @returns {boolean}
   */
  protected isValueDefined(value: AnyT): boolean {
    return isDef(value);
  }

  /**
   * @stable [21.12.2019]
   * @returns {boolean}
   */
  protected get isValuePresent(): boolean {
    return isValuePresent(this.value, this.emptyValue);
  }

  /**
   * @stable [21.12.2019]
   * @returns {boolean}
   */
  protected get isDisplayValueDefined(): boolean {
    return isDef(this.props.displayValue);
  }

  /**
   * @stable [21.12.2019]
   * @returns {AnyT}
   */
  protected get defaultValue(): AnyT {
    return this.props.defaultValue;
  }

  /**
   * @stable [21.12.2019]
   * @returns {AnyT}
   */
  protected get displayValue(): AnyT {
    return this.inProgress || !this.isValuePresent
      ? FIELD_DISPLAY_EMPTY_VALUE
      : this.decoratedValue;
  }

  /**
   * @stable [21.12.2019]
   * @returns {AnyT}
   */
  protected get decoratedValue(): AnyT {
    return this.getDecoratedValue(this.value);
  }

  /**
   * @stable [21.12.2019]
   * @returns {AnyT}
   */
  protected get originalEmptyValue(): AnyT {
    return FIELD_DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [21.12.2019]
   * @returns {AnyT}
   */
  protected get emptyValue(): AnyT {
    const props = this.props;
    return isDef(props.emptyValue) ? props.emptyValue : this.originalEmptyValue;
  }

  /**
   * @stable [03.09.2018]
   */
  protected abstract removeFocus(): void;

  /**
   * @stable [22.03.2019]
   * @param {string} message
   * @param {string} className
   * @returns {JSX.Element}
   */
  protected abstract toMessageElement(message: string, className?: string): JSX.Element;

  /**
   * @stable [31.07.2018]
   * @param {AnyT} currentRawValue
   */
  private onChangeValue(currentRawValue: AnyT): void {
    const actualFieldValue = buildActualFieldValue({
      ...this.props as IGenericFieldEntity,
      emptyValue: this.emptyValue,
      value: currentRawValue,
    });

    this.validateField(actualFieldValue);
    this.notifyAboutChanges(actualFieldValue);
    this.notifyFormAboutChanges(actualFieldValue);
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} rawValue
   */
  private validateField(rawValue: AnyT): void {
    // State value cannot take an undefined value then we should pass a null value at least
    this.setState({error: this.validateValueAndSetCustomValidity(rawValue)});
  }

  /**
   * @stable [16.11.2019]
   * @param {AnyT} rawValue
   */
  private notifyFormAboutChanges(rawValue: AnyT): void {
    const props = this.props;

    ifNotNilThanValue(
      this.props.changeForm,
      (changeForm) => changeForm(props.name, rawValue)
    );
  }

  /**
   * @stable [16.11.2019]
   * @param {AnyT} rawValue
   */
  private notifyAboutChanges(rawValue: AnyT): void {
    ifNotNilThanValue(
      this.props.onChange,
      (onChange) => onChange(rawValue)
    );
  }

  /**
   * @stable [09.11.2019]
   */
  private setCaretVisibility(): void {
    this.setState((prevState) => notNilValuesFilter<IUniversalFieldState, IUniversalFieldState>({
      caretVisibility: !prevState.caretVisibility,
      caretPosition: ifNilThanValue(prevState.caretPosition, () => this.getCaretPosition()),
    }));
  }
}
