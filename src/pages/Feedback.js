import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetTimer } from '../actions/TimerActions';
import { resetPoints } from '../actions/resetPoints';
import { resetAllFilters } from '../actions/noFilter';

class Feedback extends Component {
  render() {
    const { resetTimerNow, resetScore, resetFilter } = this.props;
    const state = JSON.parse(localStorage.getItem('state')) || { player: { assertions: '', score: '' } };
    const { assertions, score } = state.player;
    const answerTitle = assertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
    return (
      <div>
        <header>
          <Header />
        </header>
        <section>
          <h2 data-testid="feedback-text">
            {answerTitle}
          </h2>
          <h3 data-testid="feedback-total-question">{`Você acertou ${assertions || ''} questões!`}</h3>
          <h3 data-testid="feedback-total-score">{`Um total de ${score || ''} pontos`}</h3>
        </section>
        <section>
          <div>
            <Link to="/ranking">VER RANKING</Link>
          </div>
          <div>
            <Link to="/" onClick={() => { resetTimerNow(); resetScore(); resetFilter(); localStorage.removeItem('player'); }}>
              JOGAR NOVAMENTE
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  resetTimerNow: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetTimerNow: () => dispatch(resetTimer()),
  resetScore: () => dispatch(resetPoints()),
  resetFilter: () => dispatch(resetAllFilters()),
});

export default connect(null, mapDispatchToProps)(Feedback);
