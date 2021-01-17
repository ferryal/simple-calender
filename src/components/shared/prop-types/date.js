import PropTypes from 'prop-types';

export const DatePropType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  trailing: PropTypes.bool.isRequired,
  isWeekend: PropTypes.bool.isRequired,
});

export const DateReminderPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  dateTime: PropTypes.number.isRequired,
  displayTime: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});
