import {
  IContainerProps,
  IReduxHolderListEntity,
} from '../../definition';
import { IListConfigurationWrapper } from '../../definitions.interface';

/**
 * @stable [05.05.2018]
 */
export interface ICardListContainerProps extends IContainerProps,
                                                 IReduxHolderListEntity,
                                                 IListConfigurationWrapper<any> { // TODO
}
