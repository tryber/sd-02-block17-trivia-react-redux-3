import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import rootReducer from '../reducers/rootReducer';
import '@testing-library/jest-dom/extend-expect';
import Input from '../components/Input';

afterEach(cleanup);

function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('Test input', () => {
  it('Test input and label mail', () => {
    const { queryByTestId } = renderWithRedux(
      <MemoryRouter>
        <Input />
      </MemoryRouter>,
    );
    const inputMail = queryByTestId('input-gravatar-email');
    const labelMail = queryByTestId('label-gravatar-email');
    expect(inputMail).toBeInTheDocument();
    expect(inputMail.value).toBe('');
    expect(labelMail).toBeInTheDocument();
    expect(labelMail.tagName).toBe('LABEL');
    expect(labelMail.innerHTML).toBe('Email do gravatar:');
  });
  it('Test input and label name', () => {
    const { queryByTestId } = renderWithRedux(
      <MemoryRouter>
        <Input />
      </MemoryRouter>,
    );
    const inputName = queryByTestId('input-player-name');
    const labelName = queryByTestId('label-player-name');
    expect(inputName).toBeInTheDocument();
    expect(inputName.value).toBe('');
    expect(labelName).toBeInTheDocument();
    expect(labelName.tagName).toBe('LABEL');
    expect(labelName.innerHTML).toBe('Nome do Jogador:');
  });
});
