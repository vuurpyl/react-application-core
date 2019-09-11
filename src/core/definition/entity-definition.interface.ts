import {
  EntityIdT,
  IActiveValueWrapper,
  IChangesWrapper,
  IDirtyWrapper,
  IEntityIdWrapper,
  IEntityWrapper,
  IKeyValue,
  INewEntityWrapper,
  IOriginalEntityWrapper,
  IProgressWrapper,
  ITouchedWrapper,
  IValidWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';

/**
 * @stable [11.09.2019]
 */
export interface ILifeCycleEntity
  extends ITouchedWrapper,
    IProgressWrapper,
    IErrorEntity<string> {
}

/**
 * @stable [26.02.2019]
 */
export interface IExtendedEntity<TEntity>
  extends IEntityWrapper<TEntity>,
    INewEntityWrapper,
    IOriginalEntityWrapper<TEntity>,
    IEntityIdWrapper<EntityIdT> {
}

/**
 * @stable [11.09.2019]
 */
export interface IEditableEntity<TChanges = IKeyValue>
  extends ILifeCycleEntity,
    IChangesWrapper<TChanges>,
    IDirtyWrapper,
    IValidWrapper,
    IActiveValueWrapper {
}
