import React from 'react';
import { render } from '@testing-library/react';
import Input from '../components/Input';

describe('Test input', () => {
  it('Test input and label mail', () => {
    const { queryByTestId } = render(<Input />);
    const inputMail = queryByTestId('input-gravatar-email');
    const labelMail = queryByTestId('label-gravatar-email');
    expect(inputMail).toBeInTheDocument();
    expect(inputMail.value).toBe('');
    expect(labelMail).toBeInTheDocument();
    expect(labelMail.tagName).toBe('LABEL');
    expect(labelMail.innerHTML).toBe('Email do gravatar:');
  });
  it('Test input and label name', () => {
    const { queryByTestId } = render(<Input />);
    const inputName = queryByTestId('input-player-name');
    const labelName = queryByTestId('label-player-name');
    expect(inputName).toBeInTheDocument();
    expect(inputName.value).toBe('');
    expect(labelName).toBeInTheDocument();
    expect(labelName.tagName).toBe('LABEL');
    expect(labelName.innerHTML).toBe('Nome do Jogador:');
  });
});
