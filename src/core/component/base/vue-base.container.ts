import Vue from 'vue';
import { Store } from 'redux';

import { FormActionBuilder } from '../form/form-action.builder';
import { lazyInject, DI_TYPES } from '../../di';
import { AnyT, IKeyValue } from '../../definitions.interface';
import {
  IVueApplicationStoreEntity,
  IVueComponent,
  IVueContainer,
} from '../../vue-entities-definitions.interface';

export class VueBaseContainer<TVueComponent extends IVueComponent = IVueComponent>
  extends Vue implements IVueContainer {

  public section$: string;
  @lazyInject(DI_TYPES.Store) public store$: Store<IVueApplicationStoreEntity>;

  /**
   * @stable [21.10.2018]
   * @returns {IVueApplicationStoreEntity}
   */
  public get state$(): IVueApplicationStoreEntity {
    return this.store$.getState();
  }

  /**
   * TODO make common contract to this methods (IUniversalBaseContainer) + delegates
   * @stable [21.10.2018]
   * @param {IKeyValue} changes
   */
  protected dispatchFormChanges(changes: IKeyValue): void {
    this.store$.dispatch(FormActionBuilder.buildChangesSimpleAction(this.section$, changes));
  }

  /**
   * @stable [21.10.2018]
   * @param {string} type
   * @param {AnyT} data
   */
  protected dispatchCustomType(type: string, data?: AnyT): void {
    this.store$.dispatch({type, data});
  }

  /**
   * @stable [21.10.2018]
   * @returns {TVueComponent}
   */
  protected get vueComponent(): TVueComponent {
    return this.$vnode.componentInstance as TVueComponent;
  }
}
