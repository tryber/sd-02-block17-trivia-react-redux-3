import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenRequest from '../services/tokenRequest';

class PlayGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.onPlayClick = this.onPlayClck.bind(this);
  }

  onPlayClck() {
    tokenRequest()
      .then(async (param) => {
        const aux = (typeof token === 'object') ? param.token : param;
        localStorage.setItem('token', (aux));
        await this.setState({ redirect: true });
      });
  }

  render() {
    const { name, email } = this.props;
    const { redirect } = this.state;
    return (redirect) ? <Redirect to="/game" /> : (
      <button
        type="button"
        onClick={this.onPlayClick}
        data-testid="btn-play"
        disabled={(name !== '' && email !== '') ? false : !false}
      >
        Jogar!
      </button>
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
