import * as React from 'react';

import {
  AnyT,
  INameWrapper,
  IValueWrapper,
} from '../definitions.interface';

/**
 * @stable [21.06.2020]
 */
export interface IBaseEvent
  extends Partial<Event> {
  nativeEvent?: Event;
}

/**
 * @stable [21.06.2020]
 */
export interface IFocusEvent<TValue = {}>
  extends React.FocusEvent<TValue> {
}

/**
 * @stable [21.06.2020]
 */
export interface IKeyboardEvent<TValue = {}>
  extends React.KeyboardEvent<TValue> {
}

/**
 * @stable [17.05.2020]
 */
export type ChangeEventT = React.ChangeEvent<INameWrapper & IValueWrapper>;

/**
 * @stable [31.08.2019]
 */
export enum TouchEventsEnum {
  TOUCH_START = 'touchstart',
  TOUCH_END = 'touchend',
  TOUCH_CANCEL = 'touchcancel',
  TOUCH_MOVE = 'touchmove',
}

/**
 * @stable [11.09.2019]
 */
export enum EventsEnum {
  CLICK = 'click',
  KEY_DOWN = 'keydown',
  KEY_PRESS = 'keypress',
  LOAD = 'load',
  MOUSE_DOWN = 'mousedown',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
  MOUSE_MOVE = 'mousemove',
  RESIZE = 'resize',
  SCROLL = 'scroll',
  UNLOAD = 'unload',
  WHEEL = 'wheel',
}

/**
 * @stable [24.09.2019]
 */
export interface IEventManager {
  add(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): void;
  remove(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): void;
  fabricate(el: EventTarget, type: string, callback: (...args) => void, model?: AnyT): void;
  subscribe(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): () => void;
}
