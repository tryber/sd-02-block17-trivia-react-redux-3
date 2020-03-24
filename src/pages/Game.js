import React from 'react';
import { connect } from 'react-redux';
import getQuestionsApi from '../services/getQuestionsApi';
import receiveQuestion from '../actions/ReceiveQuestion';

class Game extends React.Component {
  componentDidMount() {
    const { sendQuestions } = this.props;
      getQuestionsApi(this.props)
        .then(({ results }) => sendQuestions(results));
  }
  render() {
    return (false)
  }
}

const mapStateToProps = ({ getToken: { token } }) => ({ token });
const mapDispatchToProps = (dispatch) => ({
  sendQuestions: (results) => dispatch(receiveQuestion(results))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
