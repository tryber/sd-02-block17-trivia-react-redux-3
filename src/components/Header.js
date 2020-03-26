import React from 'react';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

const Header = ({ name, email, scoreboard }) => (
  <div>
    <img
      src={`https://www.gravatar.com/avatar/${MD5(email).toString()}`}
      alt="Gravatar profile"
    />
    <h1 data-testid="header-player-name">{`Jogador: ${name}`}</h1>
    <h2 data-testid="header-score">{`Pontos: ${scoreboard}`}</h2>
  </div>
);

const mapStateToProps = ({ gameReducer: { name, email, scoreboard } }) => (
  { name, email, scoreboard }
);

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  scoreboard: PropTypes.number,
};

Header.defaultProps = {
  scoreboard: 0,
};
