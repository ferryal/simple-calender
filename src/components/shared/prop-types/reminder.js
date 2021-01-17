import PropTypes from 'prop-types';

export const ReminderPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});
