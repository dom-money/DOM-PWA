import React from 'react';
import { screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { renderWithTheme } from '../utils';
import theme from '../../styles/theme';

import Button from '../../components/Button';

describe('Button', () => {
  test('has correct primary style', () => {
    renderWithTheme(<Button label='Top Up' primary />);

    const button = screen.getByRole('button');

    expect(button).toHaveStyle(`background-color: ${theme.colors.primary}`);
  });

  test('displays correct text', () => {
    renderWithTheme(<Button label='Top Up' />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Top Up');
  });

  test('calls onClick', () => {
    const mockClickHandler = jest.fn();
    renderWithTheme(<Button label='Top Up' onClick={mockClickHandler} />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  test('renders correctly as disabled', () => {
    const mockClickHandler = jest.fn();
    renderWithTheme(
        <Button label='Send' disabled onClick={mockClickHandler} />,
    );

    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(button).toHaveAttribute('disabled');

    expect(mockClickHandler).not.toHaveBeenCalled();
  });

  test('renders correctly as a link', () => {
    renderWithTheme(<Button label='Top Up' asAnchor href='/' />);

    const button = screen.getByRole('link');

    expect(button).toHaveAttribute('href', '/');
  });

  test('renders correctly with "submit" type attribute', () => {
    renderWithTheme(<Button label='Top Up' type='submit' />);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'submit');
  });
});
