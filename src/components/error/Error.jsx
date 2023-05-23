import PropTypes from 'prop-types';

export const Error = ({ error }) => {
  return <h2>{error}</h2>;
};

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
