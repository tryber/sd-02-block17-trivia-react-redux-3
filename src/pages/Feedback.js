import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ConfigurationButton from '../components/ConfigurationButton';

class Feedback extends Component {
  render() {
    const { scoreboard, rightQuestions } = this.props;
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
            <Link to="/game">JOGAR NOVAMENTE</Link>
          </div>
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  scoreboard: PropTypes.number,
  rightQuestions: PropTypes.number,
};

Feedback.defaultProps = {
  scoreboard: 0,
  rightQuestions: 0,
};

const mapStateToProps = (
  { gameReducer: { scoreboard, rightQuestions } },
) => ({ scoreboard, rightQuestions });

export default connect(mapStateToProps)(Feedback);
