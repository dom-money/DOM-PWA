import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme, simulateTypingInStatelessInput } from '../utils';

import AddressInput from '../../components/AddressInput';

describe('Address Input', () => {
  test('correctly renders a label ', () => {
    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
        />,
    );

    const label = screen.getByText('Enter Or Choose Address');

    expect(label).toBeInTheDocument();
    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(label).toHaveAttribute('for', 'default-address-input');
    expect(label).toBeVisible();
  });

  test('has a corect input ID', () => {
    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
        />,
    );

    const addressInput = screen.getByRole('textbox');

    expect(addressInput).toHaveAttribute('id', 'default-address-input');
  });

  test('has autofocus enabled', () => {
    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
        />,
    );

    const addressInput = screen.getByRole('textbox');

    expect(addressInput).toHaveFocus();
  });

  test('renders a correct mask', () => {
    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
        />,
    );

    const mask = screen.getByText('0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

    expect(mask).toBeVisible();
  });

  test('is initially empty', () => {
    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
        />,
    );

    const addressInput = screen.getByRole('textbox');

    expect(addressInput).toHaveValue('');
  });

  test('accepts a valid address', () => {
    const handleValueChange = jest.fn();

    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
          onValueChange={handleValueChange}
        />,
    );

    const addressInput = screen.getByRole('textbox');

    const testingAddress = '0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca';

    simulateTypingInStatelessInput(testingAddress, addressInput);

    expect(handleValueChange).toHaveBeenLastCalledWith(testingAddress);
    expect(handleValueChange).toBeCalledTimes(42);
  });

  test('does not accept an invalid address', () => {
    const handleValueChange = jest.fn();

    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
          onValueChange={handleValueChange}
        />,
    );

    const addressInput = screen.getByRole('textbox');

    const testingAddress = 'TKNykq1CqJRTm4YEwrRVpwN6DRVRfKbV8R';

    simulateTypingInStatelessInput(testingAddress, addressInput);

    expect(handleValueChange).not.toBeCalledWith(testingAddress),
    expect(handleValueChange).not.toBeCalled();
  });

  test('does not accept unsupported characters', () => {
    const handleValueChange = jest.fn();

    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
          onValueChange={handleValueChange}
        />,
    );

    const addressInput = screen.getByRole('textbox');

    simulateTypingInStatelessInput('abc', addressInput);

    // Only characters [0-9] and [a-f] are allowed after '0x'
    simulateTypingInStatelessInput('0xA2a9ca3d52BEFM', addressInput);

    expect(handleValueChange).toHaveBeenLastCalledWith('0xA2a9ca3d52BEF');
    expect(handleValueChange).toBeCalledTimes(15);
  });

  test('triggers "onFocus" callback correctly', async () => {
    const user = userEvent.setup();

    const handleInputFocus = jest.fn();

    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
          onFocus={handleInputFocus}
        />,
    );

    const addressInput = screen.getByRole('textbox');

    await user.click(addressInput);

    expect(addressInput).toHaveFocus();
    expect(handleInputFocus).toBeCalledTimes(1);
    expect(handleInputFocus).toBeCalledWith(undefined);
  });

  test(`calls the onFocus callback with prefill in case
    prefill is provided`, () => {
    const handleInputFocus = jest.fn();

    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
          prefill='0x'
          onFocus={handleInputFocus}
        />,
    );

    const addressInput = screen.getByRole('textbox');

    expect(addressInput).toHaveFocus();
    expect(handleInputFocus).toBeCalledTimes(1);
    expect(handleInputFocus).toBeCalledWith('0x');
  });

  test('is disabled with a "disabled" prop', () => {
    const handleValueChange = jest.fn();

    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
          onValueChange={handleValueChange}
          disabled
        />,
    );

    const addressInput = screen.getByRole('textbox');

    simulateTypingInStatelessInput('0x12345', addressInput);

    expect(addressInput).toBeDisabled();
    expect(handleValueChange).not.toBeCalled();
  });

  test('calls "getContactOnClick" when "Get Contact" button is pressed',
      async () => {
        const user = userEvent.setup();
        const handleGetContactClick = jest.fn();

        renderWithTheme(
            <AddressInput
              addressValue=''
              inputID='default-address-input'
              label='Enter Or Choose Address'
              getContactOnClick={handleGetContactClick}
            />,
        );

        const getContactButton = screen.getByRole('button', {
          name: 'Get Contact',
        },
        );

        await user.click(getContactButton);

        expect(handleGetContactClick).toBeCalledTimes(1);
      },
  );

  test('calls "scanQROnClick" when "Scan QR" button is pressed',
      async () => {
        const user = userEvent.setup();
        const handleScanQRClick = jest.fn();

        renderWithTheme(
            <AddressInput
              addressValue=''
              inputID='default-address-input'
              label='Enter Or Choose Address'
              scanQROnClick={handleScanQRClick}
            />,
        );

        const scanQRButton = screen.getByRole('button', { name: 'Scan QR' });

        await user.click(scanQRButton);

        expect(handleScanQRClick).toBeCalledTimes(1);
      },
  );

  test('has buttons disabled when input is disabled', async () => {
    const user = userEvent.setup();
    const handleGetContactClick = jest.fn();
    const handleScanQRClick = jest.fn();

    renderWithTheme(
        <AddressInput
          addressValue=''
          inputID='default-address-input'
          label='Enter Or Choose Address'
          getContactOnClick={handleGetContactClick}
          scanQROnClick={handleScanQRClick}
          disabled
        />,
    );

    const getContactButton = screen.getByRole('button', {
      name: 'Disabled "Get Contact" Button',
    });
    const scanQRButton = screen.getByRole('button', {
      name: 'Disabled "Scan QR" Button',
    });

    await user.click(getContactButton);
    await user.click(scanQRButton);

    expect(getContactButton).toBeDisabled();
    expect(handleGetContactClick).not.toBeCalled();
    expect(handleScanQRClick).not.toBeCalled();
  });
});
