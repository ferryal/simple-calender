import { REMINDER } from './ActionTypes';

export function newReminder(initialDate) {
  return {
    type: REMINDER.NEW_REMINDER,
    payload: initialDate,
  };
}

export function editReminder(reminder) {
  return {
    type: REMINDER.EDIT_REMINDER,
    payload: reminder,
  };
}

export function submitReminder(reminder) {
  return {
    type: REMINDER.SUBMIT_REMINDER,
    payload: reminder,
  };
}

export function openReminder(reminder) {
  return {
    type: REMINDER.OPEN_REMINDER,
    payload: reminder,
  };
}

export function closeReminder() {
  return {
    type: REMINDER.CLOSE_REMINDER,
  };
}
