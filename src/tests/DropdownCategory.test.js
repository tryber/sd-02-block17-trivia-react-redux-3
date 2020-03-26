import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownCategory from '../components/DropdownCategory';
import categoryReducer from '../reducers/categoryReducer';

afterEach(cleanup);

function renderWithRedux(
  ui,
  { store = createStore(categoryReducer, {
    categoryReducer: {
      category: [],
      Cselected: { id: '', name: '' },
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
  { store = createStore(categoryReducer, {
    categoryReducer: {
      category: [{ id: 9,name: 'blabla' }],
      Cselected: { id: 9, name: 'aaaa' },
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
    const { getByTestId } = renderWithRedux(
      <MemoryRouter>
        <DropdownCategory />
      </MemoryRouter>
    );
    expect(getByTestId('question-category-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-category-dropdown').value).toBe('');
  })
  it('test value', () => {
    const { getByTestId } = renderWithRedux2(
      <MemoryRouter>
        <DropdownCategory />
      </MemoryRouter>
    );
    expect(getByTestId('question-category-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-category-dropdown').value).toBe("9");
  });
});