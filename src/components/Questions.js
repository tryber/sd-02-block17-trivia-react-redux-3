import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Answers from './Answers';
import { changeScore } from '../actions/changeScore';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      currentCount: 30,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }

  componentDidUpdate(prevState) {
    const { questionNumber, currentCount } = this.state;
    const { changeUserScore, answer } = this.props;
    let score = [];
    if ((prevState.questionNumber !== questionNumber) && currentCount !== 0 && answer) {
      score = [...score, currentCount];
      changeUserScore(score);
    }
  }

  timer() {
    const { questionNumber, currentCount } = this.state;
    this.setState({ currentCount: currentCount - 1 });

    if (currentCount === 0 && questionNumber < 4) {
      this.nextQuestion();
    } if (currentCount === 1 && questionNumber === 4) {
      clearInterval(this.intervalId);
    }
  }

  nextQuestion() {
    this.setState((state) => ({ questionNumber: state.questionNumber + 1, currentCount: 30 }));
  }

  render() {
    const { results } = this.props;
    const { questionNumber, currentCount } = this.state;
    const currentQuestion = results.map(({ question }) => question);
    const currentCategory = results.map(({ category }) => category);
    return (
      <div>
        <div>
          <p>{currentCategory[questionNumber]}</p>
          <h3>{currentQuestion[questionNumber]}</h3>
          {/* <p>{this.counter()}</p> */}
        </div>
        <div>
          {`Tempo: ${currentCount}`}
        </div>
        <div>
          <Answers question={results[questionNumber]} />
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

Questions.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  changeUserScore: PropTypes.func.isRequired,
  answer: PropTypes.bool,
};

Questions.defaultProps = {
  answer: false,
};

const mapStateToProps = (
  { getQuestions: { results }, gameReducer: { answer } },
) => (
  { results, answer }
);

const mapDispatchToProps = (dispatch) => ({
  changeUserScore: (score) => dispatch(changeScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
