import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { defValuesFilter } from './filter';
import {
  IApiEntity,
  IBaseExtendedEntity,
  IBaseExtendedFormEditableEntity,
  IChannelWrapperEntity,
  IDictionariesEntity,
  IDictionariesWrapperEntity,
  IDictionaryEntity,
  IExtendedEntity,
  IExtendedFormEditableEntity,
  IExtendedLabeledValueEntity,
  IFilterFormDialogContainerProps,
  IFormContainerProps,
  IFormEditableEntity,
  IFormTabPanelContainerProps,
  IGenericBaseSelectEntity,
  IGenericChannelEntity,
  IGenericContainer,
  IGenericEditableEntity,
  IGenericLayoutEntity,
  IGenericNotificationEntity,
  IGenericPagedEntity,
  IGenericPaginatedEntity,
  IGenericSelectableHoveredEntity,
  IGenericStackEntity,
  IGenericStoreEntity,
  IGenericTabPanelEntity,
  ILayoutWrapperEntity,
  IListContainerProps,
  IListEntity,
  IListWrapperEntity,
  INamedEntity,
  INotificationWrapperEntity,
  IOperationEntity,
  IOptionEntity,
  ISelectOptionEntity,
  ISortDirectionEntity,
  ISortDirectionsEntity,
  ISortDirectionsWrapperEntity,
  IStackItemEntity,
  IStackWrapperEntity,
  ITabPanelWrapperEntity,
  IToolbarToolsContainerProps,
  ITransportEntity,
  ITransportWrapperEntity,
  IUniversalApplicationEntity,
  IUnsavedFormChangesDialogContainerProps,
  IUserEntity,
  IUserWrapperEntity,
} from '../definition';
import {
  AnyT,
  DEFAULT_PAGE_SIZE,
  EntityIdT,
  FIRST_PAGE,
  IActionsDisabledWrapper,
  IActiveValueWrapper,
  IChannelWrapper,
  IDictionariesWrapper,
  IEntity,
  IEntityIdTWrapper,
  IErrorWrapper,
  IFormWrapper,
  ILayoutWrapper,
  INotificationWrapper,
  IOptionsWrapper,
  IProgressWrapper,
  IStackWrapper,
  ITransportWrapper,
  IUserWrapper,
  IWaitingForOptionsWrapper,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import {
  ifNotNilThanValue,
  orUndef,
} from './cond';
import {
  isFn,
  isString,
} from './type';
import { isNewEntity } from './entity';
import {
  nvl,
} from './nvl';
import {
  doesErrorExist,
  inProgress,
  isLoading,
  isReady,
} from './wrapper';
import {
  selectActiveFilterToolbarToolsByEditableEntity,
  selectActiveValue,
  selectChanges,
  selectChannel,
  selectData,
  selectDefaultChanges,
  selectDictionaries,
  selectEntity,
  selectEntityId,
  selectForm,
  selectFormActiveFilterToolbarTools,
  selectLayout,
  selectListSelectedEntity,
  selectNotification,
  selectOriginalEntity,
  Selectors,
  selectQueue,
  selectStack,
  selectToken,
  selectTransport,
  selectUser,
} from './select';
import { GenericMappers } from './mapper-generic';
import { ComponentMappers } from './mapper-component';

/**
 * @stable [17.11.2019]
 * @param {ITransportWrapperEntity} entity
 * @returns {string}
 */
export const selectTransportWrapperToken = (entity: ITransportWrapperEntity): string =>
  selectToken(selectTransport(entity));

/**
 * @stable [25.11.2019]
 * @param {ITransportWrapperEntity} entity
 * @returns {string[]}
 */
export const selectTransportWrapperQueue = (entity: ITransportWrapperEntity): string[] =>
  selectQueue(selectTransport(entity));

/**
 * @stable [13.02.2020]
 * @param {TErrorWrapper} entity
 * @returns {TResult}
 */
export const selectError =
  <TResult = AnyT, TErrorWrapper extends IErrorWrapper<TResult> = IErrorWrapper<TResult>>(entity: TErrorWrapper): TResult =>
    R.isNil(entity) ? UNDEF : entity.error;

/**
 * @stable [29.02.2020]
 * @param {IExtendedFormEditableEntity<TEntity extends IEntity>} wrapper
 * @returns {IGenericEditableEntity<TEntity extends IEntity>}
 */
export const selectEditableEntity =
  <TEntity extends IEntity = IEntity>(wrapper: IExtendedFormEditableEntity<TEntity>): IGenericEditableEntity<TEntity> =>
    selectForm(wrapper);

/**
 * TODO
 * @deprecated
 */
export const selectListEntity =
  <TEntity extends IEntity = IEntity>(entity: IListWrapperEntity<TEntity>): IListEntity<TEntity> =>
    ifNotNilThanValue(entity, (): IListEntity<TEntity> => entity.list, UNDEF_SYMBOL);

/**
 * @stable [13.02.2020]
 * @param {IEffectsAction} action
 * @returns {TResult}
 */
export const selectErrorFromAction = <TResult = AnyT>(action: IEffectsAction): TResult => selectError(action);

/**
 * @stable [10.02.2020]
 * @param {ITabPanelWrapperEntity} entity
 * @returns {IGenericTabPanelEntity}
 */
export const selectTabPanelEntity = (entity: ITabPanelWrapperEntity): IGenericTabPanelEntity =>
  R.isNil(entity) ? UNDEF : entity.tabPanel;

/**
 * @stable [20.10.2019]
 * @param {EntityIdT} id
 * @returns {IEntityIdTWrapper}
 */
export const mapEntityId = (id: EntityIdT): IEntityIdTWrapper =>
  defValuesFilter<IEntityIdTWrapper, IEntityIdTWrapper>({id});

/**
 * @stable [29.01.2020]
 * @param {boolean} waitingForOptions
 * @returns {IWaitingForOptionsWrapper}
 */
export const mapWaitingForOptions = (waitingForOptions: boolean): IWaitingForOptionsWrapper =>
  defValuesFilter<IWaitingForOptionsWrapper, IWaitingForOptionsWrapper>({waitingForOptions});

/**
 * @stable [28.01.2020]
 * @param {TValue} options
 * @returns {IOptionsWrapper<TValue>}
 */
export const mapOptions = <TValue>(options: TValue): IOptionsWrapper<TValue> =>
  defValuesFilter<IOptionsWrapper<TValue>, IOptionsWrapper<TValue>>({options});

/**
 * @stable [13.11.2019]
 * @param {ISortDirectionsEntity} directions
 * @returns {ISortDirectionsWrapperEntity}
 */
export const mapSortDirectionsWrapperEntity = (directions: ISortDirectionsEntity): ISortDirectionsWrapperEntity =>
  defValuesFilter<ISortDirectionsWrapperEntity, ISortDirectionsWrapperEntity>({directions});

/**
 * @stable [20.10.2019]
 * @param {IEntityIdTWrapper} entity
 * @returns {IEntityIdTWrapper}
 */
export const mapIdentifiedEntity = (entity: IEntityIdTWrapper): IEntityIdTWrapper =>
  mapEntityId(selectEntityId(entity));

/**
 * @stable [10.02.2020]
 * @param {IGenericTabPanelEntity} tabPanel
 * @returns {ITabPanelWrapperEntity}
 */
export const mapTabPanelEntity = (tabPanel: IGenericTabPanelEntity): ITabPanelWrapperEntity =>
  defValuesFilter<ITabPanelWrapperEntity, ITabPanelWrapperEntity>({tabPanel});

/**
 * @stable [21.11.2019]
 * @param {ITabPanelWrapperEntity} tabPanelWrapperEntity
 * @returns {ITabPanelWrapperEntity}
 */
export const mapTabPanelWrapperEntity = (tabPanelWrapperEntity: ITabPanelWrapperEntity): ITabPanelWrapperEntity =>
  mapTabPanelEntity(selectTabPanelEntity(tabPanelWrapperEntity));

/**
 * @stable [30.03.2020]
 * @param {TUser} user
 * @returns {IUserWrapper<TUser>}
 */
export const mapUser = <TUser = IUserEntity>(user: TUser): IUserWrapper<TUser> =>
  defValuesFilter<IUserWrapper<TUser>, IUserWrapper<TUser>>({user});

/**
 * @stable [14.04.2020]
 * @param {TValue} stack
 * @returns {IStackWrapper<TValue>}
 */
export const mapStack = <TValue>(stack: TValue): IStackWrapper<TValue> =>
  defValuesFilter<IStackWrapper<TValue>, IStackWrapper<TValue>>({stack});

/**
 * @stable [14.04.2020]
 * @param {TValue} notification
 * @returns {INotificationWrapper<TValue>}
 */
export const mapNotification = <TValue>(notification: TValue): INotificationWrapper<TValue> =>
  defValuesFilter<INotificationWrapper<TValue>, INotificationWrapper<TValue>>({notification});

/**
 * @stable [14.04.2020]
 * @param {TValue} layout
 * @returns {ILayoutWrapper<TValue>}
 */
export const mapLayout = <TValue>(layout: TValue): ILayoutWrapper<TValue> =>
  defValuesFilter<ILayoutWrapper<TValue>, ILayoutWrapper<TValue>>({layout});

/**
 * @stable [14.04.2020]
 * @param {TValue} channel
 * @returns {IChannelWrapper<TValue>}
 */
export const mapChannel = <TValue>(channel: TValue): IChannelWrapper<TValue> =>
  defValuesFilter<IChannelWrapper<TValue>, IChannelWrapper<TValue>>({channel});

/**
 * @stable [14.04.2020]
 * @param {TValue} transport
 * @returns {ITransportWrapper<TValue>}
 */
export const mapTransport = <TValue>(transport: TValue): ITransportWrapper<TValue> =>
  defValuesFilter<ITransportWrapper<TValue>, ITransportWrapper<TValue>>({transport});

/**
 * @stable [14.04.2020]
 * @param {TValue} dictionaries
 * @returns {IDictionariesWrapper<TValue>}
 */
export const mapDictionaries = <TValue>(dictionaries: TValue): IDictionariesWrapper<TValue> =>
    defValuesFilter<IDictionariesWrapper<TValue>, IDictionariesWrapper<TValue>>({dictionaries});

/**
 * @stable [26.03.2020]
 * @param {TForm} form
 * @returns {IFormWrapper<TForm>}
 */
export const mapForm = <TForm>(form: TForm): IFormWrapper<TForm> =>
  defValuesFilter<IFormWrapper<TForm>, IFormWrapper<TForm>>({form});

/**
 * @stable [12.04.2020]
 * @param {TActiveValue} activeValue
 * @returns {IActiveValueWrapper<TActiveValue>}
 */
export const mapActiveValue = <TActiveValue>(activeValue: TActiveValue): IActiveValueWrapper<TActiveValue> =>
  defValuesFilter<IActiveValueWrapper<TActiveValue>, IActiveValueWrapper<TActiveValue>>({activeValue});

/**
 * TODO
 * @deprecated Use mapForm
 */
export const mapEditableEntity =
  <TEntity extends IEntity = IEntity>(form: IGenericEditableEntity<TEntity>): IExtendedFormEditableEntity<TEntity> =>
    defValuesFilter<IExtendedFormEditableEntity<TEntity>, IExtendedFormEditableEntity<TEntity>>({form});

/**
 * @stable [04.05.2020]
 * @mapper
 *
 * @param {IGenericSelectableHoveredEntity} entity
 * @returns {IGenericSelectableHoveredEntity}
 */
const mapSelectableHoveredEntity =
  (entity: IGenericSelectableHoveredEntity): IGenericSelectableHoveredEntity => ifNotNilThanValue(
    entity,
    () => defValuesFilter<IGenericSelectableHoveredEntity, IGenericSelectableHoveredEntity>({
      hovered: entity.hovered,
      selectable: entity.selectable,
    }),
    UNDEF_SYMBOL
  );

/**
 * @stable [13.11.2019]
 * @param {ISortDirectionEntity} entity
 * @returns {ISortDirectionEntity}
 */
export const mapSortDirectionEntity = (entity: ISortDirectionEntity): ISortDirectionEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<ISortDirectionEntity, ISortDirectionEntity>({
    index: entity.index,
    direction: entity.direction,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [05.05.2020]
 * @mapper
 *
 * @param {IGenericPaginatedEntity} entity
 * @param {number} pageSize
 * @returns {IGenericPagedEntity}
 */
const mapPaginatedEntityAsPagedEntity =
  (entity: IGenericPaginatedEntity, pageSize = DEFAULT_PAGE_SIZE): IGenericPagedEntity =>
    ifNotNilThanValue(
      entity,
      () => GenericMappers.pagedEntity({
        page: entity.lockPage ? entity.page : FIRST_PAGE,
        pageSize,
      }),
      UNDEF_SYMBOL
    );

/**
 * @stable [05.05.2020]
 * @mapper
 *
 * @param {IListWrapperEntity} entity
 * @param {number} pageSize
 * @returns {IGenericPagedEntity}
 */
const mapListWrapperEntityAsPagedEntity = (entity: IListWrapperEntity, pageSize = DEFAULT_PAGE_SIZE): IGenericPagedEntity =>
    mapPaginatedEntityAsPagedEntity(Selectors.list(entity), pageSize);

/**
 * @stable [30.03.2020]
 * @param {IUserWrapperEntity<TEntity>} wrapper
 * @returns {IUserWrapperEntity<TEntity>}
 */
export const mapUserWrapperEntity =
  <TEntity = IUserEntity>(wrapper: IUserWrapperEntity<TEntity>): IUserWrapperEntity<TEntity> =>
    mapUser(selectUser(wrapper));

/**
 * @stable [30.03.2020]
 * @param {IStackWrapperEntity<TEntity>} wrapper
 * @returns {IStackWrapperEntity<TEntity>}
 */
export const mapStackWrapperEntity =
  <TEntity = IGenericStackEntity>(wrapper: IStackWrapperEntity<TEntity>): IStackWrapperEntity<TEntity> =>
    mapStack(selectStack(wrapper));

/**
 * @stable [14.04.2020]
 * @param {INotificationWrapperEntity<TEntity>} wrapper
 * @returns {INotificationWrapperEntity<TEntity>}
 */
export const mapNotificationWrapperEntity =
  <TEntity = IGenericNotificationEntity>(wrapper: INotificationWrapperEntity<TEntity>): INotificationWrapperEntity<TEntity> =>
    mapNotification(selectNotification(wrapper));

/**
 * @stable [14.04.2020]
 * @param {ILayoutWrapperEntity<TEntity>} wrapper
 * @returns {ILayoutWrapperEntity<TEntity>}
 */
export const mapLayoutWrapperEntity =
  <TEntity = IGenericLayoutEntity>(wrapper: ILayoutWrapperEntity<TEntity>): ILayoutWrapperEntity<TEntity> =>
    mapLayout(selectLayout(wrapper));

/**
 * @stable [14.04.2020]
 * @param {IChannelWrapperEntity<TEntity>} wrapper
 * @returns {IChannelWrapperEntity<TEntity>}
 */
export const mapChannelWrapperEntity =
  <TEntity = IGenericChannelEntity>(wrapper: IChannelWrapperEntity<TEntity>): IChannelWrapperEntity<TEntity> =>
    mapChannel(selectChannel(wrapper));

/**
 * @stable [28.03.2020]
 * @param {ITransportWrapperEntity<TTransport>} wrapper
 * @returns {ITransportWrapperEntity<TTransport>}
 */
export const mapTransportWrapperEntity =
  <TTransport = ITransportEntity>(wrapper: ITransportWrapperEntity<TTransport>): ITransportWrapperEntity<TTransport> =>
    mapTransport(selectTransport(wrapper));

/**
 * @stable [28.03.2020]
 * @param {IDictionariesWrapperEntity<TDictionaries>} wrapper
 * @returns {IDictionariesWrapperEntity<TDictionaries>}
 */
export const mapDictionariesWrapperEntity =
  <TDictionaries = IDictionariesEntity>(wrapper: IDictionariesWrapperEntity<TDictionaries>): IDictionariesWrapperEntity<TDictionaries> =>
    mapDictionaries(selectDictionaries(wrapper));

/**
 * @stable [12.04.2020]
 * @param {IActiveValueWrapper<TValue>} wrapper
 * @returns {IActiveValueWrapper<TValue>}
 */
export const mapActiveValueWrapper = <TValue>(wrapper: IActiveValueWrapper<TValue>): IActiveValueWrapper<TValue> =>
  mapActiveValue(selectActiveValue(wrapper));

/**
 * @stable [18.04.2020]
 * @param {IBaseExtendedEntity<TEntity>} extendedEntity
 * @returns {IBaseExtendedEntity<TEntity>}
 */
export const mapBaseExtendedEntity =
  <TEntity = IEntity>(extendedEntity: IBaseExtendedEntity<TEntity>): IBaseExtendedEntity<TEntity> =>
    defValuesFilter<IBaseExtendedEntity<TEntity>, IBaseExtendedEntity<TEntity>>({
      entity: selectEntity(extendedEntity),
      originalEntity: selectOriginalEntity(extendedEntity),
    });

/**
 * @stable [17.04.2020]
 * @param {IExtendedEntity<TEntity>} extendedEntity
 * @returns {IExtendedEntity<TEntity>}
 */
export const mapExtendedEntity =
  <TEntity = IEntity>(extendedEntity: IExtendedEntity<TEntity>): IExtendedEntity<TEntity> =>
    defValuesFilter<IExtendedEntity<TEntity>, IExtendedEntity<TEntity>>({
      ...mapBaseExtendedEntity(extendedEntity),
      changes: selectChanges(extendedEntity),
      entityId: extendedEntity.entityId,
      newEntity: extendedEntity.newEntity,
    });

/**
 * @stable [05.04.2020]
 * @param {IFormEditableEntity<TEntity>} wrapper
 * @returns {IFormEditableEntity<TEntity>}
 */
export const mapFormEditableEntity =
  <TEntity = IEntity>(wrapper: IFormEditableEntity<TEntity>): IFormEditableEntity<TEntity> =>
    mapForm(selectForm(wrapper));

/**
 * @stable [17.04.2020]
 * @param {TEntity} entity
 * @param {IGenericEditableEntity<TEntity extends IEntity>} editableEntity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
export const mapEnhancedExtendedEntity =
  <TEntity extends IEntity = IEntity>(entity: TEntity,
                                      editableEntity: IGenericEditableEntity<TEntity>): IExtendedEntity<TEntity> => {
    let originalEntity;
    const newEntity = isNewEntity(entity);
    const changes = selectChanges<TEntity>(editableEntity) || {} as TEntity;
    const defaultChanges = selectDefaultChanges<TEntity>(editableEntity);

    ifNotNilThanValue(
      nvl(defaultChanges, entity),
      () => (originalEntity = {...defaultChanges as {}, ...entity as {}} as TEntity)
    );

    return mapExtendedEntity({
      changes,
      entity: {...originalEntity as {}, ...changes as {}} as TEntity,
      entityId: orUndef(!newEntity, () => entity.id),
      newEntity,
      originalEntity,
    });
  };

/**
 * @stable [25.12.2019]
 * @param {IGenericEditableEntity<TEntity extends IEntity>} editableEntity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
export const mapNewExtendedEntity =
  <TEntity extends IEntity = IEntity>(editableEntity: IGenericEditableEntity<TEntity>): IExtendedEntity<TEntity> =>
    mapEnhancedExtendedEntity(null, editableEntity);

/**
 * @stable [26.04.2020]
 * @param {TEntity} entity
 * @param {IGenericEditableEntity<TEntity>} editableEntity
 * @returns {IExtendedFormEditableEntity<TEntity>}
 */
export const mapExtendedFormEditableEntity =
  <TEntity  = IEntity>(entity: TEntity,
                       editableEntity: IGenericEditableEntity<TEntity>): IExtendedFormEditableEntity<TEntity> =>
    ({
      ...mapForm(editableEntity),
      ...mapEnhancedExtendedEntity(entity, editableEntity),
    });

/**
 * @stable [26.04.2020]
 * @param {IGenericEditableEntity<TEntity>} editableEntity
 * @returns {IExtendedFormEditableEntity<TEntity>}
 */
export const mapNewExtendedFormEditableEntity =
  <TEntity = IEntity>(editableEntity: IGenericEditableEntity<TEntity>): IExtendedFormEditableEntity<TEntity> =>
    mapExtendedFormEditableEntity(null, editableEntity);

/**
 * @stable [23.12.2019]
 * @param {IExtendedEntity<TEntity>} extendedEntity
 * @returns {IApiEntity<TEntity>}
 */
export const mapApiEntity =
  <TEntity = IEntity>(extendedEntity: IExtendedEntity<TEntity>): IApiEntity<TEntity> => {
    const {
      changes,
      entity,
      originalEntity,
    } = extendedEntity;

    const entityId = selectEntityId(entity);
    const newEntity = R.isNil(entityId);

    return defValuesFilter<IApiEntity<TEntity>, IApiEntity<TEntity>>({
      changes,
      diff: newEntity ? entity : changes,
      entity,
      entityId,
      newEntity,
      originalEntity,
    });
  };

/**
 * @stable [06.09.2019]
 * @param {IListWrapperEntity} listWrapper
 * @param {IGenericEditableEntity} editableEntity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
export const mapListSelectedExtendedEntity =
  <TEntity extends IEntity>(listWrapper: IListWrapperEntity<TEntity>,
                            editableEntity: IGenericEditableEntity<TEntity>): IExtendedEntity<TEntity> =>
    mapEnhancedExtendedEntity<TEntity>(
      selectListSelectedEntity(listWrapper),
      editableEntity
    );

/**
 * @stable [17.09.2019]
 * @param {boolean} actionsDisabled
 * @returns {IActionsDisabledWrapper}
 */
export const mapActionsDisabled = (actionsDisabled: boolean): IActionsDisabledWrapper =>
  defValuesFilter<IActionsDisabledWrapper, IActionsDisabledWrapper>({actionsDisabled});

/**
 * @stable [22.04.2020]
 * @param {IProgressWrapper} progressWrapper
 * @returns {IActionsDisabledWrapper}
 */
export const mapProgressWrapperActionsDisabled = (progressWrapper: IProgressWrapper): IActionsDisabledWrapper =>
  mapActionsDisabled(inProgress(progressWrapper));

/**
 * @stable [04.04.2020]
 * @param {IListWrapperEntity} listWrapper
 * @returns {IActionsDisabledWrapper}
 */
export const mapListWrapperActionsDisabled = (listWrapper: IListWrapperEntity): IActionsDisabledWrapper =>
  mapProgressWrapperActionsDisabled(Selectors.list(listWrapper));

/**
 * @stable [11.10.2019]
 * @param {TEntity[] | TEntity} data
 * @returns {Array<ISelectOptionEntity<TEntity extends IOptionEntity>>}
 */
export const mapSelectOptions = <TEntity extends IOptionEntity>(data: TEntity[] | TEntity): Array<ISelectOptionEntity<TEntity>> =>
  ifNotNilThanValue(
    data,
    (entities) => (
      [].concat(entities)
        .map(
          (entity) => defValuesFilter<ISelectOptionEntity<TEntity>, ISelectOptionEntity<TEntity>>({
            value: selectEntityId(entity),
            label: entity.name,
            disabled: entity.disabled,
            rawData: entity,
          })
        )
    ),
    UNDEF_SYMBOL
  );

/**
 * @stable [28.01.2020]
 * @param {IDictionaryEntity<TEntity>} dictionaryEntity
 * @param {(data: (TEntity[] | TEntity)) => AnyT} accessor
 * @returns {Array<ISelectOptionEntity<TEntity>>}
 */
export const selectDictionaryEntityOptions =
  <TEntity>(dictionaryEntity: IDictionaryEntity<TEntity>,
            accessor?: (data: TEntity | TEntity[]) => AnyT): Array<ISelectOptionEntity<TEntity>> =>
    mapSelectOptions<TEntity>(
      ifNotNilThanValue(
        selectData<TEntity | TEntity[]>(dictionaryEntity),
        (data) => isFn(accessor) ? accessor(data) : data
      )
    );

/**
 * @stable [28.01.2020]
 * @param {IDictionaryEntity<TDictionaryEntity>} dictionaryEntity
 * @returns {boolean}
 */
export const selectDictionaryEntityLoading =
  <TDictionaryEntity>(dictionaryEntity: IDictionaryEntity<TDictionaryEntity>): boolean =>
    isLoading(dictionaryEntity);

/**
 * @stable [28.01.2020]
 * @param {IDictionaryEntity<TEntity>} dictionaryEntity
 * @param {(data: TEntity[]) => TResult} accessor
 * @returns {IGenericBaseSelectEntity}
 */
export const mapDictionaryEntityField =
  <TEntity, TResult = TEntity[]>(dictionaryEntity: IDictionaryEntity<TEntity>,
                                 accessor?: (data: TEntity[]) => TResult): IGenericBaseSelectEntity =>
    ({
      ...mapWaitingForOptions(selectDictionaryEntityLoading(dictionaryEntity)),
      ...mapOptions(selectDictionaryEntityOptions<TEntity>(dictionaryEntity, accessor)),
    });

/**
 * @stable [22.04.2020]
 * @param {INamedEntity} entity
 * @returns {IExtendedLabeledValueEntity}
 */
export const mapExtendedLabeledValueEntity = (entity: INamedEntity) =>
  defValuesFilter<IExtendedLabeledValueEntity, IExtendedLabeledValueEntity>({
    value: entity.id,
    label: entity.name || String(entity.id),
    rawData: entity,
  });

/**
 * @stable [25.11.2019]
 * @param {string[]} queue
 * @param {string | IOperationEntity} operations
 * @returns {boolean}
 */
export const hasQueueOperations = (queue: string[],
                                   ...operations: Array<string | IOperationEntity>): boolean =>
  !R.isEmpty(
    R.intersection(
      queue,
      operations.map((operation) => (
        isString(operation)
          ? operation as string
          : (operation as IOperationEntity).id
      ))
    )
  );

/**
 * @stable [25.11.2019]
 * @param {ITransportWrapperEntity} entity
 * @param {string | IOperationEntity} operations
 * @returns {boolean}
 */
export const hasTransportWrapperQueueOperations = (entity: ITransportWrapperEntity,
                                                   ...operations: Array<string | IOperationEntity>): boolean =>
  hasQueueOperations(selectTransportWrapperQueue(entity), ...operations);

/**
 * @stable [28.11.2019]
 * @param {IUniversalApplicationEntity} entity
 * @returns {boolean}
 */
export const isApplicationInProgress = (entity: IUniversalApplicationEntity): boolean => inProgress(entity);

/**
 * @stable [28.11.2019]
 * @param {IUniversalApplicationEntity} entity
 * @returns {boolean}
 */
export const doesApplicationErrorExist = (entity: IUniversalApplicationEntity): boolean => doesErrorExist(entity);

/**
 * @stable [28.11.2019]
 * @param {IUniversalApplicationEntity} entity
 * @returns {boolean}
 */
export const isApplicationMessageVisible = (entity: IUniversalApplicationEntity): boolean =>
  isApplicationInProgress(entity) || doesApplicationErrorExist(entity) || !isReady(entity);

/**
 * @stable [18.12.2019]
 * @param {IStackWrapperEntity} entity
 * @returns {IGenericStackEntity}
 */
export const selectStackEntity = (entity: IStackWrapperEntity): IGenericStackEntity =>
  ifNotNilThanValue(entity, () => entity.stack, UNDEF_SYMBOL);

/**
 * @stable [18.12.2019]
 * @param {IGenericStackEntity} entity
 * @returns {IStackItemEntity[]}
 */
export const selectStackItemEntities = (entity: IGenericStackEntity): IStackItemEntity[] =>
  ifNotNilThanValue(entity, (data) => data.stack, UNDEF_SYMBOL);

/**
 * @stable [18.12.2019]
 * @param {IStackWrapperEntity} entity
 * @returns {IStackItemEntity[]}
 */
export const selectStackWrapperItemEntities = (entity: IStackWrapperEntity): IStackItemEntity[] =>
  selectStackItemEntities(selectStackEntity(entity));

/**
 * @stable [14.04.2020]
 * @param {IGenericStoreEntity<TDictionaries>} entity
 * @returns {IGenericStoreEntity<TDictionaries>}
 */
export const mapStoreEntity =
  <TDictionaries = {}>(entity: IGenericStoreEntity<TDictionaries>): IGenericStoreEntity<TDictionaries> =>
    ({
      ...mapChannelWrapperEntity(entity),
      ...mapDictionariesWrapperEntity(entity),
      ...mapLayoutWrapperEntity(entity),
      ...mapNotificationWrapperEntity(entity),
      ...GenericMappers.sectionNameWrapper(entity),
      ...mapStackWrapperEntity(entity),
      ...mapTransportWrapperEntity(entity),
      ...mapUserWrapperEntity(entity),
    });

/**
 * @component-props-mapper
 * @stable [18.04.2020]
 *
 * @param {IBaseExtendedFormEditableEntity<TEntity>} props The props are defined according to "Liskov substitution principle"
 * @returns {IBaseExtendedFormEditableEntity<TEntity>}
 */
export const mapFormProps =
  <TEntity = IEntity>(props: IBaseExtendedFormEditableEntity<TEntity>): IBaseExtendedFormEditableEntity<TEntity> =>
    ({
      ...mapFormEditableEntity(props),
      ...mapBaseExtendedEntity(props),
    });

/**
 * @container-props-mapper
 * @stable [18.04.2020]
 *
 * @param {IFormContainerProps} props
 * @returns {IFormContainerProps}
 */
export const mapFormContainerProps = (props: IFormContainerProps): IFormContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...mapFormProps(props),
  });

/**
 * @container-props-mapper
 * @stable [23.04.2020]
 *
 * @param {IFilterFormDialogContainerProps} props
 * @returns {IFilterFormDialogContainerProps}
 */
export const mapFilterFormDialogContainerProps =
  (props: IFilterFormDialogContainerProps): IFilterFormDialogContainerProps =>
    mapFormContainerProps(props);

/**
 * @container-props-mapper
 * @stable [11.04.2020]
 *
 * @param {IListContainerProps} props
 * @returns {IListContainerProps}
 */
export const mapListContainerProps = (props: IListContainerProps): IListContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.listWrapperEntity(props),
  });

