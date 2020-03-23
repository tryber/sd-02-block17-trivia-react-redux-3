import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import PlayGameButton from '../components/PlayGameButton';
import InputInitial from '../components/Input';

class Start extends Component {
  render() {
    return (
      <div>
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
