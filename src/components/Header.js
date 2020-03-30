import React from 'react';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

export const compara = (state, score) => {
  if (state !== null) {
    if (state.player.score !== undefined) return state.player.score;
  } return score;
};

const Header = ({ score }) => {
  const state = JSON.parse(localStorage.getItem('state'));
  return (
    <div>
      <img
        src={`https://www.gravatar.com/avatar/${MD5((state !== null) ? state.player.gravatarEmail : '').toString()}`}
        alt="Gravatar profile"
        data-testid="header-profile-picture"
      />
      <h1 data-testid="header-player-name">{`Jogador: ${(state !== null) ? state.player.name : ''}`}</h1>
      <h2>
        Pontos:
        <span data-testid="header-score">{compara(state, score)}</span>
      </h2>
    </div>
  );
};

const mapStateToProps = ({ gameReducer: { score } }) => (
  { score }
);

export default connect(mapStateToProps)(Header);

Header.propTypes = {

  score: PropTypes.number,
};

Header.defaultProps = {
  score: 0,

};
