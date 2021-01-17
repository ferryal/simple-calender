import { SET_MONTH } from './ActionTypes';

export function setMonth(month) {
  return {
    type: SET_MONTH,
    payload: month,
  };
}
