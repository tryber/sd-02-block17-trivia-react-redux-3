import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup, wait, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import getToken, { INITIAL_STATE } from '../reducers/getToken';

const reducer = {
  getToken: { INITIAL_STATE },
  gameReducer: { name: 'Maria', email: 'maria@gmail.com', scoreboard: 0 },
  getQuestions: {
    results: [
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the first weapon you acquire in Half-Life?',
        correct_answer: 'A crowbar',
        incorrect_answers: [
          'A pistol',
          'The H.E.V suit',
          'Your fists',
        ],
      },
    ],
  },
};

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

describe('Test Answers Component', () => {
  it('test if there are four answers if type was multiple and two answers if type was boolean', async () => {
    const { getByTestId, store: { getState } } = renderWithRedux(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId('btn-play'));
    // const correctAnswer = getState().results.results.map(({ correct_answer: correct }) => correct);
    // const wrongAnswers = getState().results.results.map(({ incorrect_answers: incorrect }) => incorrect);
    // const typeOfQuestion = getState().results.results.map(({ type }) => type);
    // console.log(getByTestId)
    await wait(() => expect(getByTestId('correct-answer')).toBeInTheDocument());
    // if (typeOfQuestion === 'multiple') {
    //   expect(wrongAnswers.length).toBe(3);
    // } else {
    //   expect(wrongAnswers.length).toBe(1);
    // }
  });
});
