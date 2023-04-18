import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../utils';
import theme from '../../styles/theme';

import AmountInput from '../../components/AmountInput';

describe('Amount Input', () => {
  test('correctly renders a label ', () => {
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
        />,
    );

    const label = screen.getByText('How much do you want to invest?');

    expect(label).toBeInTheDocument();
    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(label).toHaveAttribute('for', 'default-amount-input');
    expect(label).toBeVisible();
  });

  test('has a corect input ID', () => {
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
        />,
    );

    const amountInput = screen.getByRole('textbox');

    expect(amountInput).toHaveAttribute('id', 'default-amount-input');
  });

  test('displays value with thousand separator', () => {
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          amount='10000'
        />,
    );

    const amountInput = screen.getByRole('textbox');

    expect(amountInput).toHaveValue('10,000.00');
  });

  test('has fixed decimal scale', () => {
    const { rerender } = renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          amount='5'
        />,
    );

    const amountInput = screen.getByRole('textbox');

    expect(amountInput).toHaveValue('5.00');

    rerender(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          amount='100.1'
        />,
    );

    expect(amountInput).toHaveValue('100.10');
  });

  test('has autofocus enabled by default', () => {
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
        />,
    );

    const amountInput = screen.getByRole('textbox');

    expect(amountInput).toHaveFocus();
  });

  test('correctly works with custom "maxDecimals"', async () => {
    const user = userEvent.setup();

    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          maxDecimals={ 6 }
        />,
    );

    const amountInput = screen.getByRole('textbox');

    await user.type(amountInput, '1');

    expect(amountInput).toHaveValue('1.000000');
  });

  test('has a correct placeholder', () => {
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
        />,
    );

    const amountInput = screen.getByRole('textbox');

    expect(amountInput).toHaveAttribute('placeholder', '0');
  });

  test('has a decimal inputmode', () => {
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
        />,
    );

    const amountInput = screen.getByRole('textbox');

    expect(amountInput).toHaveAttribute('inputmode', 'decimal');
  });

  test('accepts "." and "," as separators', async () => {
    const user = userEvent.setup();
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
        />,
    );

    const amountInput = screen.getByRole('textbox');

    await user.type(amountInput, '100.12');

    expect(amountInput).toHaveValue('100.12');

    await user.clear(amountInput);
    await user.type(amountInput, '125,15');

    expect(amountInput).toHaveValue('125.15');
  });

  test('does not allow non-numeric characters', async () => {
    const user = userEvent.setup();
    const handleInputChange = jest.fn();

    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          onInputChange={ handleInputChange }
        />,
    );

    const amountInput = screen.getByRole('textbox');

    await user.type(amountInput, 'abcdf!@#$%^&*()-');

    expect(amountInput).toHaveValue('');
    expect(handleInputChange).not.toBeCalled();
  });

  test('correctly works without fixed decimal scale', async () => {
    const user = userEvent.setup();

    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          maxDecimals={ 6 }
          fixedDecimalScale={ false }
        />,
    );

    const amountInput = screen.getByRole('textbox');

    await user.type(amountInput, '1');

    expect(amountInput).toHaveValue('1');

    await user.clear(amountInput);
    await user.type(amountInput, '1.123');

    expect(amountInput).toHaveValue('1.123');
  });

  test('calls "onInputChange" Callback with correct values', async () => {
    const user = userEvent.setup();
    const handleInputChange = jest.fn();

    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          onInputChange={ handleInputChange }
        />,
    );

    const amountInput = screen.getByRole('textbox');

    await user.type(amountInput, '1451.12');

    expect(handleInputChange.mock.lastCall[ 0 ]).toEqual({
      floatValue: 1451.12,
      formattedValue: '1,451.12',
      value: '1451.12',
    });
    expect(handleInputChange).toBeCalledTimes(6);
  });

  test('correctly displays error message', async () => {
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          errorMessage='Not Enough Money'
        />,
    );

    const errorMessage = screen.getByText('Not Enough Money');

    expect(errorMessage).toBeInstanceOf(HTMLParagraphElement);
    expect(errorMessage).toHaveStyle(`background-color: ${theme.colors.error}`);
    expect(errorMessage).toBeVisible();
  });

  test('has no autofocus with "autoFocus={false}" prop', () => {
    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          autoFocus={ false }
        />,
    );

    const amountInput = screen.getByRole('textbox');

    expect(amountInput).not.toHaveFocus();
  });

  test('is disabled with a "disabled" prop', async () => {
    const user = userEvent.setup();
    const handleInputChange = jest.fn();

    renderWithTheme(
        <AmountInput
          label='How much do you want to invest?'
          inputID='default-amount-input'
          onInputChange={ handleInputChange }
          disabled
        />,
    );

    const amountInput = screen.getByRole('textbox');

    await user.type(amountInput, '12345.67');

    expect(amountInput).toBeDisabled();
    expect(handleInputChange).not.toBeCalled();
  });
});
