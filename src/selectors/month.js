import { createSelector } from 'reselect';
import { getDisplayMonthAndYear as getDisplayMonthAndYearHelper } from '../helpers/calendar';

export const getMonth = (state) => state.month;

export const getDisplayMonthAndYear = createSelector([getMonth], (month) =>
  month !== null ? getDisplayMonthAndYearHelper(month) : ''
);
