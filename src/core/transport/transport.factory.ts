import { Store } from 'redux';
import Axios from 'axios/dist/axios';
import { injectable } from 'inversify';
import * as ramda from 'ramda';
import { ILogger, LoggerFactory } from 'ts-smart-logger';

import { IApplicationSettings } from '../settings';
import { lazyInject, DI_TYPES } from '../di';
import { ApplicationStateT } from '../store';

import {
  IApplicationTransportFactory,
  ITransportRequest,
  ITransportRawRequest,
} from './transport.interface';

@injectable()
export class TransportFactory implements IApplicationTransportFactory {

  private static logger: ILogger = LoggerFactory.makeLogger(TransportFactory);

  private operationsMap = new Map<string, Axios.CancelTokenSource>();
  @lazyInject(DI_TYPES.Store) private store: Store<ApplicationStateT>;
  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;

  public request<TResponse>(req: ITransportRequest): Promise<TResponse> {
    let source: Axios.CancelTokenSource;
    const operationId = req.operation && req.operation.id;

    if (operationId) {
      const cancelToken = Axios.CancelToken;
      source = cancelToken.source();
      this.operationsMap.set(operationId, source);
    }

    return Axios.request({
      url: this.settings.apiUrl + '?_dc=' + Date.now(),
      method: 'POST',
      data: this.toRequestParams(req),
      ...(source ? { cancelToken: source.token } : {} ),
    }).then(
        (res) => {
          this.clearOperation(operationId);
          return res;
        },
        (err) => {
          this.clearOperation(operationId);
          throw err; // This is because of the strange axios behavior
        }
    );
  }

  public cancelRequest(operationId: string): void {
    const source = this.operationsMap.get(operationId);
    if (source) {
      source.cancel('The operation has been canceled by the user.');
      this.clearOperation(operationId);
    } else {
      TransportFactory.logger.warn(`The source has not been found by the operationId ${operationId}`);
    }
  }

  protected toRequestParams(req: ITransportRequest): ITransportRawRequest {
    return ramda.pickBy((value, key) => !ramda.isNil(value), {
      name: req.name,
      params: req.params,
      auth: this.store.getState().transport.token,
    });
  }

  private clearOperation(operationId?: string): void {
    if (!ramda.isNil(operationId)) {
      this.operationsMap.delete(operationId);
    }
  }
}
