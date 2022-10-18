import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../utils';

import AmountDisplay from '../../components/AmountDisplay';

describe('Amount Display', () => {
  test('renders correctly with default props', () => {
    renderWithTheme(<AmountDisplay amount='45725.06' />);

    const amountText = screen.getByRole('heading', { name: '45,725 . 06' });

    expect(amountText).toHaveStyle('font-size: 2.5rem');
  });

  test('has thousands separator by default', () => {
    renderWithTheme(<AmountDisplay amount='45725.06' />);

    const amountText = screen.getByRole('heading', { name: '45,725 . 06' });

    expect(amountText).toHaveTextContent('45,725.06');
  });

  test('renders max of 2 decimals by default', () => {
    renderWithTheme(<AmountDisplay amount='45725.06123' />);

    const amountText = screen.getByRole('heading', { name: '45,725 . 06' });

    expect(amountText).toHaveTextContent('45,725.06');
  });

  test('has correct font-size when rendered with size "medium"', () => {
    renderWithTheme(
        <AmountDisplay
          amount='45725.06'
          size='medium'
        />,
    );

    const amountText = screen.getByRole('heading', { name: '45,725 . 06' });

    expect(amountText).toHaveStyle('font-size: 3rem');
  });

  test('has correct font-size when rendered with size "small"', () => {
    renderWithTheme(
        <AmountDisplay
          amount='45725.06'
          size='small'
        />,
    );

    const amountText = screen.getByRole('heading', { name: '45,725 . 06' });

    expect(amountText).toHaveStyle('font-size: 2.5rem');
  });

  test('displays correct value, when amount is zero', () => {
    const { rerender } = renderWithTheme(<AmountDisplay amount='0' />);

    const amountText = screen.getByRole('heading', { name: '0' });

    expect(amountText).toHaveTextContent('0');

    rerender(<AmountDisplay amount='0.0' />);
    expect(amountText).toHaveTextContent('0');

    rerender(<AmountDisplay amount='0.' />);
    expect(amountText).toHaveTextContent('0');

    rerender(<AmountDisplay amount='0.00000' />);
    expect(amountText).toHaveTextContent('0');
  });

  test('has inactive styles with "inactive" prop', () => {
    renderWithTheme(<AmountDisplay amount='0' inactive />);

    const amountText = screen.getByRole('heading', { name: '0' });

    expect(amountText).toHaveTextContent('0');

    expect(amountText).toHaveStyle('opacity: 0.5');
  });

  test('correctly renders without thousands separator', () => {
    renderWithTheme(<AmountDisplay amount='45873.15' useGrouping={false} />);

    const amountText = screen.getByRole('heading', { name: '45873 . 15' });

    expect(amountText).toHaveTextContent('45873.15');
  });

  test('correctly renders without trailing zeros', () => {
    renderWithTheme(
        <AmountDisplay amount='45725.10' shouldAddTrailingZeros={false} />,
    );

    const amountText = screen.getByRole('heading', { name: '45,725 . 1' });

    expect(amountText).toHaveTextContent('45,725.1');
  });

  test('correctly renders with custom amount of max decimals', () => {
    const { rerender } = renderWithTheme(
        <AmountDisplay amount='45725.06' maxDecimals={6} />,
    );

    const amountText = screen.getByRole('heading', { name: '45,725 . 060000' });

    expect(amountText).toHaveTextContent('45,725.060000');

    // Without trailing zeros
    rerender(
        <AmountDisplay
          amount='45725.123456123'
          maxDecimals={6}
          shouldAddTrailingZeros={false}
        />,
    );

    expect(amountText).toHaveTextContent('45,725.123456');
  });

  test('correctly rounds decimal part', () => {
    // Rounding half up
    const { rerender } = renderWithTheme(<AmountDisplay amount='45725.065' />);

    const amountText = screen.getByRole('heading', { name: '45,725 . 07' });

    expect(amountText).toHaveTextContent('45,725.07');

    // Rounding half down
    rerender(<AmountDisplay amount='45725.064' />);

    expect(amountText).toHaveTextContent('45,725.06');
  });

  test('correctly renders "loading" state', () => {
    // Small size variant
    const { rerender } = renderWithTheme(<AmountDisplay isLoading />);

    const amountText = screen.getByTestId('skeleton');

    expect(amountText).toBeVisible();
    expect(amountText).toHaveClass('MuiSkeleton-root');
    expect(amountText).toHaveStyle('font-size: 2.5rem');

    // Medium size variant
    rerender(<AmountDisplay isLoading size='medium' />);

    expect(amountText).toBeVisible();
    expect(amountText).toHaveClass('MuiSkeleton-root');
    expect(amountText).toHaveStyle('font-size: 3rem');
  });
});
