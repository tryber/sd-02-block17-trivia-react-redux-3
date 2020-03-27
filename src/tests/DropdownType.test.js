import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownType from '../components/DropdownType';
import typeReducer from '../reducers/typeReducer';

afterEach(cleanup);

function renderWithRedux(
  ui,
  { store = createStore(typeReducer, {
    typeReducer: {
      types: ['multiple', 'boolean'],
      typeSelected: '',
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
  { store = createStore(typeReducer, {
    typeReducer: {
      types: ['multiple', 'boolean'],
      typeSelected: 'boolean',
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
        <DropdownType />
      </MemoryRouter>
    );
    expect(getByTestId('question-type-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-type-dropdown').value).toBe('');
  })
  it('test value', () => {
    const { getByTestId } = renderWithRedux2(
      <MemoryRouter>
        <DropdownType />
      </MemoryRouter>
    );
    expect(getByTestId('question-type-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-type-dropdown').value).toBe("boolean");
  });
});