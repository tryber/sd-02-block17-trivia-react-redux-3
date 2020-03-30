import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetTimer } from '../actions/TimerActions';
import { resetPoints } from '../actions/resetPoints';
import { resetAllFilters } from '../actions/noFilter';

class Feedback extends Component {
  static redirectGame(resetTimerNow, resetScore, resetFilter) {
    resetTimerNow();
    resetScore();
    resetFilter();
  }

  componentDidMount() {
    const { name: playerName = '', gravatarEmail = '', score = '' } = this.props;
    const rankingOnLocalStorage = localStorage.getItem('ranking') ? localStorage.getItem('ranking') : null;
    const newRankingItem = JSON.stringify({ playerName, score, gravatarEmail });
    const newLadder = rankingOnLocalStorage !== null ? [
      ...JSON.parse(rankingOnLocalStorage).filter((rankItem) => rankItem !== newRankingItem),
      JSON.parse(newRankingItem),
    ] : [JSON.parse(newRankingItem)];
    const sortDesc = (a, b) => b.score - a.score;
    newLadder.sort(sortDesc);
    localStorage.setItem('ranking', JSON.stringify(newLadder));
  }

  render() {
    const { resetTimerNow, resetScore, resetFilter } = this.props;
    const state = (localStorage.getItem('state') !== null) ? JSON.parse(localStorage.getItem('state')) : { player: { assertions: '', score: '' } };
    const { assertions, score } = state.player;
    const answerTitle = assertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
    return (
      <div>
        <header>
          <Header />
        </header>
        <section>
          <h2 data-testid="feedback-text">{answerTitle}</h2>
          <h3 data-testid="feedback-total-question">{`Você acertou ${assertions || 0} questões!`}</h3>
          <h3 data-testid="feedback-total-score">{`Um total de ${score || 0} pontos`}</h3>
        </section>
        <section>
          <div>
            <Link to="/ranking">VER RANKING</Link>
          </div>
          <div>
            <Link
              to="/"
              onClick={() => { Feedback.redirectGame(resetTimerNow, resetScore, resetFilter); }}
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
  resetTimerNow: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetTimerNow: () => dispatch(resetTimer()),
  resetScore: () => dispatch(resetPoints()),
  resetFilter: () => dispatch(resetAllFilters()),
});

const mapStateToProps = ({ gameReducer: { name, gravatarEmail, score } }) => ({
  name, gravatarEmail, score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
