import { Meta, StoryObj } from '@storybook/react';

import AmountInput from '../../../components/AmountInput';

export default {
  title: 'Components/Inputs/Amount Input',
  component: AmountInput,
  argTypes: {
    onInputChange: {
      action: `'On Input Change' Callback Called`,
    },
  },
} as Meta<typeof AmountInput>;

type Story = StoryObj<typeof AmountInput>;

export const Default: Story = {
  args: {
    label: 'How much do you want to invest?',
    amount: '10000',
    inputID: 'default-amount-input',
  },
};

export const WithSixDecimals: Story = {
  args: {
    label: 'How much do you want to invest?',
    amount: '10000.759213',
    maxDecimals: 6,
    inputID: 'default-amount-input',
  },
};

export const WithoutFixedDecimalScale: Story = {
  args: {
    label: 'How much do you want to invest?',
    amount: '10000.759213',
    maxDecimals: 6,
    fixedDecimalScale: false,
    inputID: 'default-amount-input',
  },
};

export const Empty: Story = {
  args: {
    label: 'How much do you want to invest?',
    inputID: 'default-amount-input',
  },
};

export const WithError: Story = {
  args: {
    label: 'How much do you want to invest?',
    amount: '25000',
    inputID: 'default-amount-input',
    errorMessage: 'Not Enough Money',
  },
};

export const Disabled: Story = {
  args: {
    label: 'How much do you want to invest?',
    inputID: 'default-amount-input',
    disabled: true,
  },
};
