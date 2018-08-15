import { IUniversalComponentPlugin, IComponent } from '../../../entities-definitions.interface';
import {
  INativeMaterialComponentFactory,
  INativeMaterialComponent,
  INativeMaterialAdapter,
} from '../../material';

export class MaterialPlugin<TComponent extends IComponent,
                            TNativeMaterialComponent extends INativeMaterialComponent = INativeMaterialComponent>
    implements IUniversalComponentPlugin {

  protected mdc: TNativeMaterialComponent;

  constructor(protected component: TComponent,
              private mdcFactory: INativeMaterialComponentFactory<TNativeMaterialComponent>) {
  }

  /**
   * @stable [05.05.2018]
   */
  public componentDidMount(): void {
    this.mdc = this.mdcFactory.attachTo(this.component.self);
  }

  /**
   * @stable [05.05.2018]
   */
  public componentWillUnmount(): void {
    if (this.mdc) {
      this.mdc.destroy();
    }
  }

  /**
   * @stable [15.08.2018]
   */
  protected get adapter(): INativeMaterialAdapter {
    return this.mdc.foundation_.adapter_;
  }
}
