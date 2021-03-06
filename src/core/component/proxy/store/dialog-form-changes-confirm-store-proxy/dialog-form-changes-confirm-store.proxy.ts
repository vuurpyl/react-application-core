import * as React from 'react';

import { StoreProxy } from '../store.proxy';
import {
  IDialog,
  IDialogFormChangesConfirmStoreProxy,
  IGenericContainer,
  IGenericContainerProps,
  IReduxStoreEntity,
  IRouterStoreProxy,
  IRouterStoreProxyFactoryConfigEntity,
  RouterStoreProxyFactoryT,
} from '../../../../definition';
import {
  DI_TYPES,
  lazyInject,
} from '../../../../di';
import { UNDEF } from '../../../../definitions.interface';

export class DialogFormChangesConfirmStoreProxy<TStore extends IReduxStoreEntity = IReduxStoreEntity,
                                                TProps extends IGenericContainerProps = IGenericContainerProps>
  extends StoreProxy<TStore, TProps>
  implements IDialogFormChangesConfirmStoreProxy {

  @lazyInject(DI_TYPES.RouterStoreProxyFactory) private readonly routerStoreProxyFactory: RouterStoreProxyFactoryT;

  private readonly dialogRef = React.createRef<IDialog>();
  private readonly routerStoreProxy: IRouterStoreProxy;
  private readonly originalGoBackFn: () => void;
  private $cachedDepth: number;

  /**
   * @stable [30.03.2020]
   * @param {IGenericContainer<TProps extends IGenericContainerProps>} container
   */
  constructor(readonly container: IGenericContainer<TProps>) {
    super(container);

    this.goBack = this.goBack.bind(this);
    this.activateDialog = this.activateDialog.bind(this);

    this.routerStoreProxy = this.routerStoreProxyFactory(container);
    this.originalGoBackFn = this.routerStoreProxy.goBack;
    this.routerStoreProxy.goBack = this.interceptGoBack.bind(this); // Need to intercept a click event
  }

  /**
   * @stable [20.12.2019]
   * @param {(cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element} factory
   * @returns {React.ReactNode[]}
   */
  public buildNavigationSteps(factory: (cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element): React.ReactNode[] {
    return this.routerStoreProxy.buildNavigationSteps(factory);
  }

  /**
   * @stable [03.10.2019]
   */
  public activateDialog(): void {
    this.dialogRef.current.activate();
  }

  /**
   * @stable [18.12.2019]
   */
  public goBack(): void {
    this.originalGoBackFn.call(this.routerStoreProxy, this.$cachedDepth);
    this.$cachedDepth = UNDEF;
  }

  /**
   * @stable [03.10.2019]
   * @returns {React.RefObject<T extends IDialog>}
   */
  public getDialogRef<T extends IDialog>(): React.RefObject<T> {
    return this.dialogRef as React.RefObject<T>;
  }

  /**
   * @stable [23.12.2019]
   * @param {number} depth
   */
  private interceptGoBack(depth?: number): void {
    this.$cachedDepth = depth;
    this.activateDialog();
  }
}
