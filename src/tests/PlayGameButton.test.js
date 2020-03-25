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
import getToken, { INITIAL_STATE } from '../reducers/getToken';
const reducer = { getToken: INITIAL_STATE, gameReducer: { namea: '', email: '', scoreboard: 0 } }
function renderWithRedux(
  ui,
  { store = createStore(getToken, reducer) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

afterEach(cleanup);

describe('testing play game button', () => {
  it('testing if there is a play game button with data-testid=`btn-play`', () => {
    const { getByTestId } = renderWithRedux(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByTestId('btn-play')).toBeInTheDocument();
    expect(getByTestId('btn-play').type).toEqual('button');
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
