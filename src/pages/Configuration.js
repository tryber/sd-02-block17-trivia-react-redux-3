import React from 'react';
import PropTypes from 'prop-types';
import DropdownCategory from '../components/DropdownCategory';
import DropdownDifficulty from '../components/DropdownDifficulty';

const Configuration = ({ history }) => (
  <div>
    <button onClick={() => history.push('/')}>Voltar</button>
    <DropdownCategory />
    <DropdownDifficulty />
  </div>
);

export default Configuration;

Configuration.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
