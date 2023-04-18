import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { renderWithTheme } from '../utils';

import HeaderGoBack from '../../components/HeaderGoBack';

describe('Header with "go back" button', () => {
  test('renders a button', () => {
    const mockOnClick = jest.fn();

    renderWithTheme(<HeaderGoBack onClick={mockOnClick} />);

    const button = screen.getByRole('button');

    expect(button).toBeVisible();
  });

  test('has a correct aria-label on button', () => {
    const mockOnClick = jest.fn();

    renderWithTheme(<HeaderGoBack onClick={mockOnClick} />);

    const button = screen.getByRole('button');

    expect(button).toHaveAccessibleName('Return to previous page');
  });

  test('calls onClick', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    renderWithTheme(<HeaderGoBack onClick={mockOnClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(mockOnClick).toBeCalledTimes(1);
  });

  test('renders button correctly as link', () => {
    renderWithTheme(<HeaderGoBack href='/invest' />);

    const button = screen.getByRole('link');

    expect(button).toHaveAttribute('href', '/invest');
  });

  test('renders correctly', () => {
    const tree = renderer
        .create(<HeaderGoBack onClick={() => {}} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as link', () => {
    const tree = renderer
        .create(<HeaderGoBack href='/invest' />)
        .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
