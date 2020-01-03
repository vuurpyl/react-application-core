import * as moment from 'moment';

import {
  ICurrentWrapper,
  IDateWrapper,
  IDaysLabelsWrapper,
  IDaysWrapper,
  IDurationWrapper,
  IEntityIdTWrapper,
  IIndexWrapper,
  IInputFormatWrapper,
  IInputTimeFormatWrapper,
  IIsoWeekWrapper,
  INextWrapper,
  IOutputFormatWrapper,
  IOutputTimeFormatWrapper,
  IPreviousWrapper,
  IStrictWrapper,
  ITimeWrapper,
  IUnitWrapper,
  IValueWrapper,
  IZoneWrapper,
  StringNumberT,
} from '../definitions.interface';

/**
 * @stable [22.12.2019]
 */
export type DateTimeLikeTypeT = string | Date;
export type MomentT = moment.Moment;

// TODO ?
export const DAYS_OF_WEEK = Object.freeze<{id: number, name: string}>([
  {id: 0, name: 'Sunday'},
  {id: 1, name: 'Monday'},
  {id: 2, name: 'Tuesday'},
  {id: 3, name: 'Wednesday'},
  {id: 4, name: 'Thursday'},
  {id: 5, name: 'Friday'},
  {id: 6, name: 'Saturday'}
]);

/**
 * @stable [17.12.2019]
 */
export interface IDateTimeConfigEntity<TDate = Date>
  extends IDateWrapper<DateTimeLikeTypeT | TDate>,
    IDurationWrapper<StringNumberT>,
    IIndexWrapper,
    IInputFormatWrapper,
    IInputTimeFormatWrapper,
    IIsoWeekWrapper,
    IOutputFormatWrapper,
    IOutputTimeFormatWrapper,
    IStrictWrapper,
    ITimeWrapper,
    IUnitWrapper<string>,
    IZoneWrapper {
}

/**
 * @stable [03.01.2020]
 */
export interface ICalendarDayEntity
  extends ICurrentWrapper<boolean>,
    IDateWrapper<Date>,
    INextWrapper<boolean>,
    IPreviousWrapper<boolean>,
    IValueWrapper<number> {
}

/**
 * @stable [03.01.2020]
 */
export interface ICalendarWeekEntity
  extends IEntityIdTWrapper {
  0?: ICalendarDayEntity;
  1?: ICalendarDayEntity;
  2?: ICalendarDayEntity;
  3?: ICalendarDayEntity;
  4?: ICalendarDayEntity;
  5?: ICalendarDayEntity;
  6?: ICalendarDayEntity;
}

/**
 * @stable [03.01.2020]
 */
export interface ICalendarEntity
  extends IDaysWrapper<ICalendarWeekEntity[]>,
    IDaysLabelsWrapper<string[]> {
}
