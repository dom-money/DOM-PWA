import { Meta, StoryObj } from '@storybook/react';

import YieldDisplay from '../../components/YieldDisplay';

export default {
  title: 'Components/Yield Display',
  component: YieldDisplay,
  argTypes: {
    averageAPY: {
      if: { arg: 'type', eq: 'long' },
    },
    className: {
      table: { disable: true },
    },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as Meta<typeof YieldDisplay>;

type Story = StoryObj<typeof YieldDisplay>;

export const Short: Story = {
  args: {
    type: 'short',
    yieldValue: 275,
    yieldValuePercentage: 1.1,
  },
};

export const Long: Story = {
  args: {
    type: 'long',
    yieldValue: 600,
    yieldValuePercentage: 0.1,
    averageAPY: 13,
  },
};
