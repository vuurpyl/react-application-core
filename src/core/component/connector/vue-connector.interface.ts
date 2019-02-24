import { AnyT, ISectionNameWrapper } from '../../definitions.interface';
import {
  VueComponentOptionsT,
  IVueCustomComputed$Wrapper,
  IVueForceUpdateOnChangeData$Wrapper,
} from '../../vue-definitions.interface';
import { IVueContainer, IVueApplicationStoreEntity } from '../../vue-entities-definitions.interface';

/**
 * @stable [22.10.2018]
 */
export interface IVueConnectorOptionsConfigEntity<TApplicationStoreEntity extends IVueApplicationStoreEntity = IVueApplicationStoreEntity>
  extends VueComponentOptionsT<IVueContainer<TApplicationStoreEntity>>,
          ISectionNameWrapper,
          IVueCustomComputed$Wrapper<Array<(state: TApplicationStoreEntity) => AnyT>>,
          IVueForceUpdateOnChangeData$Wrapper<(state: TApplicationStoreEntity) => AnyT> {
}
