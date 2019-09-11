import {
  ISectionWrapper,
  IAccessConfigurationWrapper,
} from '../../definitions.interface';
import { IContainerClassEntity } from '../../entities-definitions.interface';
import {
  IRouteConfigEntity,
  IAccessConfiguration,
} from '../../configurations-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';

export interface IRootContainerProps extends IContainerProps,
                                             IRouteConfigEntity,
                                             ISectionWrapper,
                                             IAccessConfigurationWrapper<IAccessConfiguration> {
  container?: IContainerClassEntity;
}

export const ROOT_SECTION = 'root';
