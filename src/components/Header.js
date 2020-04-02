import React from 'react';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

export const compara = (state, score) => {
  if (window.location.href.match('feedback')) {
    if (state.player.score !== undefined) return state.player.score;
  } return score;
};

const Header = ({ score, player: { name, gravatarEmail }, player }) => {
  const trimmedAndLowercasedMail = gravatarEmail.trim().toLocaleLowerCase();
  return (
    <div>
      <img
        src={`https://www.gravatar.com/avatar/${MD5(trimmedAndLowercasedMail)}`}
        alt="Gravatar profile"
        data-testid="header-profile-picture"
      />
      <h1 data-testid="header-player-name">{`Jogador: ${name}`}</h1>
      <h2>
        Pontos:
        <span data-testid="header-score">{compara({ player }, score)}</span>
      </h2>
    </div>
  );
};

const mapStateToProps = ({ gameReducer: { score, name, gravatarEmail } }) => (
  { score, player: { name, gravatarEmail } }
);


export default connect(mapStateToProps)(Header);

Header.propTypes = {
  score: PropTypes.number,
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }),
};

Header.defaultProps = {
  score: 0,
  player: {
    name: '',
    gravatarEmail: '',
  },
};
