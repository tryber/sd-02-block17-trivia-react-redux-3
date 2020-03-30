import React from 'react';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

const Header = ({ name, gravatarEmail, score }) => {
  const state = JSON.parse(localStorage.getItem('state'));
  return (
    <div>
      <img
        src={`https://www.gravatar.com/avatar/${MD5((gravatarEmail !== '') ? gravatarEmail : state.player.gravatarEmail).toString()}`}
        alt="Gravatar profile"
        data-testid="header-profile-picture"
      />
      <h1 data-testid="header-player-name">{`Jogador: ${(name !== '') ? name : state.player.name}`}</h1>
      <h2>
        Pontos:
        <span data-testid="header-score">{(score !== '') ? score : state.player.score}</span>
      </h2>
    </div>
  );
};

const mapStateToProps = ({ gameReducer: { name, gravatarEmail, score } }) => (
  { name, gravatarEmail, score }
);

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
};

Header.defaultProps = {
  score: 0,
  name: '',
  gravatarEmail: '',
};
