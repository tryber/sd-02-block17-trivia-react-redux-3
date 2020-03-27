import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { wrongAnswer } from '../actions/ChangeScoreboard';
import { resetTimer } from '../actions/TimerActions';
import { getQuestionNumber } from '../actions/getQuestionNumber';
import Answers from './Answers';
import Timer from './Timer';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { sendQuestionNumber } = this.props;
    const { questionNumber } = this.state;
    sendQuestionNumber(questionNumber);

  }

  componentDidUpdate(prevProps, prevState) {
    const { timer, wrongAnswerSelected, sendQuestionNumber } = this.props;
    const { questionNumber } = this.state;
    if (prevState.questionNumber !== questionNumber) {
      console.log(prevState.questionNumber, questionNumber)
      sendQuestionNumber(questionNumber);
    }
    return timer === 0 && wrongAnswerSelected();
  }

  nextQuestion() {
    const { resetTimerNow } = this.props;
    this.setState((state) => ({ questionNumber: state.questionNumber + 1 }));
    resetTimerNow();
  }

  render() {
    const { results, timer } = this.props;
    const { questionNumber } = this.state;
    const currentQuestion = results.map(({ question }) => question);
    const currentCategory = results.map(({ category }) => category);
    return (
      <div>
        {timer === 0 && <div>RESPOSTA ERRADA</div>}
        <div>
          <p>{currentCategory[questionNumber]}</p>
          <h3>{currentQuestion[questionNumber]}</h3>
        </div>
        <div>
          <Timer />
        </div>
        <div>
          <Answers />
        </div>
        <div>
          {
            questionNumber < 4
              ? <button type="button" onClick={this.nextQuestion}>PRÓXIMA</button>
              : <Link to="/feedback"><button type="button">FINALIZAR</button></Link>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  wrongAnswerSelected: () => dispatch(wrongAnswer()),
  resetTimerNow: () => dispatch(resetTimer()),
  sendQuestionNumber: (number) => dispatch(getQuestionNumber(number)),
});

const mapStateToProps = ({
  getQuestions: { results },
  timeReducer: { timer },
}) => ({ results, timer });

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  resetTimerNow: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  timer: PropTypes.number.isRequired,
  wrongAnswerSelected: PropTypes.func.isRequired,
};
