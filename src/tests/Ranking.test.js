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
import App from '../App';
import Ranking from '../pages/Ranking';
import rootReducer from '../reducers/rootReducer';

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
  { initialState, store = createStore(rootReducer(), initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
afterEach(cleanup);

describe('Ranking page tests', () => {
  it.skip('Page is on localhost/ranking url', () => {
    const { history } = renderWithRouter(
      <MemoryRouter initialEntries={['/ranking']}>
        <App />
      </MemoryRouter>,
    );
    const rankingHeader = getByText(/Ranking/g);
    expect(history.pathname.location).toBe('/ranking');
    expect(rankingHeader).toBeInTheDocument();
    expect(rankingHeader.tagName).toBe('H1');
  });

  it('Page contains an ordered list', () => {
    const { container } = renderWithRouter(
      <Ranking />,
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
  });
});
