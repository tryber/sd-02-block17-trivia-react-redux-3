import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayGameButton from '../components/PlayGameButton';
import InputInitial from '../components/Input';
import tokenRequest from '../services/tokenRequest';
import SendToken from '../actions/SendToken';
import ConfigurationButton from '../components/ConfigurationButton';

class Start extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    tokenRequest()
      .then(({ token }) => dispatch(SendToken(token)));
  }

  render() {
    return (
      <div>
        <div>
          <ConfigurationButton />
        </div>
        <div>
          <InputInitial />
        </div>
        <div>
          <PlayGameButton />
        </div>
      </div>
    );
  }
}

export default connect()(Start);

Start.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
