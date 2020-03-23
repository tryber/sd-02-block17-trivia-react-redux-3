import React from 'react';
import { Link } from 'react-router-dom';

const PlayGameButton = () => (
  <Link to="/game"><button type="button" data-testid="config-button">Jogar!</button></Link>
);

export default PlayGameButton;
