import * as React from 'react';

import { Dialog } from '../dialog.component';
import { FilterFormDialogActionBuilder } from '../../../action';
import { FormContainer } from '../../form';
import {
  DEFAULT_COMPACT_FORM_ENTITY,
  IFilterFormDialogContainerProps,
} from '../../../definition';
import {
  isFormDirty,
  isFormValid,
  isTouched,
  mapFormContainerProps,
} from '../../../util';
import { GenericContainer } from '../../base/generic.container';

/**
 * @component-container
 * @stable [23.04.2020]
 *
 * Please use the "mapFilterFormDialogContainerProps"
 */
export class FilterFormDialogContainer
  extends GenericContainer<IFilterFormDialogContainerProps<React.RefObject<Dialog>>> {

  /**
   * @stable [23.04.2020]
   * @param {IFilterFormDialogContainerProps} props
   */
  constructor(props: IFilterFormDialogContainerProps<React.RefObject<Dialog>>) {
    super(props);

    this.onAcceptFilter = this.onAcceptFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  /**
   * @stable [23.04.2020]
   */
  public componentWillUnmount() {
    if (this.props.autoReset) {
      this.dispatchPlainAction(FilterFormDialogActionBuilder.buildResetPlainAction(this.sectionName));
    }
  }

  /**
   * @stable [23.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {
      APPLY,
      CLEAR_ALL,
      CLOSE,
      FILTERS,
    } = this.settings.messages;

    return (
      <Dialog
        ref={props.forwardedRef}
        title={FILTERS}
        closeText={this.canAccept ? CLEAR_ALL : CLOSE}
        acceptText={APPLY}
        acceptDisabled={!this.canAccept}
        onAccept={this.onAcceptFilter}
        onClose={this.onClearFilter}
      >
        <FormContainer
          formConfiguration={DEFAULT_COMPACT_FORM_ENTITY}
          {...mapFormContainerProps(props)}
        >
          {props.children}
        </FormContainer>
      </Dialog>
    );
  }

  /**
   * @stable [23.04.2020]
   */
  private onAcceptFilter(): void {
    this.dispatchPlainAction(FilterFormDialogActionBuilder.buildAcceptPlainAction(this.sectionName));
  }

  /**
   * @stable [23.04.2020]
   */
  private onClearFilter(): void {
    if (this.canAccept) {
      this.dispatchPlainAction(FilterFormDialogActionBuilder.buildClearPlainAction(this.sectionName));
    }
  }

  /**
   * @stable [23.04.2020]
   * @returns {boolean}
   */
  private get canAccept(): boolean {
    const formProps = this.props;
    return isFormValid(formProps)
      && (isFormDirty(formProps) || isTouched(this.props.form));
  }
}
