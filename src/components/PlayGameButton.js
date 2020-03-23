import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenRequest from '../services/tokenRequest';
import SendToken from '../actions/SendToken';

const PlayGameButton = ({ getToken }) => (
  <Link to="/game">
    <button
      type="button"
      onClick={getToken}
      data-testid="btn-play"
    >
      Jogar!
    </button>
  </Link>

);

const mapDispatchToProps = (dispatch) => ({
  getToken: () => tokenRequest().then(({ token }) => dispatch(SendToken(token))),
});

export default connect(null, mapDispatchToProps)(PlayGameButton);

PlayGameButton.propTypes = {
  getToken: PropTypes.func.isRequired,
};
