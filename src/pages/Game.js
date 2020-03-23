import { Component } from 'react';
import { connect } from 'react-redux';
import tokenRequest from '../services/tokenRequest';
import SendToken from '../actions/SendToken';

class Game extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    tokenRequest()
      .then(({ token }) => dispatch(SendToken(token)));
  }

  render() {
    return null;
  }
}

export default connect()(Game);
