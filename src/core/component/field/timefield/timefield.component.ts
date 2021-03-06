import { BaseTextField } from '../text-field';
import { IDateTimeSettings } from '../../../settings';
import {
  ITimeFieldInternalState,
  ITimeFieldInternalProps,
} from './timefield.interface';

export class TimeField extends BaseTextField<ITimeFieldInternalProps,
                                              ITimeFieldInternalState> {

  protected getFieldMask(): Array<string|RegExp> {
    return super.getFieldMask() ||
      (this.props.useShortMask ? this.dateTimeSettings.uiShortTimeMask : this.dateTimeSettings.uiTimeMask);
  }

  protected getFieldPattern(): string {
    return super.getFieldPattern() ||
      (this.props.useShortMask ? this.dateTimeSettings.uiShortTimePattern : this.dateTimeSettings.uiTimePattern);
  }

  private get dateTimeSettings(): IDateTimeSettings {
    return this.settings.dateTime || {};
  }
}
