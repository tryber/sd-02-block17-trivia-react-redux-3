import React from 'react';
import PropTypes from 'prop-types';
import DropdownCategory from '../components/DropdownCategory';

const Configuration = ({ history }) => (
  <div>
    <button onClick={() => history.push('/')}>Voltar</button>
    <DropdownCategory />
  </div>
);

export default Configuration;

Configuration.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
