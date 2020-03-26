import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChangeDifficulty from '../actions/ChangeDifficulty';

const DropdownDifficulty = ({ difficulty, difficultySelected, saveChange }) => (
  <div>
    <h4>Dificuldade:</h4>
    <select
      data-testid="question-difficulty-dropdown"
      value={difficultySelected}
      onChange={({ target }) => saveChange(target.value)}
    >
      <option value="">Random</option>
      {difficulty.map((diffi) => (<option value={diffi} key={diffi}>{diffi}</option>))}
    </select >
  </div>
);

const mapStateToProps = ({ difficultyreducer: { difficulty, difficultySelected } }) =>
  ({ difficulty, difficultySelected });

const mapDispatchToProps = (dispatch) => ({
  saveChange: (change) => dispatch(ChangeDifficulty(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownDifficulty);

DropdownDifficulty.propTypes = {
  saveChange: PropTypes.func.isRequired,
  Dselected: PropTypes.string,
  difficulty: PropTypes.instanceOf(Array).isRequired,
};

DropdownDifficulty.defaultProps = {
  Dselected: '',
};
