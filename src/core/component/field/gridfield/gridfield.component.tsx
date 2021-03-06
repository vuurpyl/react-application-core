import * as React from 'react';

import { Grid } from '../../grid';
import { IGridFieldProps, IGridFieldState } from './gridfield.interface';
import { MultiField, fromMultiItemEntitiesToFieldsChanges } from '../multifield';
import { ClsUtils } from '../../../util';
import {
  IFieldChangeEntity,
  IGenericGridEntity,
  INITIAL_LIST_ENTITY,
} from '../../../definition';

export class GridField extends MultiField<IGridFieldProps, IGridFieldState> {

  /**
   * @stable [02.06.2018]
   * @param {IGridFieldProps} props
   */
  constructor(props: IGridFieldProps) {
    super(props);
    this.onChangeRowField = this.onChangeRowField.bind(this);
  }

  /**
   * @stable [21.06.2018]
   * @returns {JSX.Element}
   */
  protected get attachmentElement(): JSX.Element {
    const props = this.props;

    const gridListEntity: IGenericGridEntity = {
      ...INITIAL_LIST_ENTITY,
      data: this.multiFieldPlugin.activeValue,
      changes: fromMultiItemEntitiesToFieldsChanges(this.multiFieldPlugin.editValue),
    };

    return (
      <Grid emptyMessage={this.settings.messages.noItemsMessage}
            emptyDataMessage={this.settings.messages.noItemsMessage}
            {...gridListEntity}
            {...props.gridConfiguration}
            onChange={this.onChangeRowField}
            deactivated={this.isInactive}/>
    );
  }

  /**
   * @stable [19.09.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), 'rac-gridfield');
  }

  /**
   * @stable [07.06.2018]
   * @param {IFieldChangeEntity} fieldChangeEntity
   */
  private onChangeRowField(fieldChangeEntity: IFieldChangeEntity): void {
    this.multiFieldPlugin.onEditItem({id: fieldChangeEntity.rawData.id, ...fieldChangeEntity});
  }
}
