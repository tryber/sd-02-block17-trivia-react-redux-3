import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownDifficulty from '../components/DropdownDifficulty';
import difficultyreducer from '../reducers/difficultyreducer';

afterEach(cleanup);

function renderWithRedux(
  ui,
  { store = createStore(difficultyreducer, {
    difficultyreducer: {
      difficulty: ['easy', 'medium', 'hard'],
      difficultySelected: '',
    }
  }) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}
function renderWithRedux2(
  ui,
  { store = createStore(difficultyreducer, {
    difficultyreducer: {
      difficulty: ['easy', 'medium', 'hard'],
      difficultySelected: 'medium',
    }
  }) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}
describe('test dropdown', () => {
  it('test render dropdown', () => {
    const { getByTestId, container } = renderWithRedux(
      <MemoryRouter>
        <DropdownDifficulty />
      </MemoryRouter>
    );
    expect(getByTestId('question-difficulty-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-difficulty-dropdown').value).toBe('');
  })
  it('test value', () => {
    const { getByTestId } = renderWithRedux2(
      <MemoryRouter>
        <DropdownDifficulty />
      </MemoryRouter>
    );
    expect(getByTestId('question-difficulty-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-difficulty-dropdown').value).toBe("medium");
  });
});