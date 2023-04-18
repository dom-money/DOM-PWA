import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../utils';
import { QrReader } from 'react-qr-reader';

import AddressQRReader from '../../components/AddressQRReader';

jest.mock('react-qr-reader', () => ({
  QrReader: jest.fn(),
}));

const mockQrReader = QrReader as jest.Mock;

interface DialogWithMockedMethods extends HTMLDialogElement {
  showModal: ReturnType<typeof jest.fn>
};

const testAddress = {
  valid: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  invalid: 'TKNykq1CqJRTm4YEwrRVpwN6DRVRfKbV8R',
};

describe('Address QR Reader', () => {
  test('opens a dialog with "isOpen" prop', () => {
    renderWithTheme(<AddressQRReader isOpen />);

    const dialog: DialogWithMockedMethods = screen.getByTestId('cameraDialog');

    expect(dialog.showModal).toBeCalled();

    // Clearing showModal mock for next test
    dialog.showModal.mockClear();
  });

  test('does not open a dialog with "isOpen={false}" prop', () => {
    renderWithTheme(<AddressQRReader isOpen={false} />);

    const dialog: DialogWithMockedMethods = screen.getByTestId('cameraDialog');

    expect(dialog.showModal).not.toBeCalled();
  });

  test('calls "onClose" callback when clicked outside of dialog', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    renderWithTheme(<AddressQRReader isOpen onClose={handleClose} />);

    const dialog = screen.getByTestId('cameraDialog');

    await user.click(dialog);

    expect(handleClose).toBeCalled();
  });

  test('calls "onResult" when valid address is scanned', () => {
    mockQrReader.mockImplementation(({ onResult }) => {
      onResult({ text: testAddress.valid });
      return <></>;
    });

    const handleResult = jest.fn();

    renderWithTheme(<AddressQRReader isOpen onResult={handleResult} />);

    expect(handleResult).toBeCalledWith(testAddress.valid);
  });

  test('does not call "onResult" when invalid address is scanned', () => {
    mockQrReader.mockImplementation(({ onResult }) => {
      onResult({ text: testAddress.invalid });
      return <></>;
    });

    const handleResult = jest.fn();

    renderWithTheme(<AddressQRReader isOpen onResult={handleResult} />);

    expect(handleResult).not.toBeCalled();
  });
});
