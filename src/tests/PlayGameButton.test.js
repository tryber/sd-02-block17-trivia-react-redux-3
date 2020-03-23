import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PlayGameButton from '../components/PlayGameButton';

afterEach(cleanup);

describe('testing play game button', () => {
  it('testing if there is a play game button with data-testid=`config-button`', () => {
    const { getByTestId } = render(
      <PlayGameButton />
    );

    expect(getByTestId('config-button')).toBeInTheDocument();
    expect(getByTestId('config-button').type).toEqual('button');
  });

  it('testing if the page is redirect to the path game when click the button', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <PlayGameButton />
      </Router>,
    );
    fireEvent.click(getByTestId('config-button'));
    await waitForDomChange(() => expect(history.location.pathname).toBe('/game'))
  });
});
