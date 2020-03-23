import React from 'react';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';

const Header = ({ name, email, scoreboard }) => (
  <div>
    <img
      src={`https://www.gravatar.com/avatar/${MD5(email).toString()}`}
      alt="Gravatar profile"
    />
    <h1>{name}</h1>
    <h2>Placar:{scoreboard || 0}</h2>
  </div>
);

const mapStateToProps = ({ gameReducer: { name, email, scoreboard } }) => ({ name, email, scoreboard });

export default connect(mapStateToProps)(Header);
