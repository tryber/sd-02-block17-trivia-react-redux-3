import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
  ; import Header from '../components/Header';
import ConfigurationButton from '../components/ConfigurationButton';

class Feedback extends Component {
  render() {
    const { scoreboard } = this.props;
    return (
      <div>
        <header>
          <Header />
          <ConfigurationButton />
        </header>
        <section>
          <h2 data-testid="feedback-text">
            {
              scoreboard.length < 3
                ? 'Podia ser melhor...'
                : 'Mandou bem!'
            }
          </h2>
          <h3>{`Você acertou ${scoreboard.length} questões!`}</h3>
          <h3>{`Um total de ${scoreboard.reduce((acc, cur) => acc + cur, 0)} pontos`}</h3>
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
  scoreboard: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = ({ gameReducer: { scoreboard } }) => ({ scoreboard });

export default connect(mapStateToProps)(Feedback);
