import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { wrongAnswer } from '../actions/ChangeScoreboard';
import { resetTimer } from '../actions/TimerActions';
import Answers from './Answers';
import Timer from './Timer';

function saveScore(player) {
  localStorage.setItem('state', JSON.stringify({ player }));
}

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidUpdate() {
    const { timer, wrongAnswerSelected } = this.props;
    return timer === 0 && wrongAnswerSelected();
  }

  nextQuestion() {
    const { resetTimerNow } = this.props;
    this.setState((state) => ({ questionNumber: state.questionNumber + 1 }));
    resetTimerNow();
  }


  render() {
    const {
      results, timer, name, assertions, score, gravatarEmail,
    } = this.props;
    const player = {
      name, assertions, score, gravatarEmail,
    };
    const { questionNumber } = this.state;
    const currentQuestion = results.map(({ question }) => decodeURIComponent(question));
    const currentCategory = results.map(({ category }) => decodeURIComponent(category));
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
          <Answers question={results[questionNumber]} />
        </div>
        <div>
          {
            questionNumber < 4
              ? <button type="button" data-testid="btn-next" onClick={this.nextQuestion}>PRÓXIMA</button>
              : <Link to="/feedback"><button data-testid="btn-next" onClick={() => saveScore(player)} type="button">FINALIZAR</button></Link>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  wrongAnswerSelected: () => dispatch(wrongAnswer()),
  resetTimerNow: () => dispatch(resetTimer()),
});

const mapStateToProps = ({
  getQuestions: { results },
  timeReducer: { timer },
  gameReducer: {
    name, assertions, score, gravatarEmail,
  },
}) => ({
  results, timer, name, assertions, score, gravatarEmail,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  resetTimerNow: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  timer: PropTypes.number.isRequired,
  wrongAnswerSelected: PropTypes.func.isRequired,
};
