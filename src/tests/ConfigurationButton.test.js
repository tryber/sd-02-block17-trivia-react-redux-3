import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import rootReducer from '../reducers/rootReducer';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

afterEach(cleanup);

function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

describe('testing Configuration page', () => {
  it('testing if there is a configuration button with data-testid=`config-button`', () => {
    const { getByTestId } = renderWithRedux(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(getByTestId('config-button')).toBeInTheDocument();
  });

  it('testing if the page is redirect to the path /configuration when click the button', () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByTestId('config-button'));
    expect(history.location.pathname).toBe('/configuration')
  });
});