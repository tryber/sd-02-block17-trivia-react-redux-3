import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import changeT from '../actions/ChangeType';

const DropdownType = ({ types, Tselected, saveChange }) => (
  <div>
    <h4>Tipo:</h4>
    <select
      data-testid="question-type-dropdown"
      value={Tselected}
      onChange={({ target }) => saveChange(target.value)}
    >
      <option value="">Random</option>
      {types.map((type) => (<option value={type} key={type}>{type}</option>))}
    </select >
  </div>
);

const mapStateToProps = ({ typeReducer: { types, Tselected } }) =>
  ({ types, Tselected });

const mapDispatchToProps = (dispatch) => ({
  saveChange: (change) => dispatch(changeT(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownType);

DropdownType.propTypes = {
  saveChange: PropTypes.func.isRequired,
  Tselected: PropTypes.string,
  types: PropTypes.instanceOf(Array).isRequired,
};

DropdownType.defaultProps = {
  Tselected: '',
};
