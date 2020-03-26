import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatAnswers from '../actions/GameActions';
import { stopTimer } from '../actions/TimerActions';
import './Answers.css';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = { results: {}, answersArray: ['', '', '', ''] };
    this.getAnswers = this.getAnswers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (prevProps.question !== question) {
      this.getAnswers(question);
    }
  }

  getAnswers(question) {
    const { toFormatAnswers } = this.props;
    const { correct_answer: correct, incorrect_answers: incorrect } = question;
    const allAnswers = [correct, ...incorrect];
    const filteredAnswers = (allAnswers.length > 2) ? ['', '', '', ''] : ['', ''];
    for (let i = 0; i < filteredAnswers.length; i += 1) {
      const aux = (allAnswers.length > 1) ? Math.round((Math.random() * allAnswers.length)) : 0;
      filteredAnswers.splice(i, 1, allAnswers.splice(aux - 1, 1)[0]);
    }
    this.setState({ results: filteredAnswers, answersArray: ['', '', '', ''] });
    toFormatAnswers(['', '', '', '']);
  }

  submitAnswer() {
    const {
      question: { correct_answer: correctAnswer },
      toFormatAnswers,
    } = this.props;
    const { results, answersArray } = this.state;
    const index = results.indexOf(correctAnswer);
    const formattedAnswers = {
      ...this.state,
      answersArray: answersArray.map((ele, i) => ((i === index) ? 'green' : 'red')),
    };
    toFormatAnswers(formattedAnswers);
  }

  render() {
    const { results } = this.state;
    const {
      question,
      answersClasses: { answersArray },
      question: { correct_answer: theCorrectAnswer },
      toStopTimer,
    } = this.props;

    const correctAnswer = question ? theCorrectAnswer : '';

    return (
      <div>
        {(Object.keys(results).length > 0)
          ? results.map((response, index) => (
            <button
              type="button"
              value={response}
              key={response}
              data-testid={(response !== correctAnswer) ? `wrong-answer-${index}` : 'correct-awnser'}
              className={answersArray && answersArray[index]}
              ref={this.response}
              onClick={
                () => {
                  this.submitAnswer();
                  toStopTimer();
                }
              }
              disabled={answersArray && true}
            >
              <h3>{response}</h3>
            </button>
          ))
          : ''}
      </div>
    );
  }
}

const mapStateToProps = ({
  gameReducer: { answersClasses },
  timeReducer: { timer },
}) => ({
  timer,
  answersClasses,
});

const mapDispatchToProps = (dispatch) => ({
  toFormatAnswers: (answersClasses) => dispatch(formatAnswers(answersClasses)),
  toStopTimer: () => dispatch(stopTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);

Answers.propTypes = {
  question: PropTypes.instanceOf(Object),
  toFormatAnswers: PropTypes.func.isRequired,
  answersClasses: PropTypes.arrayOf(PropTypes.string),
  toStopTimer: PropTypes.func.isRequired,
};

Answers.defaultProps = {
  question: {},
  answersClasses: [],
};
