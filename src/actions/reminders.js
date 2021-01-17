import { SET_REMINDER } from './ActionTypes';

export function setReminder(reminder) {
  return {
    type: SET_REMINDER,
    payload: reminder,
  };
}
