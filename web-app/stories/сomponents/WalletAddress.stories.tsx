import { Meta, StoryObj } from '@storybook/react';

import WalletAddress from '../../components/WalletAddress';

export default {
  title: 'Components/Wallet Address',
  component: WalletAddress,
  argTypes: {
    isLoading: {
      table: {
        disable: true,
      },
    },
    address: {
      type: {
        name: 'string',
        required: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
  },
} as Meta<typeof WalletAddress>;

type Story = StoryObj<typeof WalletAddress>;

export const Default: Story = {
  args: {
    address: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },

  parameters: {
    controls: {
      hideNoControlsWarning: true,
      exclude: [ 'address' ],
    },
  },
};
