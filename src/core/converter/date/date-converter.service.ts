import { injectable } from 'inversify';
import * as R from 'ramda';
import * as moment from 'moment';
import 'moment-timezone';

import { lazyInject, DI_TYPES } from '../../di';
import { DEFAULT_TIME_FROM, DEFAULT_TIME_TO, IKeyValue } from '../../definitions.interface';
import { isString, orNull, orUndef, defValuesFilter, ifNotNilThanValue, NUMBER_COMPARATOR } from '../../util';
import { IDateTimeSettings, ISettings, StartDayOfWeekT } from '../../settings';
import { IDateConverter, DateTimeLikeTypeT } from './date-converter.interface';

@injectable()
export class DateConverter implements IDateConverter {
  private static MONTHS = moment.months();
  private static MONTHS_SHORT = moment.monthsShort();
  private static WEEKDAYS_SHORT = moment.weekdaysShort()
      .slice(1, 7)
      .concat(moment.weekdaysShort()[0]);
  private static WEEKDAYS = moment.weekdays()
      .slice(1, 7)
      .concat(moment.weekdays()[0]);

  @lazyInject(DI_TYPES.Settings) private settings: ISettings;

  /**
   * @stable [08.08.2019]
   * @param {DateTimeLikeTypeT} date1
   * @param {DateTimeLikeTypeT} date2
   * @returns {number}
   */
  public compare(date1: DateTimeLikeTypeT, date2: DateTimeLikeTypeT): number {
    const date1$ = date1 as Date;
    const date2$ = date2 as Date;

    return R.equals(date1, date2)
      ? 0
      : (
        date1$ instanceof Date && date2$ instanceof Date
          ? NUMBER_COMPARATOR(date1$.getTime(), date2$.getTime())
          : NaN
      );
  }

  /**
   * @stable [11.08.2018]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @param {string} outputFormat
   * @returns {string}
   */
  public format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string {
    if (R.isNil(date) || R.isEmpty(date)) {
      return '';
    } else {
      const momentDate = this.toMomentDate(date, inputFormat);
      return momentDate.isValid()
          ? momentDate.format(outputFormat)
          : String(date);
    }
  }

