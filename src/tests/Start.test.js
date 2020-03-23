import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import getToken, { INITIAL_STATE } from '../reducers/getToken';
import Start from '../pages/Start';

function renderWithRedux(
  ui,
  { store = createStore(getToken, INITIAL_STATE) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('Token is being retrieved successfully', () => {
  it('test is component is receiving the token in its store', async () => {
    const { store } = renderWithRedux(<Start />);
    const testToken = () => {
      const { token } = store.getState();
      return token;
    };
    await wait(() => expect(testToken()).not.toBeNull());
  });
});
