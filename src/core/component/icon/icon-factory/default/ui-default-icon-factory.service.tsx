import * as React from 'react';
import { injectable } from 'inversify';

import { IUIDefaultIconFactory } from './ui-default-icon-factory.interface';

@injectable()
export class UIDefaultIconFactory implements IUIDefaultIconFactory {

  // tslint:disable:max-line-length
  // https://svg2jsx.herokuapp.com/
  private static readonly SUPPORTED_ICONS_MAPS: Record<string, JSX.Element> = {
    'back': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M8.59 16.94a1.485 1.485 0 0 1 0 2.121 1.534 1.534 0 0 1-2.147 0L.667 13.59A2.203 2.203 0 0 1 0 12c0-.6.237-1.167.666-1.59l5.775-5.47a1.538 1.538 0 0 1 2.151 0 1.488 1.488 0 0 1 0 2.12l-3.72 3.44H22.5c.83 0 1.5.67 1.5 1.5 0 .825-.672 1.5-1.5 1.5H4.869l3.722 3.441z'
        />
      </svg>
    ),
    'store': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='64' height='64' viewBox='0 0 64 64'>
        <path fill='currentColor' d='M7.053 2c-1.645 0-3 1.355-3 3v4.523L-1 19.768V25c0 2.039 1.24 3.798 3 4.574V63h60V29.574c1.76-.776 3-2.535 3-4.574v-5.232L59.947 9.523V5c0-1.645-1.355-3-3-3H7.053zm0 2h49.894c.565 0 1 .435 1 1v4.99l.104.21L63 20.231V25c0 1.668-1.332 3-3 3s-3-1.332-3-3h-2c0 1.668-1.332 3-3 3s-3-1.332-3-3h-2c0 1.668-1.332 3-3 3s-3-1.332-3-3h-2c0 1.668-1.332 3-3 3s-3-1.332-3-3h-2c0 1.668-1.332 3-3 3s-3-1.332-3-3h-2c0 1.668-1.332 3-3 3s-3-1.332-3-3h-2c0 1.668-1.332 3-3 3s-3-1.332-3-3H7c0 1.668-1.332 3-3 3s-3-1.332-3-3v-4.768L6.053 9.99V5c0-.565.435-1 1-1zM8 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM4 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM8 27.838C8.909 29.112 10.325 30 12 30c1.675 0 3.091-.888 4-2.162.909 1.274 2.325 2.162 4 2.162 1.675 0 3.091-.888 4-2.162.909 1.274 2.325 2.162 4 2.162 1.675 0 3.091-.888 4-2.162.909 1.274 2.325 2.162 4 2.162 1.675 0 3.091-.888 4-2.162.909 1.274 2.325 2.162 4 2.162 1.675 0 3.091-.888 4-2.162.909 1.274 2.325 2.162 4 2.162 1.675 0 3.091-.888 4-2.162.909 1.274 2.325 2.162 4 2.162v31h-7v-5a1 1 0 0 0 0-2V35H11v19a1 1 0 0 0 0 2v5H4V30c1.675 0 3.091-.888 4-2.162zM13 37h19a1 1 0 0 0 2 0h17v24H34a1 1 0 0 0-2 0H13V37zm20 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-4 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM7 54a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm50 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-24 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'
        />
      </svg>
    ),
    'cloud': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M23.999 15.958a6.424 6.424 0 0 1-6.315 6.539H7.186a7.46 7.46 0 0 1-7.124-6.5 7.461 7.461 0 0 1 5.234-8.099A8.443 8.443 0 0 1 12.872 3a8.597 8.597 0 0 1 8.383 7.649A6.544 6.544 0 0 1 24 15.958h-.001zm-4.845-3.15l-.75-.404-.045-.85a5.644 5.644 0 0 0-5.489-5.55 5.496 5.496 0 0 0-5.099 3.694l-.315.825-.87.135a4.472 4.472 0 0 0 .6 8.848h10.498A3.433 3.433 0 0 0 21 15.967a3.542 3.542 0 0 0-1.845-3.162v.003z'
        />
      </svg>
    ),
    'power': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M12 23.996A11.997 11.997 0 0 1 5.072 2.202a1.499 1.499 0 0 1 2.363 1.082 1.5 1.5 0 0 1-.624 1.365 9.002 9.002 0 0 0-3.39 10.074 9.001 9.001 0 0 0 17.158 0 9 9 0 0 0-3.39-10.074 1.502 1.502 0 1 1 1.74-2.447 12.001 12.001 0 0 1 4.507 13.431A12.002 12.002 0 0 1 12 23.996zm0-11.998a1.5 1.5 0 0 1-1.5-1.5V1.5a1.5 1.5 0 0 1 3 0v8.998a1.5 1.5 0 0 1-1.5 1.5z'
        />
      </svg>
    ),
    'cashier': (
      <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
        <path fill='currentColor' d='M26 0l-3 1.5-2-1-2 1-2-1-2 1-2-1L10 2v5.617H6.86a3.013 3.013 0 0 0-2.993 2.781L1 49.582v11.035c0 1.645 1.355 3 3 3h56c1.645 0 3-1.355 3-3V49.582L60.656 17.73c.219-.32.344-.703.344-1.113v-11c0-1.094-.906-2-2-2H37c-1.094 0-2 .906-2 2v2h-9V0zM13 2.734l2 1 2-1 2 1 2-1 2 1 1-.5v14.883H12V3.234l1-.5zm24 2.883h22v11H37v-11zm-30.14 4H10v7a1.999 1.999 0 1 0 0 4h16c1.105 0 2-.894 2-2 0-1.105-.895-2-2-2v-7h9v7c0 1.094.906 2 2 2h7v3h2v-3h4v3h2v-3h6.715L61 49.652v10.965c0 .567-.434 1-1 1H4c-.566 0-1-.433-1-1V49.652l2.86-39.109a.99.99 0 0 1 1-.926zm41.14 3c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm-44 15c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h5c.55 0 1-.449 1-1v-5c0-.55-.45-1-1-1h-5zm10 0c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h5c.55 0 1-.449 1-1v-5c0-.55-.45-1-1-1h-5zm10 0c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h5c.55 0 1-.449 1-1v-5c0-.55-.45-1-1-1h-5zm15 0c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h5c.55 0 1-.449 1-1v-5c0-.55-.45-1-1-1h-5zm-34 2h3v3h-3v-3zm10 0h3v3h-3v-3zm10 0h3v3h-3v-3zm15 0h3v3h-3v-3zm-36 8c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h5c.55 0 1-.449 1-1v-5c0-.55-.45-1-1-1h-5zm10 0c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h5c.55 0 1-.449 1-1v-5c0-.55-.45-1-1-1h-5zm10 0c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h5c.55 0 1-.449 1-1v-5c0-.55-.45-1-1-1h-5zm15 0c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h5c.55 0 1-.449 1-1v-5c0-.55-.45-1-1-1h-5zm-34 2h3v3h-3v-3zm10 0h3v3h-3v-3zm10 0h3v3h-3v-3zm15 0h3v3h-3v-3zm-42 10c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1 0 .551.45 1 1 1s1-.449 1-1c0-.55-.45-1-1-1zm-26 5a1.999 1.999 0 1 0 0 4c1.105 0 2-.894 2-2 0-1.105-.895-2-2-2z'
        />
      </svg>
    ),
    'passport': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M19.5 24h-15a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3H6c0-3.315 2.685-6 6-6s6 2.685 6 6h1.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zM12 3a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3zm7.5 6h-15v12h15V9zM12 12a3 3 0 1 1 0 6 3 3 0 1 1 0-6z'
        />
      </svg>
    ),
    'log-out': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M2.993 21C2.994 21 3 3 3 3c0 .006 7.5 0 7.5 0a1.5 1.5 0 0 0 0-3H2.992A3.007 3.007 0 0 0 0 3v18c0 1.659 1.335 3 2.993 3H10.5a1.5 1.5 0 0 0 0-3H2.992zm16.128-7.5l-3.72 3.441a1.488 1.488 0 0 0 0 2.121 1.534 1.534 0 0 0 2.148 0l5.771-5.47c.43-.425.68-.988.68-1.59 0-.6-.25-1.168-.68-1.59L17.546 4.94a1.53 1.53 0 0 0-2.146 0 1.485 1.485 0 0 0 0 2.121l3.716 3.438H10.5a1.5 1.5 0 1 0 0 3h8.62z'
        />
      </svg>
    ),
    'close': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M3.105 5.226a1.501 1.501 0 0 1 0-2.12 1.501 1.501 0 0 1 2.121 0L12 9.877l6.773-6.773a1.501 1.501 0 0 1 2.121 0 1.501 1.501 0 0 1 0 2.121L14.12 12l6.773 6.773a1.501 1.501 0 0 1 0 2.121 1.501 1.501 0 0 1-2.12 0l-6.774-6.773-6.773 6.773a1.501 1.501 0 0 1-2.12 0 1.501 1.501 0 0 1 0-2.12l6.772-6.774-6.773-6.773z'
        />
      </svg>
    ),
    'list': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M3.105 5.226a1.501 1.501 0 0 1 0-2.12 1.501 1.501 0 0 1 2.121 0L12 9.877l6.773-6.773a1.501 1.501 0 0 1 2.121 0 1.501 1.501 0 0 1 0 2.121L14.12 12l6.773 6.773a1.501 1.501 0 0 1 0 2.121 1.501 1.501 0 0 1-2.12 0l-6.774-6.773-6.773 6.773a1.501 1.501 0 0 1-2.12 0 1.501 1.501 0 0 1 0-2.12l6.772-6.774-6.773-6.773z'
        />
      </svg>
    ),
    'circle': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-3a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9z'
        />
      </svg>
    ),
    'dropdown': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M12 20.002c.6 0 1.167-.237 1.59-.665l9.972-10.25a1.527 1.527 0 0 0 0-2.141 1.488 1.488 0 0 0-2.121 0L12 16.66 2.56 6.945a1.485 1.485 0 0 0-2.12 0 1.527 1.527 0 0 0 0 2.143l9.968 10.249c.425.428.988.665 1.59.665H12z'
        />
      </svg>
    ),
    'home': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M18.005 21c0-.013-11.997 0-11.997 0 .01 0 0-7.502 0-7.502a1.5 1.5 0 0 0-3 0v7.501a3 3 0 0 0 3 3.001h11.997a3 3 0 0 0 2.99-3v-7.502a1.5 1.5 0 1 0-3 0l.009 7.501h.001zm4.652-9.006a1.457 1.457 0 0 1-1.096-.343l-.01.007-9.562-8.134-9.553 8.086c-.303.26-.699.383-1.095.34a1.446 1.446 0 0 1-1.002-.559c-.524-.669-.43-1.63.21-2.187L10.907.394a1.636 1.636 0 0 1 2.13 0l10.415 8.853c.64.558.732 1.519.21 2.186-.243.317-.606.52-1.005.561zm-9.157 4.49v4.508h-3V16.5c0-.83.68-1.496 1.5-1.5.82-.004 1.5.67 1.5 1.483z'
        />
      </svg>
    ),
    'favorite': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M21.69 14.242a33.258 33.258 0 0 1-3 3.675 58.134 58.134 0 0 1-3.267 3.23c-.67.611-1.2 1.066-1.515 1.328a3.005 3.005 0 0 1-3.828 0c-.315-.262-.844-.72-1.515-1.329a54.864 54.864 0 0 1-3.273-3.23 33.824 33.824 0 0 1-2.99-3.665A10.843 10.843 0 0 1 .006 8.23a7.273 7.273 0 0 1 2.16-5.452A7.39 7.39 0 0 1 12 2.329a7.384 7.384 0 0 1 9.837.45 7.273 7.273 0 0 1 2.154 5.43 10.809 10.809 0 0 1-2.302 6.034l.001-.001zm-1.975-9.327a4.398 4.398 0 0 0-6.17 0l-1.55 1.533-1.549-1.533a4.415 4.415 0 0 0-6.177 0 4.287 4.287 0 0 0-1.275 3.267c-.06 4.474 9 11.98 9 11.98s9.056-7.5 9-11.985a4.27 4.27 0 0 0-1.28-3.262z'
        />
      </svg>
    ),
    'clock': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-21a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm6 10.5h-6a1.498 1.498 0 0 1-1.5-1.485v-6.03c0-.825.672-1.5 1.5-1.5s1.5.675 1.5 1.5V10.5H18a1.5 1.5 0 0 1 0 3z'
        />
      </svg>
    ),
    'sale': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 3a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm13 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 3a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm.272-19.895a1.501 1.501 0 0 1 2.121 0 1.501 1.501 0 0 1 0 2.121L5.226 20.893a1.501 1.501 0 0 1-2.12 0 1.501 1.501 0 0 1 0-2.12L18.771 3.104z'
        />
      </svg>
    ),
    'dollar': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M13.5 3.5H17a1.5 1.5 0 0 1 0 3h-3.5v4h1a5 5 0 1 1 0 10h-1v2a1.5 1.5 0 0 1-3 0v-2H6a1.5 1.5 0 0 1 0-3h4.5v-4h-1a5 5 0 1 1 0-10h1v-2a1.5 1.5 0 0 1 3 0v2zm0 10v4h1a2 2 0 1 0 0-4h-1zm-3-3v-4h-1a2 2 0 1 0 0 4h1z'
        />
      </svg>
    ),
    'search': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M21.442 23.555a1.481 1.481 0 0 0 2.119 0 1.53 1.53 0 0 0 0-2.145l-4.62-4.62a10.474 10.474 0 0 0 2.079-6.28C21.02 4.707 16.314 0 10.51 0 4.707 0 0 4.705 0 10.51c0 5.806 4.705 10.511 10.51 10.511 2.363 0 4.546-.78 6.3-2.096l4.633 4.63zM3.003 10.51a7.507 7.507 0 1 1 15.014 0 7.506 7.506 0 1 1-15.012 0h-.002z'
        />
      </svg>
    ),
    'menu': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M1.5 21h21a1.5 1.5 0 0 0 0-3h-21a1.5 1.5 0 0 0 0 3zm0-7.5h21a1.5 1.5 0 0 0 0-3h-21a1.5 1.5 0 0 0 0 3zm0-7.5h21a1.5 1.5 0 0 0 0-3h-21a1.5 1.5 0 0 0 0 3z'
        />
      </svg>
    ),
    'dropdown-opened': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <defs>
          <path id='dropdown-opened' d='M12 17.5c.6 0 1.166-.237 1.59-.665L23.56 6.586a1.527 1.527 0 0 0 0-2.142 1.488 1.488 0 0 0-2.12 0l-9.442 9.714-9.44-9.714a1.485 1.485 0 0 0-2.12 0 1.527 1.527 0 0 0 0 2.142l9.969 10.25c.424.427.987.664 1.59.664h.001z'
          />
        </defs>
        <use fill='currentColor' fillRule='evenodd' transform='matrix(1 0 0 -1 0 21.498)'
             xlinkHref='#dropdown-opened' />
      </svg>
    ),
    'pin-delete-thin': (
      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'>
        <path fill='currentColor' fillRule='evenodd' d='M10.037 0L0 12l10.037 12h26.766c1.76 0 3.2-1.44 3.2-3.2V3.2c0-1.76-1.44-3.2-3.2-3.2H10.038zm.732 1.6h26.034c.894 0 1.6.706 1.6 1.6v17.6c0 .894-.706 1.6-1.6 1.6H10.772L2 12l8.769-10.4zm7.4 5.034l-1.131 1.132L21.272 12l-4.234 4.234 1.13 1.132 4.235-4.235 4.235 4.235 1.13-1.132L23.535 12l4.235-4.234-1.131-1.132-4.235 4.235-4.234-4.235z'/>
      </svg>
    ),
  };
  // tslint:enable:max-line-length

  /**
   * @stable [25.01.2019]
   * @param {string} iconName
   * @returns {JSX.Element}
   */
  public makeInstance(iconName: string): JSX.Element {
    return UIDefaultIconFactory.SUPPORTED_ICONS_MAPS[iconName];
  }
}
