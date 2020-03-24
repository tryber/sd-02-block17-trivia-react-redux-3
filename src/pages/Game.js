import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsApi from '../services/getQuestionsApi';
import receiveQuestion from '../actions/ReceiveQuestion';
import Answers from '../components/Answers';
class Game extends React.Component {
  componentDidMount() {
    const { sendQuestions } = this.props;
    getQuestionsApi(this.props)
      .then(({ results }) => sendQuestions(results));
  }
  render() {
    return (<h1>Game</h1>);
  }
}

const mapStateToProps = ({ getToken: { token } }) => ({ token });
const mapDispatchToProps = (dispatch) => ({
  sendQuestions: (results) => dispatch(receiveQuestion(results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  sendQuestions: PropTypes.func.isRequired,
};
