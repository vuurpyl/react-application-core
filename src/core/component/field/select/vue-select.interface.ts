import { IBindDictionaryWrapper, IMenuPropsWrapper } from '../../../definitions.interface';
import { IMenuItemEntity, ISelectOptionEntity } from '../../../entities-definitions.interface';
import { IVueBaseTextFieldTemplateMethods } from '../textfield/vue-index';
import { IVueBaseTextFieldProps } from '../textfield/vue-index';
import { IVueMenuProps } from '../../menu/vue-index';

/**
 * @stable [22.12.2018]
 */
export interface IVueSelectProps extends IVueBaseTextFieldProps,
                                         IBindDictionaryWrapper,
                                         IMenuPropsWrapper<IVueMenuProps> {
}

/**
 * @stable [20.12.2018]
 */
export type VueSelectFilterT = (option: ISelectOptionEntity, query: string) => boolean;

/**
 * @stable [17.11.2018]
 */
export interface IVueSelectTemplateMethods extends IVueBaseTextFieldTemplateMethods {
  onSelect?(option: IMenuItemEntity): void;
  getMenuBindings?(): IVueMenuProps;
}
