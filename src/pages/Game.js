import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsApi from '../services/getQuestionsApi';
import receiveQuestion from '../actions/ReceiveQuestion';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { sendQuestions } = this.props;

    getQuestionsApi(this.props)
      .then(({ results }) => sendQuestions(results));
  }
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = ({
  getToken: { token },
  categoryReducer: { categorySelected },
  difficultyreducer: { difficultySelected },
  typeReducer: { typeSelected },
}) => ({ token, categorySelected, difficultySelected, typeSelected });
const mapDispatchToProps = (dispatch) => ({
  sendQuestions: (results) => dispatch(receiveQuestion(results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  sendQuestions: PropTypes.func.isRequired,
};
