import React from 'react';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

export const compara = (state, score) => {
  if (window.location.href.match('feedback')) {
    if (state.player.score !== undefined) return state.player.score;
  } return score;
};

const Header = ({ score }) => {
  const localStorageState = localStorage.getItem('state') !== null && JSON.parse(localStorage.getItem('state'));
  const { player: { name: playerName, gravatarEmail } } = localStorageState;
  const trimmedAndLowercasedMail = gravatarEmail.trim().toLocaleLowerCase();
  console.log(trimmedAndLowercasedMail);
  return (
    <div>
      <img
        src={`https://www.gravatar.com/avatar/${MD5(trimmedAndLowercasedMail)}`}
        alt="Gravatar profile"
        data-testid="header-profile-picture"
      />
      <h1 data-testid="header-player-name">{`Jogador: ${playerName}`}</h1>
      <h2>
        Pontos:
        <span data-testid="header-score">{compara(localStorageState, score)}</span>
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
