import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newReminder } from '../actions/reminder';
import { getDisplayMonthAndYear } from '../selectors/month';

function AppHeader({ month, newReminder }) {
  return (
    <div className="flex px-8 py-4 flex-row gap-4 flex-nowrap shadow-lg items-center">
      <div className="w-64" />
      <h1 className="flex-grow text-center text-2xl font-medium">{month}</h1>
      <div className="w-64" />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    month: getDisplayMonthAndYear(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newReminder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
