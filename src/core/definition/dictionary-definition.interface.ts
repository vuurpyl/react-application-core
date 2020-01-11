import {
  ACTION_PREFIX,
  FIRST_PAGE,
  IDataWrapper,
  IDictionariesWrapper,
  IKeyValue,
  ILoadingWrapper,
  IPlacesWrapper,
} from '../definitions.interface';
import { IPagedEntity } from './page-definition.interface';

/**
 * @stable [10.09.2019]
 */
export const DEFAULT_DICTIONARY_PAGE_SIZE = 300;

/**
 * @stable [04.12.2019]
 */
export const INITIAL_DICTIONARIES_ENTITY = Object.freeze<IDictionariesEntity>({});

/**
 * @stable [04.12.2019]
 */
export const $RAC_DICTIONARIES_DESTROY_ACTION_TYPE = `${ACTION_PREFIX}.dictionaries.destroy`;
export const DICTIONARY_LOAD_ACTION_TYPE = 'dictionary.load';
export const DICTIONARY_SET_ACTION_TYPE = 'dictionary.set';

/**
 * @stable [11.01.2020]
 */
export enum DictionariesEnum {
  PLACES = 'places',
}

/**
 * @stable [10.09.2019]
 */
export const DEFAULT_DICTIONARY_PAGED_ENTITY = Object.freeze<IPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_DICTIONARY_PAGE_SIZE,
});

/**
 * @stable [10.10.2019]
 */
export interface IDictionaryEntity<TData = IKeyValue>
  extends IDataWrapper<TData[] | TData>,
    ILoadingWrapper {
}

/**
 * @stable [11.01.2020]
 */
export interface IPlacesDictionaryWrapperEntity
  extends IPlacesWrapper<IDictionaryEntity<{}>> {
}

/**
 * @stable [10.10.2019]
 */
export interface IDictionariesEntity
  extends IPlacesDictionaryWrapperEntity {
  [dictionary: string]: IDictionaryEntity<{}>;
}

/**
 * @stable [10.10.2019]
 */
export interface IDictionariesWrapperEntity
  extends IDictionariesWrapper<IDictionariesEntity> {
}
