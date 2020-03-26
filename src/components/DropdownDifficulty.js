import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import changeD from '../actions/ChangeDifficulty';

const DropdownDifficulty = ({ difficulty, Dselected, saveChange }) => (
  <div>
    <h4>Dificuldade:</h4>
    <select
      data-testid="question-difficulty-dropdown"
      value={Dselected}
      onChange={({ target }) => saveChange(target.value)}
    >
      <option value="">Random</option>
      {difficulty.map((diffi) => (<option value={diffi} key={diffi}>{diffi}</option>))}
    </select >
  </div>
);

const mapStateToProps = ({ difficultyreducer: { difficulty, Dselected } }) => ({ difficulty, Dselected });

const mapDispatchToProps = (dispatch) => ({
  saveChange: (change) => dispatch(changeD(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownDifficulty);

DropdownDifficulty.propTypes = {
  saveChange: PropTypes.func.isRequired,
  Dselected: PropTypes.string,
  difficulty: PropTypes.instanceOf(Array).isRequired
};

DropdownDifficulty.defaultProps = {
  Dselected: '',
};
