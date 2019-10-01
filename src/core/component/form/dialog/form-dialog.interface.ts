import { IUniversalDialogProps } from '../../dialog/dialog.interface';
import { IFormWrapperEntity } from '../../../definition';

export interface IFormDialogProps
  extends IUniversalDialogProps,
  IFormWrapperEntity {
}

/**
 * @deprecated
 */
export const FORM_DIALOG_REF = 'formDialog';
