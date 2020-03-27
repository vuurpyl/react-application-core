import {
  IEntity,
  IFormSectionWrapper,
  IListSectionWrapper,
  INavigateBackWrapper,
  IRelatedEntityWrapper,
  IStateWrapper,
  ISucceedTextWrapper,
} from '../../definitions.interface';
import {
  IEffectsActionEntity,
  IStoreEntity,
} from '../../definition';

/**
 * @stable [06.07.2018]
 */
export interface IFilteredListMiddlewareConfig extends IListSectionWrapper,
                                                       IEffectsActionEntity {
}

/**
 * @stable [21.01.2019]
 */
export interface IDestroyedFormMiddlewareConfig extends IFormSectionWrapper {
}

/**
 * @stable [22.08.2018]
 */
export interface ISucceedRelatedFormMiddlewareConfig<TEntity extends IEntity = IEntity,
                                                     TRelatedEntity extends IEntity = IEntity,
                                                     TApplicationState = IStoreEntity>
    extends IRelatedEntityWrapper<TRelatedEntity>,
            IEffectsActionEntity,
            IListSectionWrapper,
            IFormSectionWrapper,
            INavigateBackWrapper,
            IStateWrapper<TApplicationState>,
            ISucceedTextWrapper {
  getEntity?(state: TApplicationState): TEntity;
  getRelatedEntities?(entity: TEntity): TRelatedEntity[];
  makeRelatedChanges?(relatedEntities: TRelatedEntity[]): TEntity;
}

/**
 * @stable [13.09.2018]
 */
export interface IRefreshedListMiddlewareConfig extends IListSectionWrapper,
                                                        IEffectsActionEntity {
}

/**
 * @stable [11.03.2019]
 */
export interface IFilterFormDialogMiddlewareConfig
  extends IListSectionWrapper,
    IFormSectionWrapper {
}

/**
 * @stable [11.03.2019]
 */
export interface IToolbarToolsMiddlewareConfig
  extends IListSectionWrapper {
}
