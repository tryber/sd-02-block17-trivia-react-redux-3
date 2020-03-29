import React from 'react';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  cleanup,
  wait,
  fireEvent,
  waitForElement,
  waitForDomChange,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import Questions from '../components/Questions';
import gameReducer from '../reducers/gameReducer';
import Game from '../pages/Game';

const initialState = {
  getQuestions: {
    results: [],
  },
  gameReducer: {
    name: 'name',
    email: 'email',
    timer: 30,
    scoreboard: 0,
    lastQuestionStatus: 'correct',
  },
  timeReducer: { timer: 30, stopTimer: 0 },
  getToken: { token: '' },
  categoryReducer: { categorySelected: '' },
  difficultyreducer: { difficultySelected: '' },
  typeReducer: { typeSelected: '' },
};

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

describe('Testing for Questions page', () => {
  it('Time should show and when time gets to 0, wrong message should appear', async () => {
    const { store: { getState } } = renderWithRedux(
      <MemoryRouter>
        <Questions />
      </MemoryRouter>,
    );
    await wait(() => expect(getState().timeReducer.timer).toBe(30));
  });
  it('', async () => {
    const { getByTestId } = renderWithRedux(
      <MemoryRouter>
        <Game />
      </MemoryRouter>,
    );
    await waitForDomChange(() => getByTestId('correct-answer'));
    expect(getByTestId('btn-next')).toBeInTheDocument();
  });
});
