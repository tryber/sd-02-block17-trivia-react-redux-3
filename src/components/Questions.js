import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Answers from './Answers';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      currentCount: 5,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
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
    this.setState((state) => ({ questionNumber: state.questionNumber + 1, currentCount: 5 }));
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
};

const mapStateToProps = ({ getQuestions: { results } }) => ({ results });

export default connect(mapStateToProps)(Questions);