/**
 * @container-props-mapper
 * @stable [13.04.2020]
 *
 * @param {IFormTabPanelContainerProps} props
 * @returns {IFormTabPanelContainerProps}
 */
export const mapFormTabPanelContainerProps = (props: IFormTabPanelContainerProps): IFormTabPanelContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...mapFormEditableEntity(props),
  });

/**
 * @container-props-mapper
 * @stable [23.04.2020]
 *
 * @param {IToolbarToolsContainerProps & IListContainerProps} props
 * @param {IGenericEditableEntity} editableEntity
 * @returns {IToolbarToolsContainerProps}
 */
export const mapToolbarToolsListContainerProps =
  (props: IToolbarToolsContainerProps & IListContainerProps,
   editableEntity?: IGenericEditableEntity): IToolbarToolsContainerProps =>
    ({
      ...GenericMappers.sectionNameWrapper(props),
      toolbarTools: {
        ...mapListWrapperActionsDisabled(props),
        activeActions: nvl(
          R.isNil(editableEntity)
            ? selectFormActiveFilterToolbarTools(props)
            : selectActiveFilterToolbarToolsByEditableEntity(editableEntity),
          []
        ),
      },
    });

/**
 * @container-props-mapper
 * @stable [23.04.2020]
 *
 * @param {IFormEditableEntity<TEntity>} props
 * @param {IGenericContainer} proxyContainer
 * @returns {IUnsavedFormChangesDialogContainerProps}
 */
