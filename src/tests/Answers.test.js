import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Answers from '../components/Answers';
import getQuestions, { INITIAL_STATE } from '../reducers/getQuestions';

const reducer = { getQuestions: INITIAL_STATE, results: { results: [] } };

function renderWithRedux(
  ui,
  { store = createStore(getQuestions, reducer) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

afterEach(cleanup);

describe('Test Answers Component', () => {
  it('test if there are four answers if type was multiple and two answers if type was boolean', () => {
    const responseAPIMock = {
      "response_code": 0,
      "results": [
        {
          "category": "Entertainment: Video Games",
          "type": "multiple",
          "difficulty": "easy",
          "question": "What is the first weapon you acquire in Half-Life?",
          "correct_answer": "A crowbar",
          "incorrect_answers": [
            "A pistol",
            "The H.E.V suit",
            "Your fists"
          ]
        }
      ]
    };
    const resultsMock = responseAPIMock.results.map((result) => result);
    const { getByText, store: { getState } } = renderWithRedux(
      <MemoryRouter>
        <Answers question={resultsMock.question} />
      </MemoryRouter>,
    );

    const correctAnswer = getState().getQuestions.results.map(({ correct_answer: correct }) => correct);
    const wrongAnswers = getState().getQuestions.results.map(({ incorrect_answers: incorrect }) => incorrect);
    const typeOfQuestion = getState().getQuestions.results.map(({ type }) => type);
    console.log(getState())
    expect(getByText(correctAnswer)).toBeInTheDocument();
    if (typeOfQuestion === 'multiple') {
      expect(wrongAnswers.length).toBe(3);
    } else {
      expect(wrongAnswers.length).toBe(1);
    }
  });
});
