import { REMINDER } from '../actions/ActionTypes';

export default function reminder(state = null, action) {
  switch (action.type) {
    case REMINDER.OPEN_REMINDER:
      return action.payload;

    case REMINDER.CLOSE_REMINDER:
      return null;

    default:
      return state;
  }
}
