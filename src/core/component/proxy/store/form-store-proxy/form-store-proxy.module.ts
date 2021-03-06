import { interfaces } from 'inversify';

import {
  appContainer,
  DI_TYPES,
} from '../../../../di';
import { IGenericContainer } from '../../../../definition';
import { FormStoreProxy } from './form-store.proxy';

/**
 * @stable [27.11.2019]
 */
appContainer.bind(DI_TYPES.FormStoreProxyFactory)
  .toFactory(
    (ctx: interfaces.Context) => (parent: IGenericContainer) => new FormStoreProxy(parent)
  );
