import { DateTime } from 'luxon';
import { apply, call, put, takeEvery } from 'redux-saga/effects';
import { setDateReminder } from '../actions/dates';
import { setReminder } from '../actions/reminders';
import { openReminder, closeReminder  } from '../actions/reminder';
import { REMINDER } from '../actions/ActionTypes';
import { dateTimeStringsToMillis, DATE_FORMAT } from '../helpers/calendar';
import { DEFAULT_COLOR } from '../helpers/colors';
import { generateUUID } from '../helpers/uuid';

export function* openRemind(reminder) {
  yield put(openReminder(reminder));
}

export function* newRemind(action) {
  const initialDate = action.payload;
  let initialDateTime = yield apply(DateTime, 'local');

  if (initialDate) {
    const parsed = DateTime.fromFormat(initialDate, DATE_FORMAT);
    if (parsed.isValid) {
      initialDateTime = initialDateTime.set({
        year: parsed.year,
        month: parsed.month,
        day: parsed.day,
      });
    }
  }

  const initialColor = DEFAULT_COLOR;

  const reminder = {
    id: null,
    name: '',
    color: initialColor,
    dateTime: initialDateTime.toMillis(),
    email: '',
  };

  yield call(openRemind, reminder);
}

export function* editRemind(action) {
  yield call(openRemind, action.payload);
}

export function* submitRemind(action) {
  const reminder = action.payload;
  let id = reminder.id;
  if (!id) {
    id = yield call(generateUUID);
  }

  const reminderToSet = {
    id,
    name: reminder.name,
    color: reminder.color,
    dateTime: dateTimeStringsToMillis(reminder.date, reminder.time),
    email: reminder.email,
  };

  const dateReminder = { date: reminder.date, reminderId: reminderToSet.id };

  yield put(setReminder(reminderToSet));
  yield put(setDateReminder(dateReminder));

  yield put(closeReminder());
}

export function* watchNewReminder() {
  yield takeEvery(REMINDER.NEW_REMINDER, newRemind);
}

export function* watchEditReminder() {
  yield takeEvery(REMINDER.EDIT_REMINDER, editRemind);
}

export function* watchSubmitReminder() {
  yield takeEvery(REMINDER.SUBMIT_REMINDER, submitRemind);
}
