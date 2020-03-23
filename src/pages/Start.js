import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenRequest from '../services/tokenRequest';
import SendToken from '../actions/SendToken';

class Start extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    tokenRequest()
      .then(({ token }) => dispatch(SendToken(token)));
  }

  render() {
    return null;
  }
}

export default connect()(Start);

Start.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
