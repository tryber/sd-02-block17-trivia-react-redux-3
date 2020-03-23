import React from 'react';

const PlayGameButton = () => {
  return (
    <button type="button" data-testid="config-button" onClick={() => window.location.href = '/game'}>JOGAR!</button>
  );
}

export default PlayGameButton;