  /**
   * @stable [09.11.2018]
   * @param {DateTimeLikeTypeT} date
   * @param {string} outputFormat
   * @returns {string}
   */
  public fromDateTimeToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateTimeFormat, outputFormat);
  }

  /**
   * @stable [04.03.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} outputFormat
   * @returns {string}
   */
  public fromDateToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateFormat, outputFormat);
  }

  /**
   * @stable [04.03.2019]
   * @param {DateTimeLikeTypeT} date
   * @returns {number}
   */
  public fromDateToYear(date: DateTimeLikeTypeT = this.currentDate): number {
    return this.toYear(date, this.dateFormat);
  }

  /**
   * @stable [09.11.2018]
   * @param {DateTimeLikeTypeT} date [Example: 2018-04-07T20:54:45+03:00]
   * @returns {string} [Example: Apr 07 08:54 PM]
   */
  public fromDateTimeToPstDateTime(date: DateTimeLikeTypeT = this.currentDate): string {
    return this.fromDateTimeToArbitraryFormat(date, this.pstDateTimeFormat);
  }

  /**
   * @stable [09.11.2018]
   * @param {DateTimeLikeTypeT} date [Example: 2018-11-30T03:00:00+03:00]
   * @returns {string} [Example: Nov 30]
   */
  public fromDateTimeToPstDate(date: DateTimeLikeTypeT = this.currentDate): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateTimeSettings.pstDateFormat);
  }

  /**
   * @stable [08.01.2019]
   * @param {DateTimeLikeTypeT} date
   * @returns {string}
   */
  public fromDateTimeToPstTime(date: DateTimeLikeTypeT = this.currentDate): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateTimeSettings.pstTimeFormat);
  }

  /**
   * @stable [09.11.2018]
   * @param {DateTimeLikeTypeT} date [Example: 2018-04-07T20:54:45+03:00]
   * @returns {string} [Example: 2018-04-07]
   */
  public fromDateTimeToDate(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateFormat);
  }

  /**
   * @stable [09.11.2018]
   * @param {DateTimeLikeTypeT} date [Example: 2018-04-07T20:54:45+03:00]
   * @returns {string} [Example: 20:54:45]
   */
  public fromDateTimeToTime(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.timeFormat);
  }

  /**
   * @stable [23.11.2018]
   * @param {DateTimeLikeTypeT} date [Example: Wed Oct 24 2018 04:07:41 GMT+0300 (RTZ 2 (зима))]
   * @returns {string} [Example: 2018-10-24T04:07:41+03:00]
   */
  public fromDateTimeToDateTime(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateTimeFormat);
  }

  /**
   * @stable [24.11.2018]
   * @param {string} date [Example: 2018-11-24]
   * @param {string} time [Example: 03:47:17]
   * @returns {string} [Example: 2018-11-24T03:47:17+03:00]
   */
  public fromUiDateTimeToDateTime(date: string, time: string): string {
    return this.format(this.combine(date, time), this.uiDateTimeFormat, this.dateTimeFormat);
  }

  /**
   * @stable [11.08.2019]
   * @param {DateTimeLikeTypeT} date
   * @returns {string}
   */
  public fromUiDateToDateTime(date: DateTimeLikeTypeT): string {
    return this.format(date, this.uiDateFormat, this.dateTimeFormat);
  }

  /**
   * @stable [24.11.2018]
   * @param {string} date [Example: 2018-11-24]
   * @param {string} time [Example: 03:47:17]
   * @returns {string} [Example: Nov 24]
   */
  public fromUiDateTimeToPstDate(date: string, time: string): string {
    return this.fromDateTimeToPstDate(this.fromUiDateTimeToDateTime(date, time));
  }

  /**
   * @stable [09.11.2018]
   * @param {TEntity} entity
   * @param {string} dateFieldName
   * @param {string} timeFieldName
   * @param {(entity: TEntity) => string} dateResolver
   * @returns {IKeyValue}
   */
  public splitToDateTimeFields<TEntity>(entity: TEntity,
                                        dateFieldName: string,
                                        timeFieldName: string,
                                        dateResolver: (entity: TEntity) => string): IKeyValue {
    const date = dateResolver(entity);

    return defValuesFilter({
      [timeFieldName]: orUndef<string>(date, () => this.fromDateTimeToTime(date)),
      [dateFieldName]: orUndef<string>(date, () => this.fromDateTimeToDate(date)),
    });
  }

  /**
   * @stable [07.01.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {DateTimeLikeTypeT}
   */
  public tryConvertToDate(date: DateTimeLikeTypeT, inputFormat = this.dateFormat): DateTimeLikeTypeT {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() ? momentDate.toDate() : date;
  }

  /**
   * @stable [06.06.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {number}
   */
  public tryConvertToDateAsTime(date: DateTimeLikeTypeT, inputFormat = this.dateTimeFormat): number {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() ? momentDate.toDate().getTime() : -1;
  }

  /**
   * @stable [07.01.2019]
   * @param {moment.DurationInputArg2} unit
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryAddXDurationAsMomentDate(unit: moment.DurationInputArg2,
                                     duration: moment.DurationInputArg1,
                                     date: DateTimeLikeTypeT = this.currentDate,
                                     inputFormat = this.uiDateFormat): moment.Moment {
    const momentDate = this.toMomentDate(date, inputFormat);
    return orNull(momentDate.isValid(), () => momentDate.add(duration, unit));
  }

  /**
   * @stable [07.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryAddXDaysAsMomentDate(duration: moment.DurationInputArg1,
                                 date: DateTimeLikeTypeT = this.currentDate,
                                 inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryAddXDurationAsMomentDate('days', duration, date, inputFormat);
  }

  /**
   * @stable [11.08.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {number}
   */
  public tryGetWeekdayNumber(date: DateTimeLikeTypeT = this.currentDate,
                             inputFormat = this.uiDateFormat): number {
    const momentDate = this.toMomentDate(date, inputFormat);
    return orNull(momentDate.isValid(),
      () => this.settings.dateTime.startDayOfWeek === StartDayOfWeekT.MONDAY // TODO make getter
        ? momentDate.isoWeekday() : momentDate.weekday());
  }

  /**
   * @stable [07.01.2019]
   * @param {moment.DurationInputArg2} unit
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXDuration(unit: moment.DurationInputArg2,
                         duration: moment.DurationInputArg1,
                         date: DateTimeLikeTypeT = this.currentDate,
                         inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryAddXDurationAsMomentDate(unit, duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [07.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXDays(duration: moment.DurationInputArg1,
                     date: DateTimeLikeTypeT = this.currentDate,
                     inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('days', duration, date, inputFormat);
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXWeeks(duration: moment.DurationInputArg1,
                      date: DateTimeLikeTypeT = this.currentDate,
                      inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('weeks', duration, date, inputFormat);
  }

  /**
   * @stable [07.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXMonths(duration: moment.DurationInputArg1,
                       date: DateTimeLikeTypeT = this.currentDate,
                       inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('months', duration, date, inputFormat);
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXQuarters(duration: moment.DurationInputArg1,
                         date: DateTimeLikeTypeT = this.currentDate,
                         inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('quarters', duration, date, inputFormat);
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXYears(duration: moment.DurationInputArg1,
                      date: DateTimeLikeTypeT = this.currentDate,
                      inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('years', duration, date, inputFormat);
  }

  /**
   * @stable [09.02.2019]
   * @param {moment.DurationInputArg2} unit
   * @param {moment.unitOfTime.StartOf} startOf
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfXAsMomentDate(unit: moment.DurationInputArg2,
                                       startOf: moment.unitOfTime.StartOf,
                                       duration: moment.DurationInputArg1 = 0,
                                       date: DateTimeLikeTypeT = this.currentDate,
                                       inputFormat = this.uiDateFormat): moment.Moment {
    return ifNotNilThanValue<moment.Moment, moment.Moment>(
      this.tryAddXDurationAsMomentDate(unit, duration, date, inputFormat), (value) => value.startOf(startOf)
    );
  }

  /**
   * @stable [08.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfMonthAsMomentDate(duration: moment.DurationInputArg1 = 0,
                                           date: DateTimeLikeTypeT = this.currentDate,
                                           inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryGetFirstDayOfXAsMomentDate('months', 'month', duration, date, inputFormat);
  }

  /**
   * @stable [10.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfYearAsMomentDate(duration: moment.DurationInputArg1 = 0,
                                          date: DateTimeLikeTypeT = this.currentDate,
                                          inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryGetFirstDayOfXAsMomentDate('years', 'year', duration, date, inputFormat);
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfQuarterAsMomentDate(duration: moment.DurationInputArg1 = 0,
                                             date: DateTimeLikeTypeT = this.currentDate,
                                             inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryGetFirstDayOfXAsMomentDate('quarters', 'quarter', duration, date, inputFormat);
  }

  /**
   * @stable [09.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfWeekAsMomentDate(duration: moment.DurationInputArg1 = 0,
                                          date: DateTimeLikeTypeT = this.currentDate,
                                          inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryGetFirstDayOfXAsMomentDate(
      'weeks',
      this.settings.dateTime.startDayOfWeek === StartDayOfWeekT.MONDAY ? 'isoWeek' : 'week',
      duration, date, inputFormat
    );
  }

  /**
   * @stable [09.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryGetFirstDayOfWeek(duration: moment.DurationInputArg1 = 0,
                              date: DateTimeLikeTypeT = this.currentDate,
                              inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfWeekAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [08.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryGetFirstDayOfMonth(duration: moment.DurationInputArg1 = 0,
                               date: DateTimeLikeTypeT = this.currentDate,
                               inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfMonthAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryGetFirstDayOfQuarter(duration: moment.DurationInputArg1 = 0,
                                 date: DateTimeLikeTypeT = this.currentDate,
                                 inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfQuarterAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryGetFirstDayOfYear(duration: moment.DurationInputArg1 = 0,
                              date: DateTimeLikeTypeT = this.currentDate,
                              inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfYearAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [08.08.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {boolean}
   */
  public isDateBelongsToCurrentWeek(date: DateTimeLikeTypeT,
                                    inputFormat = this.dateFormat): boolean {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() && (momentDate.toDate() >= this.tryGetFirstDayOfWeek());
  }

  /**
   * @deprecated Use fromDateTimeToDate
   */
  public fromDateToUiDate(date: DateTimeLikeTypeT): string {
    return this.format(
      this.shrinkDate(date), /* Need to clear a timezone */
      this.dateFormat,
      this.uiDateFormat
    );
  }

  public fromDateTimeToUiDate(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.uiDateFormat);
  }

  public fromDateTimeToUiDateTime(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.uiDateTimeFormat);
  }

  /**
   * @test
   * @param {string} startUiDate [2018-01-31]
   * @param {string} startUiTime [21:58:59]
   * @returns {string} The formatted value [2018-01-31T21:58:59-08:00]
   */
  public fromStartUiDateTimeToDateTime(startUiDate: string, startUiTime = DEFAULT_TIME_FROM): string {
    return this.fromUiDateTimeToDateTime(startUiDate, startUiTime);
  }

  /**
   * @test
   * @param {string} endUiDate [2018-01-31]
   * @param {string} endUiTime [23:59:59]
   * @returns {string} The formatted value [2018-01-31T23:59:59-08:00]
   */
  public fromEndUiDateTimeToDateTime(endUiDate: string, endUiTime = DEFAULT_TIME_TO): string {
    return this.fromUiDateTimeToDateTime(endUiDate, endUiTime);
  }

  /**
   * @deprecated
   */
  public from30DaysAgoUiDateTimeToDateTime(): string {
    return this.fromUiDateTimeToDateTime(
      this.fromDateToUiDate(this.get30DaysAgo()),
      DEFAULT_TIME_FROM
    );
  }

  /**
   * @deprecated
   */
  public get30DaysAgo(): Date {
    return this.getXDaysAgo(30);
  }

  /**
   * @deprecated
   */
  public getXDaysLater(days: number): Date {
    return this.getCurrentMomentDate().add(days, 'days').toDate();
  }

  /**
   * @deprecated
   */
  public getXDaysAgo(days: number): Date {
    return this.getCurrentMomentDate().subtract(days, 'days').toDate();
  }

  /**
   * @deprecated
   */
  public addXDays(date: Date, days: number): Date {
    return this.toMomentDate(date).add(days, 'days').toDate();
  }

  /**
   * @stable [29.08.2019]
   * @returns {Date}
   */
  public getCurrentDate(): Date {
    return this.currentDate;
  }

  public getCurrentTime(): Date {
    return new Date();
  }

  /**
   * @stable [08.08.2019]
   * @returns {Date}
   */
  public getStartOfCurrentDate(): Date {
    const date = new Date(this.currentDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  /**
   * @stable [09.05.2019]
   * @returns {Date}
   */
  public getYesterdayDate(): Date {
    return this.tryAddXDays(-1);
  }

  public formatDate(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateFormat, outputFormat);
  }

  public formatDateTimeFromDateTime(date: DateTimeLikeTypeT): string {
    return this.formatDateTime(date, this.dateTimeFormat);
  }

  public formatTimeFromDateTime(date: DateTimeLikeTypeT): string {
    return this.formatDateTime(date, this.timeFormat);
  }

  public formatDateTime(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateTimeFormat, outputFormat);
  }

  public formatPSTDate(date: DateTimeLikeTypeT = new Date()): string {
    return this.formatDate(date, this.dateTimeSettings.pstDateFormat);
  }

  public appendToDate(date: DateTimeLikeTypeT, data: Array<Array<number|string>>, inputFormat: string = this.dateFormat): Date {
    let momentDate = this.toMomentDate(date, inputFormat);
    data.forEach((item) => {
      momentDate = momentDate.add(item[0] as moment.DurationInputArg1, item[1] as moment.DurationInputArg2);
    });
    return momentDate.toDate();
  }

  public getLocalizedMonth(index: number): string {
    return DateConverter.MONTHS[index];
  }

  public getLocalizedMonthShort(index: number): string {
    return DateConverter.MONTHS_SHORT[index];
  }

  public getLocalizedWeekday(index: number): string {
    return DateConverter.WEEKDAYS[index];
  }

  public getLocalizedWeekdayShort(index: number): string {
    return DateConverter.WEEKDAYS_SHORT[index];
  }

  /**
   * @stable [25.08.2018]
   * @param {number} monthsAgo
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {Date}
   */
  public getLastDayOfMonth(monthsAgo = 1,
                           date: DateTimeLikeTypeT = this.currentDate,
                           inputFormat = this.dateTimeSettings.uiDateFormat): Date {
    const momentDate = this.toMomentDate(date, inputFormat);
    return orNull(
      momentDate.isValid(),
      () => momentDate.subtract(monthsAgo, 'months').endOf('month').toDate()
    );
  }

  /**
   * @stable [25.08.2018]
   * @param {number} monthsAgo
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {Date}
   */
  public getFirstDayOfMonth(monthsAgo = 0,
                            date: DateTimeLikeTypeT = this.currentDate,
                            inputFormat = this.dateTimeSettings.uiDateFormat): Date {
    const momentDate = this.toMomentDate(date, inputFormat);
    return orNull(
      momentDate.isValid(),
      () => momentDate.subtract(monthsAgo, 'months').startOf('month').toDate()
    );
  }

  public getPersonAge(birthday: DateTimeLikeTypeT,
                      date: DateTimeLikeTypeT = this.currentDate,
                      inputFormat?: string): number {
    return this.toMomentDate(date, inputFormat).diff(birthday, 'years');
  }

  public isSameMonth(date1: Date, date2: Date): boolean {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  public isSameDay(date1: Date, date2: Date): boolean {
    return this.isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
  }

  public isWeekend(day: number): boolean {
    return day === 0 || day === 6;
  }

  /**
   * @stable [24.11.2018]
   * @param {string} dateAsString
   * @param {string} timeAsString
   * @returns {string}
   */
  public combine(dateAsString: string, timeAsString: string): string {
    return [dateAsString, timeAsString].join(' ');
  }

  /**
   * @stable [25.08.2018]
   * @param {DateTimeLikeTypeT} dateTime
   * @param {string} separator
   * @returns {DateTimeLikeTypeT}
   */
  public shrinkDate(dateTime: DateTimeLikeTypeT, separator = 'T'): DateTimeLikeTypeT {
    return isString(dateTime) ? (dateTime as string).split(separator)[0] : dateTime;
  }

  /**
   * @stable [03.04.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {Date}
   */
  public toDate(date: DateTimeLikeTypeT, inputFormat?: string): Date {
    return this.toMomentDate(date, inputFormat).toDate();
  }

  /**
   * @stable [11.08.2018]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {moment.Moment}
   */
  private toMomentDate(date: DateTimeLikeTypeT, inputFormat?: string): moment.Moment {
    const momentDate = date instanceof Date
      ? moment(date)
      : moment(date, inputFormat, true);
    const zone = this.timeZone;
    return zone ? moment.tz(date, zone) : momentDate;
  }

  /**
   * @deprecated
   */
  private getCurrentMomentDate(): moment.Moment {
    return this.toMomentDate(this.currentDate);
  }

  /**
   * @stable [11.08.2018]
   * @returns {string}
   */
  private get timeZone(): string {
    return this.dateTimeSettings.timeZone;
  }

  private get currentDate(): Date {
    return this.dateTimeSettings.currentDate;
  }

  private get dateTimeFormat(): string {
    return this.dateTimeSettings.dateTimeFormat;
  }

  private get dateFormat(): string {
    return this.dateTimeSettings.dateFormat;
  }

  private get timeFormat(): string {
    return this.dateTimeSettings.timeFormat;
  }

  private get uiDateFormat(): string {
    return this.dateTimeSettings.uiDateFormat;
  }

  private get uiTimeFormat(): string {
    return this.dateTimeSettings.uiTimeFormat;
  }

  private get uiDateTimeFormat(): string {
    return this.combine(this.uiDateFormat, this.uiTimeFormat);
  }

  private get pstDateTimeFormat(): string {
    return this.combine(this.dateTimeSettings.pstDateFormat, this.dateTimeSettings.pstTimeFormat);
  }

  private get dateTimeSettings(): IDateTimeSettings {
    return this.settings.dateTime || {};
  }

  /**
   * @stable [04.03.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {number}
   */
  private toYear(date: DateTimeLikeTypeT, inputFormat: string): number {
    return this.toDate(date, inputFormat).getFullYear();
  }

  /**
   * @stable [04.03.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {number}
   */
  private toMonth(date: DateTimeLikeTypeT, inputFormat: string): number {
    return this.toDate(date, inputFormat).getMonth();
  }
}
