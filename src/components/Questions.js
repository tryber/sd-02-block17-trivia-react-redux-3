import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Answers from './Answers';
import { sendAnswer } from '../actions/sendAnswer';

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
    const { results, sendAnswers } = this.props;
    const { questionNumber, currentCount } = this.state;
    sendAnswers(results[currentCount])
    this.intervalId = setInterval(this.timer.bind(this), 1000);
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
    const { results, sendAnswers } = this.props;
    const { questionNumber, currentCount } = this.state;
    const currentQuestion = results.map(({ question }) => question);
    const currentCategory = results.map(({ category }) => category);
    return (
      <div>
        <div>
          <p>{currentCategory[questionNumber]}</p>
          <h3>{currentQuestion[questionNumber]}</h3>
        </div>
        <div>
          {`Tempo: ${currentCount}`}
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

Questions.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = ({ getQuestions: { results } }) => ({ results });

const mapDispatchToProps = (dispatch) => ({
  sendAnswers: (answers) => dispatch(sendAnswer(answers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
