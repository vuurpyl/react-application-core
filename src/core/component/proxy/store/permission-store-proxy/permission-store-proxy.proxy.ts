import { namedConstructor } from '../../../../util';
import { DI_TYPES, lazyInject } from '../../../../di';
import {
  IPermissionsService,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../../definition';
import { IPermissionStoreProxy } from './permission-store-proxy.interface';

@namedConstructor('$$permissionStoreProxy')
export class PermissionStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                                  TProps extends IUniversalContainerProps = IUniversalContainerProps>
  implements IPermissionStoreProxy {

  @lazyInject(DI_TYPES.Permission) private readonly permissionService: IPermissionsService;

  /**
   * @stable [14.10.2019]
   * @param {IUniversalContainer<TProps extends IUniversalContainerProps>} container
   */
  constructor(private readonly container: IUniversalContainer<TProps>) {
    this.isAccessible = this.isAccessible.bind(this);
  }

  /**
   * @stable [14.10.2019]
   * @param {TApplicationAccessConfig} checkedObject
   * @returns {boolean}
   */
  public isAccessible<TApplicationAccessConfig>(checkedObject: TApplicationAccessConfig): boolean {
    return this.permissionService.isAccessible(checkedObject);
  }
}