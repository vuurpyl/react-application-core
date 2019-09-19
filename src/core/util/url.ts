import * as URI from 'urijs';
import * as R from 'ramda';

import { IKeyValue } from '../definitions.interface';
import {
  ITransportUrlConfigEntity,
  TransportMethodsEnum,
} from '../definition';
import { isObjectNotEmpty } from './object';

/**
 * @stable [19.09.2019]
 * @param {string} uri
 * @returns {boolean}
 */
export const isAbsoluteURI = (uri: string): boolean => URI(uri).is('absolute');

/**
 * @stable [11.09.2018]
 * @param {IKeyValue} params
 * @returns {string}
 */
export const buildEncodedURI = (params: IKeyValue) => encodeURIComponent(btoa(JSON.stringify(params)));

/**
 * @stable [12.09.2018]
 * @param {string} url
 * @returns {string}
 */
export const prepareUrl = (url: string): string => url.replace(/(\/\/)+/, '/');

/**
 * @stable [16.09.2019]
 * @param {ITransportUrlConfigEntity} config
 * @returns {string}
 */
export const buildTransportUrl = (config: ITransportUrlConfigEntity) => {
  const {urlProvider, dataProvider, entity, settings, dateNow} = config;

  const uniqueParamName = settings.uniqueParamName;
  const method = entity.method;
  const initialUrl = urlProvider(entity);

  const url = new URI(initialUrl);

  if (!R.isNil(uniqueParamName) && entity.noCache !== false) {
    if (!(R.isNil(method) || [TransportMethodsEnum.POST].includes(method as TransportMethodsEnum))) {
      url.addSearch(uniqueParamName, dateNow);
    }
  }
  if (method === TransportMethodsEnum.GET) {
    const params = dataProvider(entity);
    if (isObjectNotEmpty(params)) {
      R.forEachObjIndexed((value, key) => url.addSearch(String(key), value), params);
    }
  }
  return url.valueOf();
};
