import { SET_DATE_REMINDER } from './ActionTypes';

export function setDateReminder({ date, reminderId }) {
  return {
    type: SET_DATE_REMINDER,
    payload: {
      date,
      reminderId,
    },
  };
}
