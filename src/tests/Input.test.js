import React from 'react';
<<<<<<< HEAD
import Input from '../components/Input';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render , cleanup } from '@testing-library/react';
import rootReducer from '../reducers/rootReducer';
import '@testing-library/jest-dom/extend-expect';
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

describe('Test input', () => {
  it('Test input and label mail', () => {
    const { queryByTestId } = renderWithRedux(
      <MemoryRouter>
        <Input />
      </MemoryRouter>,
    );
=======
import { render } from '@testing-library/react';
import Input from '../components/Input';

describe('Test input', () => {
  it('Test input and label mail', () => {
    const { queryByTestId } = render(<Input />);
>>>>>>> master
    const inputMail = queryByTestId('input-gravatar-email');
    const labelMail = queryByTestId('label-gravatar-email');
    expect(inputMail).toBeInTheDocument();
    expect(inputMail.value).toBe('');
    expect(labelMail).toBeInTheDocument();
    expect(labelMail.tagName).toBe('LABEL');
    expect(labelMail.innerHTML).toBe('Email do gravatar:');
  });
  it('Test input and label name', () => {
<<<<<<< HEAD
    const { queryByTestId } = renderWithRedux(
      <MemoryRouter>
        <Input />
      </MemoryRouter>,
    );
=======
    const { queryByTestId } = render(<Input />);
>>>>>>> master
    const inputName = queryByTestId('input-player-name');
    const labelName = queryByTestId('label-player-name');
    expect(inputName).toBeInTheDocument();
    expect(inputName.value).toBe('');
    expect(labelName).toBeInTheDocument();
    expect(labelName.tagName).toBe('LABEL');
    expect(labelName.innerHTML).toBe('Nome do Jogador:');
  });
});
