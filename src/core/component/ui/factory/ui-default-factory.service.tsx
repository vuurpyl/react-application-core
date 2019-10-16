import * as React from 'react';
import { injectable } from 'inversify';
import { Store } from 'redux';

import { DI_TYPES, lazyInject } from '../../../di';
import {
  ErrorEventCategoriesEnum,
  IDomAccessor,
  IEnvironment,
  ILogManager,
  IRouter,
  IRoutesEntity,
  IUiFactory,
  IUniversalStoreEntity,
} from '../../../definition';
import { ISettingsEntity } from '../../../settings';
import {
  getCurrentUrlPath,
  handlerPropsFactory,
  ifNotNilThanValue,
  joinClassName,
} from '../../../util';

@injectable()
export class UIDefaultFactory implements IUiFactory {
  @lazyInject(DI_TYPES.DomAccessor) protected readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Environment) protected readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.LogManager) protected readonly logManager: ILogManager;
  @lazyInject(DI_TYPES.Router) protected readonly router: IRouter;
  @lazyInject(DI_TYPES.Routes) protected readonly routes: IRoutesEntity;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Store) protected readonly store: Store<IUniversalStoreEntity>;

  /**
   * @stable [07.10.2019]
   */
  constructor() {
    this.onRestart = this.onRestart.bind(this);
    this.onRestartAndReload = this.onRestartAndReload.bind(this);
  }

  /**
   * @stable [16.10.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  public makeWindowErrorElement(e: Error): Element {
    this.logError(ErrorEventCategoriesEnum.WINDOW_ERROR, e);

    const errorMessageWrapperEl = this.domAccessor.createElement();
    const errorMessageEl = this.domAccessor.createElement('div', errorMessageWrapperEl);
    this.domAccessor.addClassNames(errorMessageWrapperEl, ...this.getErrorWrapperClassNames());
    this.domAccessor.addClassNames(errorMessageEl, ...this.getErrorClassNames());
    this.domAccessor.addChild(errorMessageWrapperEl);
    this.makeWindowErrorBodyElement(e, errorMessageEl);
    return errorMessageWrapperEl;
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {React.ReactNode}
   */
  public makeReactErrorElement(e: Error): React.ReactNode {
    this.logError(ErrorEventCategoriesEnum.REACT_ERROR, e);

    return (
      <div className={joinClassName(...this.getErrorWrapperClassNames())}>
        <div className={joinClassName(...this.getErrorClassNames())}>
          {this.makeReactErrorBodyElement(e)}
        </div>
      </div>
    );
  }

  /**
   * @stable [16.10.2019]
   * @param {Error} e
   * @param {Element} parent
   */
  protected makeWindowErrorBodyElement(e: Error, parent: Element): void {
    this.makeWindowRestartActionElement(parent);

    const content = this.domAccessor.createElement('div', parent);
    content.textContent = this.buildErrorMessages(e).join('<br>');
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  protected makeReactErrorBodyElement(e: Error): JSX.Element {
    return (
      <React.Fragment>
        {this.makeReactRestartActionElement()}
        {this.getErrorMessagesElement(e)}
      </React.Fragment>
    );
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} error
   * @returns {string[]}
   */
  protected buildErrorMessages(error: Error): string[] {
    const messages = this.settings.messages;
    return [
      messages.SOMETHING_WENT_WRONG,
      messages.PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER,
      this.errorSystemInfoLine,
      `${messages.ERROR}: ${error.message}`,
      `${messages.DETAILS_INFO}: [${error.stack}]`
    ];
  }

  /**
   * @stable [07.10.2019]
   * @returns {string}
   */
  protected get errorSystemInfoLine(): string {
    const environment = this.environment;
    const messages = this.settings.messages;
    const user = this.store.getState().user;
    return [
      `${messages.ENVIRONMENT}: `,
      [
        ifNotNilThanValue(user, () => `${messages.USER} ${user.id}`),
        `${messages.BUILD} ${environment.appVersion}`,
        `${environment.browserName} ${environment.browserVersion}${environment.platformType}`,
        `${messages.PATH} ${getCurrentUrlPath()}`
      ].join(', ')
    ].join('');
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  protected getErrorMessagesElement(e: Error): JSX.Element {
    return (
      <React.Fragment>
        {this.buildErrorMessages(e).map((v, index) => <div key={`error-` + index}>{v}</div>)}
      </React.Fragment>
    );
  }

  /**
   * @stable [07.10.2019]
   * @returns {string[]}
   */
  protected getErrorWrapperClassNames(): string[] {
    return ['rac-window-error-wrapper', 'rac-full-size', 'rac-fixed'];
  }

  /**
   * @stable [07.10.2019]
   * @returns {string[]}
   */
  protected getErrorClassNames(): string[] {
    return ['rac-window-error', 'rac-alignment-center'];
  }

  /**
   * @stable [16.10.2019]
   * @returns {JSX.Element}
   */
  protected makeReactRestartActionElement(): JSX.Element {
    return (
      <button
        {...handlerPropsFactory(this.onRestartAndReload)}
        className={joinClassName(...this.getRestartActionClassName())}>
        {this.settings.messages.RESTART_APP}
      </button>
    );
  }

  /**
   * @stable [16.10.2019]
   * @param {Element} parent
   * @returns {Element}
   */
  protected makeWindowRestartActionElement(parent: Element): Element {
    const actionEl = this.domAccessor.createElement<HTMLButtonElement>('button', parent);
    this.domAccessor.addClassNames(actionEl, ...this.getRestartActionClassName());
    actionEl.textContent = this.settings.messages.RESTART_APP;
    actionEl.onclick = this.onRestartAndReload;
    return actionEl;
  }

  /**
   * @stable [07.10.2019]
   * @returns {string[]}
   */
  protected getRestartActionClassName(): string[] {
    return ['rac-window-error-restart-action'];
  }

  /**
   * @stable [07.10.2019]
   */
  protected onRestart(): void {
    this.router.go(-this.router.length);
    this.router.push(this.routes.logout);
  }

  /**
   * In case of an out memory error, it would be better to reload the page
   * @stable [16.10.2019]
   */
  protected onRestartAndReload(): void {
    this.onRestart();
    this.domAccessor.reload(true);
  }

  /**
   * @stable [07.10.2019]
   * @param {ErrorEventCategoriesEnum} errorCategory
   * @param {Error} e
   */
  protected logError(errorCategory: ErrorEventCategoriesEnum, e: Error): void {
    this.logManager.send(errorCategory, e.name, e.stack || e.message);
  }
}
