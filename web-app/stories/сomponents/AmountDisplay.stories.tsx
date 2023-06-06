import { Meta, StoryObj } from '@storybook/react';

import AmountDisplay from '../../components/AmountDisplay';

export default {
  title: 'Components/Amount Display',
  component: AmountDisplay,
  argTypes: {
    isLoading: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof AmountDisplay>;

type Story = StoryObj<typeof AmountDisplay>;

export const PositiveAmountMedium: Story = {
  args: {
    amount: '45725.06',
    size: 'medium',
  },
};

export const PositiveAmountSmall: Story = {
  args: {
    amount: '20000.12',
    size: 'small',
  },

  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
};

export const ZeroAmount: Story = {
  args: {
    amount: '0',
    size: 'medium',
  },
};

export const Inactive: Story = {
  args: {
    amount: '0',
    size: 'small',
    inactive: true,
  },

  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
};

export const WithoutGrouping: Story = {
  args: {
    amount: '45725.06',
    size: 'medium',
    useGrouping: false,
  },
};

export const WithoutTrailingZeros: Story = {
  args: {
    amount: '45725.10',
    size: 'medium',
    maxDecimals: 2,
    shouldAddTrailingZeros: false,
  },
};

export const WithSixDecimals: Story = {
  args: {
    amount: '45725.06',
    size: 'medium',
    maxDecimals: 6,
    shouldAddTrailingZeros: true,
  },
};

const loadingParameters = {
  controls: {
    exclude: [
      'amount',
      'inactive',
      'useGrouping',
      'maxDecimals',
      'shouldAddTrailingZeros',
    ],
  },
};

export const LoadingMedium: Story = {
  args: {
    isLoading: true,
    size: 'medium',
  },

  parameters: loadingParameters,
};

export const LoadingSmall: Story = {
  args: {
    isLoading: true,
    size: 'small',
  },

  parameters: loadingParameters,
};
