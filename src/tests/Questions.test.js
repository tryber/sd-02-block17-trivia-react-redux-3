import React from 'react';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  cleanup,
  wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import Questions from '../components/Questions';
import gameReducer from '../reducers/gameReducer';

const initialState = {
  getQuestions: {
    results: [],
  },
  gameReducer: {
    name: 'name',
    email: 'email',
    timer: 6,
    scoreboard: 0,
    lastQuestionStatus: 'correct',
  },
};

console.log(initialState);


function renderWithRedux(
  ui,
  { store = createStore(gameReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
afterEach(cleanup);

describe.skip('Testing for Questions page', () => {
  it('Time should show and when time gets to 0, wrong message should appear', async () => {
    const { store, getByText } = renderWithRedux(
      <MemoryRouter>
        <Questions />
      </MemoryRouter>,
    );
    await wait(() => expect(store.getState().gameReducer.timer).toBe(2));
    expect(getByText('RESPOSTA ERRADA')).toBeInTheDocument();
  });
});
