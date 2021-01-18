import { DateTime, Info, Interval } from 'luxon';
import { APP_LOCALE } from '../config/locale';

export const DAYS_IN_A_WEEK = 7;
export const MONTH_FORMAT = 'yyyy-MM';
export const DATE_FORMAT = 'yyyy-MM-dd';
export const TIME_FORMAT = 'hh:mm';

const SATURDAY_NUMBER = 7;
const SUNDAY_NUMBER = 1;
const weekendNumbers = Object.freeze([SATURDAY_NUMBER, SUNDAY_NUMBER]);

export function toLocalWeekdayNumber(isoWeekday) {
  return (isoWeekday % DAYS_IN_A_WEEK) + 1;
}

export function getWeekdaysDescriptions() {
  const config = { locale: APP_LOCALE };
  const long = Info.weekdaysFormat('long', config);
  const short = Info.weekdaysFormat('short', config);
  const narrow = Info.weekdaysFormat('narrow', config);

  const weekDays = Array(DAYS_IN_A_WEEK)
    .fill(null)
    .map((_, weekDayIndex) => {
      return {
        long: long[weekDayIndex],
        short: short[weekDayIndex],
        narrow: narrow[weekDayIndex],
      };
    });

  return [
    weekDays[DAYS_IN_A_WEEK - 1],
    ...weekDays.slice(0, DAYS_IN_A_WEEK - 1),
  ];
}


export function getMonthlyCalendarGrid(dateString) {
  const month = DateTime.fromFormat(dateString, MONTH_FORMAT);

  const monthInterval = Interval.fromDateTimes(
    month.startOf('month'),
    month.endOf('month')
  );

  const firstWeekOffset = toLocalWeekdayNumber(monthInterval.start.weekday) - 1;
  const lastWeekOffset = DAYS_IN_A_WEEK - toLocalWeekdayNumber(monthInterval.end.weekday);
  const calendarInterval = Interval.fromDateTimes(
    monthInterval.start.minus({
      days: firstWeekOffset > 0 ? firstWeekOffset : 0,
    }),
    monthInterval.end.plus({ days: lastWeekOffset })
  );

  const totalDays = calendarInterval.count('days');
  const start = calendarInterval.start;
  return Array(totalDays)
    .fill(null)
    .map((_, startOffset) => {
      const date = start.plus({ days: startOffset });
      return {
        key: date.toFormat(DATE_FORMAT),
        text: date.toLocaleString({ locale: APP_LOCALE, day: 'numeric' }),
        trailing: !month.hasSame(date, 'month'),
        isWeekend: weekendNumbers.includes(toLocalWeekdayNumber(date.weekday)),
      };
    });
}

export function getDisplayMonthAndYear(monthString) {
  return DateTime.fromFormat(monthString, MONTH_FORMAT).toLocaleString({
    locale: APP_LOCALE,
    year: 'numeric',
    month: 'long',
  });
}


export function dateTimeToDateString(dateTime) {
  return dateTime.toFormat(DATE_FORMAT, { locale: APP_LOCALE });
}


export function dateTimeToTimeString(dateTime) {
  return dateTime.toLocaleString(DateTime.TIME_24_SIMPLE);
}


export function millisToDateTimeStrings(dateMillis) {
  const dateTime = DateTime.fromMillis(dateMillis);

  return {
    date: dateTimeToDateString(dateTime),
    time: dateTimeToTimeString(dateTime),
  };
}

export function dateTimeStringsToMillis(dateString, timeString) {
  return DateTime.fromFormat(
    `${dateString} ${timeString}`,
    `${DATE_FORMAT} ${TIME_FORMAT}`,
    { locale: APP_LOCALE }
  ).toMillis();
}

export function getDisplayTimeFromMillis(dateMillis) {
  return DateTime.fromMillis(dateMillis).toLocaleString({
    ...DateTime.TIME_SIMPLE,
    locale: APP_LOCALE,
  });
}
