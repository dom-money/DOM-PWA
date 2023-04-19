import { Meta, StoryObj } from '@storybook/react';

import TotalBalance from '../../components/TotalBalance';

export default {
  title: 'Components/Total Balance',
  component: TotalBalance,
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
  },
} as Meta<typeof TotalBalance>;

type Story = StoryObj<typeof TotalBalance>;

export const PositiveAmount: Story = {
  args: {
    amount: '45725.06',
  },
};

export const ZeroAmount: Story = {
  args: {
    amount: '0',
  },
};

export const AsAvailableBalance: Story = {
  args: {
    amount: '45725.06',
    asAvailableBalance: true,
  },
};

const loadingParameters = {
  controls: {
    exclude: [ 'amount' ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },

  parameters: loadingParameters,
};

export const LoadingAsAvailableBalance: Story = {
  args: {
    isLoading: true,
    asAvailableBalance: true,
  },

  parameters: loadingParameters,
};
