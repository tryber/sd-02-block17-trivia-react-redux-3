import React from 'react';
import { Link } from 'react-router-dom';

const PlayGameButton = () => (
  <Link to="/game"><button type="button" data-testid="btn-play">Jogar!</button></Link>
);

export default PlayGameButton;
