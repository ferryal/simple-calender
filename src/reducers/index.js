import { combineReducers } from 'redux';
import month from './month';
import reminder from './reminder';
import dates from './dates';
import reminders from './reminders';

export default combineReducers({
  dates,
  reminders,
  month,
  reminder
});
