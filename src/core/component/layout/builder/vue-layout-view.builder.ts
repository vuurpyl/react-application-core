import { join } from '../../../util';
import { IKeyValue } from '../../../definitions.interface';
import {
  VueLayoutBuilderChildrenT,
  IVueLayoutBuilderConfiguration,
} from '../../../vue-configurations-definitions.interface';
import { UniversalLayoutViewBuilder } from './universal-layout-view.builder';

export class VueLayoutViewBuilder extends UniversalLayoutViewBuilder<string> {

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} _
   * @param {VueLayoutBuilderChildrenT[]} children
   * @param {IVueLayoutBuilderConfiguration} layoutConfig
   * @returns {string}
   */
  public buildRowView(_: IKeyValue,
                      children: VueLayoutBuilderChildrenT[],
                      layoutConfig: IVueLayoutBuilderConfiguration): string {
    return (
      `<div class='rac-flex rac-flex-row ${this.toFactorClassName(layoutConfig)}'>
        ${join(children, '')}
      </div>`
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} _
   * @param {VueLayoutBuilderChildrenT[]} children
   * @param {IVueLayoutBuilderConfiguration} layoutConfig
   * @returns {string}
   */
  public buildColumnView(_: IKeyValue,
                         children: VueLayoutBuilderChildrenT[],
                         layoutConfig: IVueLayoutBuilderConfiguration): string {
    return (
      `<div class='rac-flex rac-flex-column ${this.toFactorClassName(layoutConfig)}'>
        ${join(children, '')}
      </div>`
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} _
   * @returns {string}
   */
  public buildSeparatorView(_: IKeyValue): string {
    return '<div class="rac-flex-separator"/>';
  }
}
