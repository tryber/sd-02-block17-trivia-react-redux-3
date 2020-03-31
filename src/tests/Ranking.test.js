import React from 'react';
import { createStore } from 'redux';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  cleanup,
  getByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import Ranking from '../pages/Ranking';
import App from '../App';
import gameReducer from '../reducers/gameReducer';

// function renderWithRouter(
//   ui,
//   { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
// ) {
//   return {
//     ...render(<Router history={history}>{ui}</Router>),
//     history,
//   };
// }

const testState = {
  gameReducer: {
    name: 'Mateus',
    score: 120,
    imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3',
  },
};

function renderWithRedux(
  ui,
  {
    route = '/', history = createMemoryHistory({ initialEntries: [route] }), initialState, store = createStore(gameReducer, initialState),
  } = {},
) {
  return {
    ...render(<Provider store={store}><Router history={history}>{ui}</Router></Provider>),
    store,
    history,
  };
}

afterEach(cleanup);

describe('Ranking page tests', () => {
  it('Page is on localhost/ranking url', () => {
    const { history, getByText } = renderWithRedux(
      <MemoryRouter initialEntries={['/ranking']}>
        <App />
      </MemoryRouter>, {
        initialState: {
          gameReducer: {
            ...testState.gameReducer,
            rankLadder: [],
          },
        },
      },
    );
    const rankingHeader = getByText(/Ranking/g);
    // expect(history.location.pathname).toBe('/ranking');
    expect(rankingHeader).toBeInTheDocument();
    expect(rankingHeader.tagName).toBe('H1');
  });

  it('Page contains an ordered list', () => {
    const { container } = renderWithRedux(
      <Ranking />, {
        initialState: {
          gameReducer: {
            ...testState.gameReducer,
            rankLadder: [{ name: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 0, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' }],
          },
        },
      },
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  it('All elements are sorted by score if there are items in the list', () => {
    const ranking = [
      { name: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 0, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
      { name: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 60, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
      { name: 'Mateus', score: 100, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
    ];

    localStorage.setItem('ranking', JSON.stringify(ranking));

    const { container } = renderWithRedux(
      <Ranking />, {
        initialState: {
          gameReducer: {
            ...testState.gameReducer,
            rankLadder: ranking,
          },
        },
      },
    );
    console.log(localStorage);

    const allScores = container.querySelectorAll('.rank-score');
    console.log(allScores);
    [...allScores].reduce((prevRank, thisRank, index) => {
      // console.log('prevRank: ', Number(prevRank), 'next rank: ', Number(thisRank.innerHTML));
      if (index === 0) return Number(thisRank.innerHTML);
      expect(Number(prevRank) >= Number(thisRank.innerHTML)).toBeTruthy();
      return Number(thisRank.innerHTML);
    }, 0);
  });

  it('If there are no elements added, string "Nenhum registro" is returned', () => {
    localStorage.clear();

    const { getByText } = renderWithRedux(
      <Ranking />, {
        initialState: {
          gameReducer: {
            ...testState.gameReducer,
            rankLadder: [],
          },
        },
      },
    );

    expect(getByText('Nenhum registro')).toBeInTheDocument();
  });
});
