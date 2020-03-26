import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header';
import rootReducer from '../reducers/gameReducer';

function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

afterEach(cleanup);

describe.skip('Test render Game', () => {
  it('test render', () => {
    const { getByTestId } = renderWithRedux(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId('header-player-name')).toBeInTheDocument();
    expect(getByTestId('header-score')).toBeInTheDocument();
    expect(getByTestId('header-player-name').innerHTML).toBe('Jogador:');
    expect(getByTestId('header-score').innerHTML).toBe('Pontos:0');
  });
});
