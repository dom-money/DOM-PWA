import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../utils';
import theme from '../../styles/theme';

import Dialog from '../../components/Dialog';

const SampleComponent = () =>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.colors.primary,
  }}>
    <p>Sample Content</p>
    <p>Filled with primary color</p>
  </div>;

describe('Dialog', () => {
  test('does not show a dialog with isOpen={false} prop', () => {
    renderWithTheme(
        <Dialog isOpen={false}>
          <SampleComponent />
        </Dialog>,
    );

    expect(screen.queryByText('Sample Content')).not.toBeInTheDocument();
  });

  test('shows a dialog with isOpen={true} prop', () => {
    renderWithTheme(
        <Dialog isOpen>
          <SampleComponent />
        </Dialog>,
    );

    const SampleContentText = screen.getByText('Sample Content');

    expect(SampleContentText).not.toBeVisible();
  });

  test('calls "onClose" callback when clicked outside of dialog', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    renderWithTheme(
        <Dialog isOpen onClose={handleClose}>
          <SampleComponent />
        </Dialog>,
    );

    const dialog = screen.getByTestId('dialog');

    await user.click(dialog);

    expect(handleClose).toBeCalled();
  });

  test('displays a padding between dialog and children', async () => {
    renderWithTheme(
        <Dialog isOpen padding='1.25rem'>
          <SampleComponent />
        </Dialog>,
    );

    const dialog = screen.getByTestId('dialog');

    expect(dialog).toHaveStyle('padding: 1.25rem');
  });
});
