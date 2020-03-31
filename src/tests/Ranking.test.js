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
import { LocalStorageMock } from '@react-mock/localstorage';
import Ranking from '../pages/Ranking';
import gameReducer, { INITIAL_STATE } from '../reducers/gameReducer';


function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}


function renderWithRedux(
  ui,
  { store = createStore(gameReducer, { gameReducer: { INITIAL_STATE } }) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

afterEach(cleanup);

describe('Ranking page tests', () => {
  it('Page is on localhost/ranking url', () => {
    const { history } = renderWithRedux(
      <MemoryRouter initialEntries={['/ranking']}>
        <Ranking />
      </MemoryRouter>,
    );
    const rankingHeader = getByText(/Ranking/g);
    expect(history.pathname.location).toBe('/ranking');
    expect(rankingHeader).toBeInTheDocument();
    expect(rankingHeader.tagName).toBe('H1');
  });

  it('Page contains an ordered list', () => {
    const { container } = renderWithRedux(
      <Ranking />,
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  it('All elements are sorted by score if there are items in the list', () => {
    const { container } = renderWithRedux(
      <Ranking />,
    );

    const localStorageRankingsTest = [
      { playerName: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 0, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
      { playerName: 'MATEUS TALLES LEMES MARTINS DE CARVALHO', score: 60, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
      { playerName: 'Mateus', score: 100, imageUrl: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3' },
    ];

    localStorage.setItem('ranking', JSON.stringify(localStorageRankingsTest));

    const allScores = container.querySelectorAll('.rank-score');
    [...allScores].reduce((prevRank, thisRank, index) => {
      // const actualScore = getByText(`${localStorageRankingsTest[index].score}`);
      // console.log(actualScore);
      console.log('previos score: ', prevRank, 'this score: ', thisRank.innerHTML);
      if (index === 0) return Number(thisRank.innerHTML);
      expect(Number(prevRank) >= Number(thisRank.innerHTML)).toBeTruthy();
      return Number(thisRank.innerHTML);
    }, 0);
  });
  it('If there are no elements added, string "Nenhum registro" is returned', () => {
    localStorage.clear();

    const { container } = renderWithRedux(
      <Ranking />,
    );

    const allRanks = container.querySelectorAll('li');
    expect(allRanks[0].innerHTML).toBe('Nenhum registro');
  });
});
