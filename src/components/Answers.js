import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classifyAnswers from '../actions/GameActions';
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
    const { correct_answer: correct, incorrect_answers: incorrect } = question;
    const allAnswers = [correct, ...incorrect];
    const filteredAnswers = (allAnswers.length > 2) ? ['', '', '', ''] : ['', ''];
    for (let i = 0; i < filteredAnswers.length; i += 1) {
      const aux = (allAnswers.length > 1) ? Math.round((Math.random() * allAnswers.length)) : 0;
      filteredAnswers.splice(i, 1, allAnswers.splice(aux - 1, 1)[0]);
    }
    this.setState({ results: filteredAnswers, answersArray: ['', '', '', ''] });
  }

  submitAnswer() {
    const {
      question: { correct_answer: correctAnswer },
      toClassifyAnswers,
    } = this.props;
    const { results, answersArray } = this.state;
    const index = results.indexOf(correctAnswer);
    const classifiedAnswers = {
      ...this.state,
      answersArray: answersArray.map((ele, i) => ((i === index) ? 'green' : 'red')),
    };
    toClassifyAnswers(classifiedAnswers);
  }

  render() {
    const { results } = this.state;
    const {
      question,
      timer,
      classifiedAnswers: { answersArray },
      question: { correct_answer: theCorrectAnswer },
    } = this.props;

    const correctAnswer = question ? theCorrectAnswer : '';

    return (
      <div>
        {/* {timer === 0 && (() => this.submitAnswer())} */}
        {(Object.keys(results).length > 0)
          ? results.map((response, index) => (
            <button
              type="button"
              value={response}
              key={response}
              data-testid={(response !== correctAnswer) ? `wrong-answer-${index}` : 'correct-awnser'}
              className={answersArray ? answersArray[index] : ''}
              ref={this.response}
              onClick={this.submitAnswer}
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
  gameReducer: { classifiedAnswers },
  timeReducer: { timer },
}) => ({
  timer,
  classifiedAnswers,
});

const mapDispatchToProps = (dispatch) => ({
  toClassifyAnswers: (classifiedAnswers) => dispatch(classifyAnswers(classifiedAnswers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);

Answers.propTypes = {
  question: PropTypes.instanceOf(Object),
  timer: PropTypes.number.isRequired,
  toClassifyAnswers: PropTypes.func.isRequired,
  classifiedAnswers: PropTypes.arrayOf(PropTypes.string),
};

Answers.defaultProps = {
  question: {},
  classifiedAnswers: [],
};