export const mapUnsavedFormChangesDialogContainerProps =
  <TEntity = IEntity>(props: IFormEditableEntity<TEntity>,
                      proxyContainer: IGenericContainer): IUnsavedFormChangesDialogContainerProps =>
    ({
      dialogConfiguration: mapFormEditableEntity(props),
      proxyContainer,
    });

/**
 * @stable [05.05.2020]
 */
export class Mappers {
  public static listWrapperEntity = GenericMappers.listWrapperEntity;
  public static listWrapperEntityAsDisabledWrapper = GenericMappers.listWrapperEntityAsDisabledWrapper;
  public static listWrapperEntityAsPagedEntity = mapListWrapperEntityAsPagedEntity;
  public static pagedEntity = GenericMappers.pagedEntity;
  public static pageToolbarContainerProps = ComponentMappers.pageToolbarContainerProps;
  public static pageToolbarProps = ComponentMappers.pageToolbarProps;
  public static paginatedEntity = GenericMappers.paginatedEntity;
  public static queryFilterEntity = GenericMappers.queryFilterEntity;
  public static queryFilterEntityAsQuery = GenericMappers.queryFilterEntityAsQuery;
  public static searchToolbarContainerProps = ComponentMappers.searchToolbarContainerProps;
  public static searchToolbarProps = ComponentMappers.searchToolbarProps;
  public static sectionNameWrapper = GenericMappers.sectionNameWrapper;
  public static selectableHoveredEntity = mapSelectableHoveredEntity;
}
