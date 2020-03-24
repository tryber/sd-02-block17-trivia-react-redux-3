import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenRequest from '../services/tokenRequest';
import SendToken from '../actions/SendToken';

const PlayGameButton = ({ getToken, name, email }) => (
  <Link to="/game">
    <button
      type="button"
      onClick={getToken}
      data-testid="btn-play"
      disabled={(name !== '' && email !== '') ? false : !false}
    >
      Jogar!
    </button>
  </Link>

);

const mapDispatchToProps = (dispatch) => ({
  getToken: () => tokenRequest().then(({ token }) => dispatch(SendToken(token))),
});

const mapStateToProps = ({ gameReducer: { name, email } }) => ({ name, email });

export default connect(mapStateToProps, mapDispatchToProps)(PlayGameButton);

PlayGameButton.propTypes = {
  getToken: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
};

PlayGameButton.defaultProps = {
  name: '',
  email: '',
}