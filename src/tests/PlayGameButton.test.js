import React from 'react';
import { createStore } from 'redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import App from '../App';
import PlayGameButton from '../components/PlayGameButton';
import gameReducer, { INITIAL_STATE } from '../reducers/gameReducer';

function renderWithRedux(
  ui,
  { store = createStore(gameReducer, INITIAL_STATE) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

afterEach(cleanup);

describe.skip('testing play game button', () => {
  it('testing if there is a play game button with data-testid=`btn-play`', async () => {
    const { getByTestId } = renderWithRedux(
      <Router>
        <PlayGameButton />
      </Router>,
    );

    await wait(() => {
      expect(getByTestId('btn-play')).toBeInTheDocument();
      expect(getByTestId('btn-play').type).toEqual('button');
    });
  });

  it('testing if the page is redirect to the path game when click the button', () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByTestId('btn-play'));
    expect(history.location.pathname).toBe('/game');
  });

  it('test if the button activates getToken function and populates state', async () => {
    const { getByTestId, store: { getState } } = renderWithRedux(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByTestId('btn-play'));
    await wait(() => expect(getState().token).not.toBeNull());
  });
});
