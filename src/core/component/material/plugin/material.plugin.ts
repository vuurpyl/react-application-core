import * as R from 'ramda';

import {
  INativeMaterialComponent,
  INativeMaterialAdapter,
} from '../../../entities-definitions.interface';
import { DI_TYPES, staticInjector } from '../../../di';
import { INativeMaterialComponentFactory } from '../../material';
import { isDef } from '../../../util';
import {
  IGenericComponent,
  IGenericPlugin,
  TranslatorT,
} from '../../../definition';

export class MaterialPlugin<TComponent extends IGenericComponent,
                            TNativeMaterialComponent extends INativeMaterialComponent = INativeMaterialComponent>
    implements IGenericPlugin {

  protected mdc: TNativeMaterialComponent;

  /**
   * @stable [18.06.2019]
   * @param {TComponent} component
   * @param {INativeMaterialComponentFactory<TNativeMaterialComponent extends INativeMaterialComponent>} mdcFactory
   */
  constructor(protected component: TComponent,
              private mdcFactory: INativeMaterialComponentFactory<TNativeMaterialComponent>) {
  }

  /**
   * @stable [31.08.2018]
   */
  public componentDidMount(): void {
    const self = this.component.selfRef;

    if (!R.isNil(self)) {
      this.mdc = this.mdcFactory.attachTo(self.current);
    }
  }

  /**
   * @stable [05.05.2018]
   */
  public componentWillUnmount(): void {
    if (this.doesMdcExist) {
      this.mdc.destroy();
    }
  }

  /**
   * @stable [15.08.2018]
   */
  protected get adapter(): INativeMaterialAdapter {
    return this.mdc.foundation_.adapter_;
  }

  /**
   * @stable [17.06.2019]
   * @returns {boolean}
   */
  protected get doesMdcExist(): boolean {
    return isDef(this.mdc);
  }

  /**
   * @stable [22.08.2018]
   * @returns {TranslatorT}
   */
  protected get t(): TranslatorT {
    return staticInjector<TranslatorT>(DI_TYPES.Translate);
  }
}
