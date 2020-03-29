import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenRequest from '../services/tokenRequest';

class PlayGameButton extends React.Component {
  static onPlay() {
    tokenRequest()
      .then((results) => console.log(results));
  }

  render() {
    const { name, email } = this.props;
    return (
      <Link to="/game">
        <button
          type="button"
          onClick={PlayGameButton.onPlay}
          data-testid="btn-play"
          disabled={(name !== '' && email !== '') ? false : !false}
        >
          Jogar!
        </button>
      </Link>
    );
  }
}

const mapStateToProps = ({ gameReducer: { name, email } }) => ({ name, email });

export default connect(mapStateToProps)(PlayGameButton);

PlayGameButton.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

PlayGameButton.defaultProps = {
  name: '',
  email: '',
};
