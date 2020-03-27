import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Answers.css';
// import { registerAnswer } from '../actions/changeScore';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: {}, array: ['', '', '', ''] };
    this.answers = this.answers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (prevProps.question !== question) {
      this.answers(question);
    }
  }

  answers(element) {
    const { correct_answer: correct, incorrect_answers: incorrect } = element;
    const arr = [correct, ...incorrect];
    const arr2 = (arr.length > 2) ? ['', '', '', ''] : ['', ''];
    for (let i = 0; i < arr2.length; i += 1) {
      const aux = (arr.length > 1) ? Math.round((Math.random() * arr.length)) : 0;
      arr2[i] = arr.splice(aux - 1, 1)[0];
    }
    this.setState({ results: arr2, array: ['', '', '', ''] });
  }

  submitAnswer() {
    // const { value } = event.target;
    const { question: { correct_answer: correct } } = this.props;
    const { results } = this.state;
    const index = results.indexOf(correct);
    this.setState((state) => ({
      ...state,
      array: state.array.map((ele, i) => ((i === index) ? 'green' : 'red')),
    }));
    // if (value === correct) {
    //   registerTheAnswer(true);
    // } else {
    //   registerTheAnswer(false);
    // }
  }

  render() {
    const { results, array } = this.state;
    const { question } = this.props;
    let correct = '';
    if (question) {
      correct = question.correct_answer;
    }
    return (
      <div>
        {(Object.keys(results).length > 0)
          ? results.map((response, index) => (
            <button
              type="button"
              value={response}
              key={response}
              data-testid={(response !== correct) ? `wrong-answer-${index}` : 'correct-answer'}
              className={array[index]}
              ref={this.response}
              onClick={this.submitAnswer}
              disabled={(array[index]) ? true : !true}
            >
              {response}
            </button>
          ))
          : ''}
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   registerTheAnswer: (bool) => dispatch(registerAnswer(bool)),
// });

export default connect()(Answers);

Answers.propTypes = {
  question: PropTypes.instanceOf(Object),
  // registerTheAnswer: PropTypes.func.isRequired,
};

Answers.defaultProps = {
  question: {},
};
