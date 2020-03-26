import React from 'react';
import DropdownCategory from '../components/DropdownCategory';
import PropTypes from 'prop-types';

const Configuration = ({ history }) => (
  <div>
    <button onClick={() => history.push('/')}>Voltar</button>
    <DropdownCategory />
  </div>
);

export default Configuration;

Configuration.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}
