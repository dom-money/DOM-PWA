import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../utils';

import Title from '../../components/Title';

describe('Title', () => {
  test('displays correct text', () => {
    renderWithTheme(<Title text='Wallet' />);

    const title = screen.getByRole('heading');

    expect(title).toHaveTextContent('Wallet');
  });

  test('is visible', () => {
    renderWithTheme(<Title text='Wallet' />);

    const title = screen.getByRole('heading');

    expect(title).toBeVisible();
  });

  test('renders as paragraph', () => {
    renderWithTheme(<Title text='Wallet' as='p' />);

    const paragraph = screen.getByText('Wallet');

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toBeInstanceOf(HTMLParagraphElement);
  });

  test('renders as a label', () => {
    renderWithTheme(<Title as='label' text='Input' inputID='test-input' />);

    const label = screen.getByText('Input');

    expect(label).toBeInTheDocument();
    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(label).toHaveAttribute('for', 'test-input');
  });
});
