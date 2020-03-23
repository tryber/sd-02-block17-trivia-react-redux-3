import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import store from '../store';
import App from '../App';
import { Provider } from 'react-redux';

afterEach(cleanup);

describe('testing play game button', () => {
  it('testing if there is a play game button with data-testid=`btn-play`', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(getByTestId('btn-play')).toBeInTheDocument();
    expect(getByTestId('btn-play').type).toEqual('button');
  });

  it('testing if the page is redirect to the path game when click the button', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    fireEvent.click(getByTestId('btn-play'));
    expect(history.location.pathname).toBe('/game')
  });
});
