import React from 'react';
import { createStore } from 'redux';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  cleanup,
  wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import Ranking from '../pages/Ranking';
import App from '../App';
import gameReducer from '../reducers/gameReducer';

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
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store = createStore(gameReducer, initialState),
  } = {},
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          {ui}
        </Router>
      </Provider>,
    ),
    store,
    history,
  };
}

afterEach(cleanup);

describe('Ranking page tests', () => {
  it('Page is on localhost/ranking url', () => {
    const { getByText } = renderWithRedux(
      <MemoryRouter initialEntries={['/ranking']}>
        <App />
      </MemoryRouter>, {
        initialState: {
          gameReducer: {
            ...testState,
            rankLadder: { name: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 0, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
          },
        },
      },
    );
    const rankingHeader = getByText(/Ranking/g);
    expect(rankingHeader).toBeInTheDocument();
    expect(rankingHeader.tagName).toBe('H1');
  });

  it('Page contains an ordered list', () => {
    const { container } = renderWithRedux(
      <Ranking />, {
        initialState: {
          gameReducer: {
            ...testState,
            rankedLadder: [{ name: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 0, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' }],
          },
        },
      },
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelector('li')).toBeInTheDocument();
  });

  it('All elements from localStorage are sorted by score inside Redux state', () => {
    const ranking = [
      { name: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 0, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
      { name: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 60, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
      { name: 'Mateus', score: 100, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
    ];

    localStorage.setItem('ranking', JSON.stringify(ranking));

    const { store } = renderWithRedux(
      <Ranking />, {
        initialState: {
          ...testState,
        },
      },
    );
    const { rankedLadder } = store.getState();

    rankedLadder.reduce((prevScore, { score }, index) => {
      if (index === 0) return Number(score);
      expect(Number(prevScore) >= Number(score)).toBeTruthy();
      return Number(score);
    }, 0);
  });

  it('If there are no elements added, string "Nenhum registro" is returned', async () => {
    localStorage.clear();

    const { getByText } = renderWithRedux(
      <Ranking />, {
        initialState: {
          gameReducer: {
            ...testState.gameReducer,
            rankedLadder: null,
          },
        },
      },
    );
    await wait(() => getByText('Nenhum registro'));
    expect(getByText('Nenhum registro')).toBeInTheDocument();
  });
});
