import React from 'react';
import DropdownCategory from '../components/DropdownCategory';

const Configuration = ({ history }) => (
  <div>
    <button onClick={() => history.push('/')}>Voltar</button>
    <DropdownCategory />
  </div>
);

export default Configuration;
