import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ConfigurationButton from '../components/ConfigurationButton';
import { resetTimer } from '../actions/TimerActions';
import { resetPoints } from '../actions/resetPoints';

class Feedback extends Component {
  render() {
    const { scoreboard, rightQuestions, resetTimerNow, resetScore } = this.props;
    return (
      <div>
        <header>
          <Header />
          <ConfigurationButton />
        </header>
        <section>
          <h2 data-testid="feedback-text">
            {
              rightQuestions < 3
                ? 'Podia ser melhor...'
                : 'Mandou bem!'
            }
          </h2>
          <h3 data-testid="feedback-total-question">{`Você acertou ${rightQuestions} questões!`}</h3>
          <h3 data-testid="feedback-total-score">{`Um total de ${scoreboard} pontos`}</h3>
        </section>
        <section>
          <div>
            <Link to="/ranking">VER RANKING</Link>
          </div>
          <div>
            <Link
              to="/"
              onClick={() => {
                resetTimerNow();
                resetScore();
              }}
            >
              JOGAR NOVAMENTE
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  scoreboard: PropTypes.number,
  rightQuestions: PropTypes.number,
  resetTimerNow: PropTypes.func.isRequired,
};

Feedback.defaultProps = {
  scoreboard: 0,
  rightQuestions: 0,
};

const mapStateToProps = (
  { gameReducer: { scoreboard, rightQuestions } },
) => ({ scoreboard, rightQuestions });

const mapDispatchToProps = (dispatch) => ({
  resetTimerNow: () => dispatch(resetTimer()),
  resetScore: () => dispatch(resetPoints()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
