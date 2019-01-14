import { Component, Prop } from 'vue-property-decorator';
import * as R from 'ramda';

import { StringNumberT } from '../../../definitions.interface';
import { getWidth, isString, isArrayNotEmpty } from '../../../util';
import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { vueDefaultComponentConfigFactory } from '../../../vue-entities-definitions.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { IVueFieldInputListenersEntity } from '../field/vue-index';
import { VueBaseTextField } from '../textfield/vue-index';
import { IVueMenu, IVueMenuProps } from '../../menu/vue-index';
import {
  IVueSelectTemplateMethods,
  VueSelectFilterT,
  IVueSelectProps,
  VUE_SELECT_NAME,
} from './vue-select.interface';

@ComponentName(VUE_SELECT_NAME)
@Component(vueDefaultComponentConfigFactory())
class VueSelect extends VueBaseTextField implements IVueSelectTemplateMethods, IVueSelectProps {

  @Prop() public bindDictionary: string;
  @Prop() public menuProps: IVueMenuProps;
  @Prop({default: (): string => 'vue-icon-expand'}) protected icon: string;
  @Prop({
    default: (): VueSelectFilterT => (option: ISelectOptionEntity, query: string) =>
      String((option.label || option.value)).toLowerCase().includes(query.toLowerCase()),
  }) protected filter: VueSelectFilterT;
  @Prop() private options: ISelectOptionEntity[];

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueFieldInputListenersEntity}
   */
  public getInputListeners(): IVueFieldInputListenersEntity {
    return {
      ...super.getInputListeners(),
      click: this.onInputClick,
    };
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-select`;
  }

  /**
   * @stable [17.11.2018]
   * @param {IMenuItemEntity} option
   */
  public onSelect(option: ISelectOptionEntity): void {
    this.getData().displayValue = option.label;
    this.onChange(option.value);
    this.$emit('select', option);
  }

  /**
   * @stable [21.12.2018]
   * @returns {IVueMenuProps}
   */
  public getMenuBindings(): IVueMenuProps {
    return {
      ...this.menuProps,
      options: this.getOptions(),
    };
  }

  /**
   * @stable [21.12.2018]
   */
  public onIconClick(): void {
    this.onInputClick();
  }

  /**
   * @stable [22.12.2018]
   * @returns {TMethods}
   */
  protected getTemplateMethods<TMethods extends IVueSelectTemplateMethods>(): TMethods {
    return {
      ...super.getTemplateMethods(),
      onSelect: this.onSelect,
      getMenuBindings: this.getMenuBindings,
    } as TMethods;
  }

  /**
   * @stable [20.12.2018]
   * @param {StringNumberT} newValue
   * @returns {boolean}
   */
  protected canSetDataDisplayValueOnManualInputChange(newValue: StringNumberT): boolean {
    return this.isFieldChangedManually(newValue);
  }

  /**
   * @stable [18.11.2018]
   * @returns {string}
   */
  protected getInputAttachmentTemplate(): string {
    return `<vue-menu ref="menu"
                      @select="onSelect($event)"
                      v-bind="getMenuBindings()"/>`;
  }

  /**
   * @stable [25.12.2018]
   * @returns {ISelectOptionEntity[]}
   */
  protected getOptions(): ISelectOptionEntity[] {
    const currentValue = this.getValue();
    const areChangesPresent = !R.isEmpty(currentValue) && this.isFieldChangedManually(currentValue);

    return isArrayNotEmpty(this.options)
      ? (
        areChangesPresent
          ? R.filter<ISelectOptionEntity>((option) => this.filter(option, currentValue), this.options)
            .map((option): ISelectOptionEntity =>
              ({...option, label: String((option.label || option.value)).replace(new RegExp(currentValue, 'i'), `<b>${currentValue}</b>`)}))
          : R.filter<ISelectOptionEntity>((option) => option.value !== currentValue, this.options)
      )
      : this.options;
  }

  /**
   * @stable [20.12.2018]
   * @param {StringNumberT} newValue
   * @returns {boolean}
   */
  protected isFieldChangedManually(newValue: StringNumberT): boolean {
    return isString(newValue);
  }

  /**
   * @stable [18.11.2018]
   */
  private onInputClick(): void {
    this.getMenu().show({width: getWidth(this.inputWrapperEl)});

    if (this.isContainerBound() && isString(this.bindDictionary)) {
      this.bindContainer.dispatchLoadDictionary(this.bindDictionary);
    }
    this.$emit('show');
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueMenu}
   */
  private getMenu(): IVueMenu {
    return this.getChildrenRefs().menu as IVueMenu;
  }
}
