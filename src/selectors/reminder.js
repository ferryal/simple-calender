import { createSelector } from 'reselect';
import { millisToDateTimeStrings } from '../helpers/calendar';

export const getReminder = (state) => state.reminder;

export const getFormattedReminder = createSelector(
  [getReminder],
  (reminder) => {
    if (!reminder) return null;

    return {
      id: reminder.id,
      name: reminder.name,
      color: reminder.color,
      email: reminder.email,
      ...millisToDateTimeStrings(reminder.dateTime),
    };
  }
);
