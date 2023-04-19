import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Wallet from '../../components/Wallet';

export default {
  title: 'Components/Wallet',
  component: Wallet,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    amount: {
      type: {
        name: 'string',
        required: true,
      },
    },
    isLoading: {
      table: {
        disable: true,
      },
    },
    scanQROnClick: {
      action: `'Scan QR' Icon Button Clicked`,
    },
  },
} as Meta<typeof Wallet>;

type Story = StoryObj<typeof Wallet>;

export const Closed: Story = {
  args: {
    amount: '20000.12',
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const scanQrButton = await canvas.getByRole('button', { name: 'Scan QR' });
    await userEvent.click(scanQrButton);

    await waitFor(() => expect(args.scanQROnClick).toBeCalledTimes(1));

    // Clicking away to lose focus
    await userEvent.click(canvasElement);
  },
};

export const Open: Story = {
  args: {
    amount: '20000.12',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const collapseButton = await canvas.getByRole('button', {
      name: 'Collapse Wallet Container',
    });
    await userEvent.click(collapseButton);

    // Clicking away to lose focus
    await userEvent.click(canvasElement);

    const topUpButton = await canvas.getByRole('link', { name: 'Top Up' });
    const sendButton = await canvas.getByRole('link', { name: 'Send' });

    await waitFor(() => expect(topUpButton).toBeVisible());
    await waitFor(() => expect(sendButton).toBeVisible());

    await waitFor(
        () => expect(topUpButton).toHaveAttribute('href', '/wallet-address'),
    );

    await waitFor(
        () => expect(sendButton).toHaveAttribute('href', '/send-to-wallet'),
    );
  },
};

export const Inactive: Story = {
  args: {
    amount: '0',
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const scanQrButton = await canvas.getByRole('button', { name: 'Scan QR' });

    await waitFor(() => expect(scanQrButton).toBeDisabled());

    await userEvent.click(scanQrButton);

    await waitFor(() => expect(args.scanQROnClick).not.toBeCalled());
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },

  parameters: {
    controls: {
      hideNoControlsWarning: true,
      exclude: [ 'amount', 'scanQROnClick' ],
    },
  },
};
